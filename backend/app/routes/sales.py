from fastapi import APIRouter,Body, UploadFile, File, Depends, HTTPException
import pandas as pd
from sqlalchemy.orm import Session
from sqlalchemy import insert
from ..database import get_db
from ..models import Sales
from ..analytics import clean_data, calculate_dashboard, calculate_kpis
from ..ai_engine import generate_insight  # optional AI insights

from pydantic import BaseModel
from ..ai_engine import detect_intent, extract_filters, explain_results
from ..query_engine import apply_filters

class AIRequest(BaseModel):
    question: str

router = APIRouter()


# =========================
# Upload CSV & Save to DB
# =========================
@router.post("/upload")
async def upload_sales(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        df = pd.read_csv(file.file)
        df = clean_data(df)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read/clean file: {e}")

    if df.empty:
        raise HTTPException(status_code=400, detail="No valid data found in the CSV")

    # Bulk insert into DB
    records = df.to_dict(orient="records")
    db.execute(insert(Sales), records)
    db.commit()

    # Calculate KPIs
    kpis = calculate_kpis(df)

    # Optional AI insights
    try:
        ai_insights = generate_insight(kpis)
    except Exception:
        ai_insights = "AI insights not available at the moment."

    return {
        "message": "Data uploaded and stored successfully",
        "kpis": kpis,
        "ai_insights": ai_insights
    }


from fastapi import UploadFile, File, HTTPException
import pandas as pd
from io import StringIO

@router.post("/upload-sales")
async def upload_sales(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files allowed")

    content = await file.read()
    df = pd.read_csv(StringIO(content.decode("utf-8")))

    # Standardize column names
    df.columns = df.columns.str.strip().str.lower()

    required_columns = ["order_date", "product", "region", "revenue", "quantity"]

    for col in required_columns:
        if col not in df.columns:
            raise HTTPException(
                status_code=400,
                detail=f"Missing required column: {col}"
            )

    # Parse dates
    df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")
    df = df.dropna(subset=["order_date"])

    # Convert numeric fields
    df["revenue"] = pd.to_numeric(df["revenue"], errors="coerce")
    df["quantity"] = pd.to_numeric(df["quantity"], errors="coerce")

    df = df.dropna(subset=["revenue", "quantity"])

    # Remove duplicates
    df = df.drop_duplicates()

    inserted_count = 0

    for _, row in df.iterrows():
        sale = Sales(
            order_date=row["order_date"],
            product=row["product"],
            region=row["region"],
            revenue=float(row["revenue"]),
            quantity=int(row["quantity"])
        )
        db.add(sale)
        inserted_count += 1

    db.commit()

    return {
        "message": "Upload successful",
        "records_inserted": inserted_count
    }

@router.get("/growth-analysis")
def growth_analysis(db: Session = Depends(get_db)):

    records = db.query(Sales).all()

    if not records:
        raise HTTPException(status_code=404, detail="No data available")

    data = [{
        "order_date": r.order_date,
        "revenue": float(r.revenue)
    } for r in records]

    df = pd.DataFrame(data)
    df["order_date"] = pd.to_datetime(df["order_date"])

    df["month"] = df["order_date"].dt.to_period("M")
    monthly = df.groupby("month")["revenue"].sum().reset_index()

    monthly["growth_%"] = monthly["revenue"].pct_change() * 100

    # 🔥 Critical Fix
    monthly = monthly.replace([float("inf"), float("-inf")], 0)
    monthly = monthly.fillna(0)

    # Convert month to string
    monthly["month"] = monthly["month"].astype(str)

    return monthly.to_dict(orient="records")

@router.get("/root-cause-analysis")
def root_cause_analysis(db: Session = Depends(get_db)):

    records = db.query(Sales).all()

    if not records:
        raise HTTPException(status_code=404, detail="No data available")

    data = [{
        "order_date": r.order_date,
        "product": r.product,
        "region": r.region,
        "revenue": float(r.revenue),
        "quantity": r.quantity
    } for r in records]

    df = pd.DataFrame(data)
    df["order_date"] = pd.to_datetime(df["order_date"])
    df["month"] = df["order_date"].dt.to_period("M")

    monthly = df.groupby("month").agg({
        "revenue": "sum",
        "quantity": "sum"
    }).reset_index()

    if len(monthly) < 2:
        raise HTTPException(status_code=400, detail="Not enough data for comparison")

    last_two = monthly.tail(2)

    prev = last_two.iloc[0]
    curr = last_two.iloc[1]

    revenue_change = ((curr["revenue"] - prev["revenue"]) / prev["revenue"]) * 100
    quantity_change = ((curr["quantity"] - prev["quantity"]) / prev["quantity"]) * 100

    # Product contribution difference
    product_prev = df[df["month"] == prev["month"]].groupby("product")["revenue"].sum()
    product_curr = df[df["month"] == curr["month"]].groupby("product")["revenue"].sum()

    product_diff = (product_curr - product_prev).dropna().sort_values()

    # Region contribution difference
    region_prev = df[df["month"] == prev["month"]].groupby("region")["revenue"].sum()
    region_curr = df[df["month"] == curr["month"]].groupby("region")["revenue"].sum()

    region_diff = (region_curr - region_prev).dropna().sort_values()

    return {
        "previous_month": str(prev["month"]),
        "current_month": str(curr["month"]),
        "revenue_change_%": revenue_change,
        "quantity_change_%": quantity_change,
        "top_product_decline": product_diff.head(3).to_dict(),
        "top_region_decline": region_diff.head(3).to_dict()
    }

@router.get("/action-recommendations")
def action_recommendations(db: Session = Depends(get_db)):

    records = db.query(Sales).all()

    if not records:
        raise HTTPException(status_code=404, detail="No data available")

    data = [{
        "order_date": r.order_date,
        "product": r.product,
        "region": r.region,
        "revenue": float(r.revenue),
        "quantity": r.quantity
    } for r in records]

    df = pd.DataFrame(data)
    df["order_date"] = pd.to_datetime(df["order_date"])
    df["month"] = df["order_date"].dt.to_period("M")

    monthly = df.groupby("month").agg({
        "revenue": "sum",
        "quantity": "sum"
    }).reset_index()

    if len(monthly) < 2:
        raise HTTPException(status_code=400, detail="Not enough data")

    prev = monthly.iloc[-2]
    curr = monthly.iloc[-1]

    revenue_change = ((curr["revenue"] - prev["revenue"]) / prev["revenue"]) * 100
    quantity_change = ((curr["quantity"] - prev["quantity"]) / prev["quantity"]) * 100

    recommendations = []

    if revenue_change < -10:
        recommendations.append("Revenue dropped significantly. Investigate product-level performance.")

    if quantity_change < -10:
        recommendations.append("Sales volume declined. Consider promotional campaigns in historically strong regions.")

    if revenue_change < 0 and quantity_change >= 0:
        recommendations.append("Revenue declined but volume stable. Review pricing or discount strategies.")

    # Product-level check
    product_prev = df[df["month"] == prev["month"]].groupby("product")["revenue"].sum()
    product_curr = df[df["month"] == curr["month"]].groupby("product")["revenue"].sum()

    product_diff = (product_curr - product_prev).sort_values()

    worst_product = product_diff.index[0]

    recommendations.append(f"Focus recovery strategy on product: {worst_product}")

    return {
        "revenue_change_%": revenue_change,
        "quantity_change_%": quantity_change,
        "recommendations": recommendations
    }

# =========================
# Get All Records
# =========================
@router.get("/all")
def get_all_sales(db: Session = Depends(get_db)):
    return db.query(Sales).all()


# =========================
# Dashboard from DB
# =========================
@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    records = db.query(Sales).all()

    if not records:
        return {
            "kpis": {},
            "revenue_trend": [],
            "product_analysis": [],
            "region_analysis": []
        }

    # Convert to DataFrame
    data = [
        {
            "order_date": r.order_date,
            "product": r.product,
            "region": r.region,
            "revenue": float(r.revenue),
            "quantity": r.quantity
        }
        for r in records
    ]

    df = pd.DataFrame(data)

    # Ensure order_date is datetime
    df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")
    df = df.dropna(subset=["order_date"])

    # Use analytics module
    dashboard_data = calculate_dashboard(df)
    return dashboard_data


# =========================
# Mock Dashboard (for testing frontend)
# =========================
@router.get("/mock-dashboard")
def mock_dashboard():
    return {
        "kpis": {
            "total_revenue": 1200000,
            "total_orders": 320,
            "top_product": "Laptop"
        },
        "revenue_trend": [
            {"month": "Jan", "revenue": 100000},
            {"month": "Feb", "revenue": 150000},
            {"month": "Mar", "revenue": 120000}
        ],
        "product_analysis": [
            {"product": "Laptop", "revenue": 500000},
            {"product": "Mobile", "revenue": 300000}
        ],
        "region_analysis": [
            {"region": "North", "revenue": 400000},
            {"region": "South", "revenue": 600000}
        ],
        "ai_insights": "This is a temporary mock insight."
    }


# =========================
# SMART AI Response Endpoint
# =========================
@router.post("/ai-response")
def ai_response(
    request: AIRequest,
    db: Session = Depends(get_db)
):
    question = request.question.strip()

    # Step 1: Detect intent
    intent = detect_intent(question)

    # Handle greeting
    if intent == "greeting":
        return {
            "answer": "Hello 👋 I’m your AI data analyst. You can ask about revenue, products, regions, trends, or time-based performance."
        }

    # Handle unrelated
    if intent == "unrelated":
        return {
            "answer": "I specialize in analyzing your sales data. Please ask a question related to business metrics."
        }

    # Step 2: Fetch data
    records = db.query(Sales).all()
    if not records:
        raise HTTPException(status_code=404, detail="No sales data available")

    data = [
        {
            "order_date": r.order_date,
            "product": r.product,
            "region": r.region,
            "revenue": float(r.revenue),
            "quantity": r.quantity
        }
        for r in records
    ]

    df = pd.DataFrame(data)
    df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")
    df = df.dropna(subset=["order_date"])

    # Step 3: Extract structured filters
    filters = extract_filters(question)

    # Step 4: Apply real filtering
    result_data = apply_filters(df, filters)

    # Step 5: Explain result
    final_answer = explain_results(question, result_data)

    return {
        "question": question,
        "filters_used": filters,
        "answer": final_answer
    }
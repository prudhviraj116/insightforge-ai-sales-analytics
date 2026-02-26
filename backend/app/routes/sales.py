from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import insert
from pydantic import BaseModel
import pandas as pd
from io import BytesIO
import os
<<<<<<< HEAD
import json
import re
from google import genai
=======
>>>>>>> 5143ce6 (Fixed ai)
from ..database import get_db
from ..models import Sales
from ..analytics import clean_data, calculate_dashboard, calculate_kpis, compute_business_summary
from ..ai_engine import (
    generate_insight,
    detect_intent,
    extract_filters,
    explain_results
)
from ..query_engine import apply_filters

router = APIRouter()


# =========================
# Request Model
# =========================
class AIRequest(BaseModel):
    question: str


# =========================
# Upload CSV (Validated + Cleaned + Stored)
# =========================
@router.post("/upload-sales")
async def upload_sales(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # 1️⃣ Validate file type
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed")

    try:
        contents = await file.read()

        if not contents:
            raise HTTPException(status_code=400, detail="Uploaded file is empty")

        df = pd.read_csv(BytesIO(contents))

    except Exception:
        raise HTTPException(status_code=400, detail="Invalid CSV format")

    # 2️⃣ Standardize column names
    df.columns = df.columns.str.strip().str.lower()

    required_columns = ["order_date", "product", "region", "revenue", "quantity"]
    missing = [col for col in required_columns if col not in df.columns]

    if missing:
        raise HTTPException(
            status_code=400,
            detail=f"Missing required columns: {missing}"
        )

    # 3️⃣ Centralized cleaning
    try:
        df = clean_data(df)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Data cleaning failed: {e}")

    if df.empty:
        raise HTTPException(status_code=400, detail="No valid data found after cleaning")

    # 4️⃣ Bulk insert (fast & scalable)
    records = df.to_dict(orient="records")
    db.execute(insert(Sales), records)
    db.commit()

    # 5️⃣ KPIs + AI insights
    kpis = calculate_kpis(df)

    try:
        ai_insights = generate_insight(kpis)
    except Exception:
        ai_insights = "AI insights not available at the moment."

    return {
        "message": "Data uploaded and stored successfully",
        "records_inserted": len(records),
        "kpis": kpis,
        "ai_insights": ai_insights
    }


# =========================
# Get All Records
# =========================
@router.get("/all")
def get_all_sales(db: Session = Depends(get_db)):
    return db.query(Sales).all()


# =========================
# Growth Analysis
# =========================
@router.get("/growth-analysis")
def growth_analysis(db: Session = Depends(get_db)):
    records = db.query(Sales).all()

    if not records:
        raise HTTPException(status_code=404, detail="No data available")

    df = pd.DataFrame([
        {
            "order_date": r.order_date,
            "revenue": float(r.revenue)
        }
        for r in records
    ])

    df["order_date"] = pd.to_datetime(df["order_date"])
    df["month"] = df["order_date"].dt.to_period("M")

    monthly = df.groupby("month")["revenue"].sum().reset_index()
    monthly["growth_%"] = monthly["revenue"].pct_change() * 100

    monthly = monthly.replace([float("inf"), float("-inf")], 0)
    monthly = monthly.fillna(0)
    monthly["month"] = monthly["month"].astype(str)

    return monthly.to_dict(orient="records")


# =========================
# Root Cause Analysis
# =========================
@router.get("/root-cause-analysis")
def root_cause_analysis(db: Session = Depends(get_db)):
    records = db.query(Sales).all()

    if not records:
        raise HTTPException(status_code=404, detail="No data available")

    df = pd.DataFrame([
        {
            "order_date": r.order_date,
            "product": r.product,
            "region": r.region,
            "revenue": float(r.revenue),
            "quantity": r.quantity
        }
        for r in records
    ])

    df["order_date"] = pd.to_datetime(df["order_date"])
    df["month"] = df["order_date"].dt.to_period("M")

    monthly = df.groupby("month").agg({
        "revenue": "sum",
        "quantity": "sum"
    }).reset_index()

    if len(monthly) < 2:
        raise HTTPException(status_code=400, detail="Not enough data for comparison")

    prev, curr = monthly.iloc[-2], monthly.iloc[-1]

    revenue_change = ((curr["revenue"] - prev["revenue"]) / prev["revenue"]) * 100
    quantity_change = ((curr["quantity"] - prev["quantity"]) / prev["quantity"]) * 100

    # Product contribution
    product_prev = df[df["month"] == prev["month"]].groupby("product")["revenue"].sum()
    product_curr = df[df["month"] == curr["month"]].groupby("product")["revenue"].sum()
    product_diff = (product_curr - product_prev).dropna().sort_values()

    # Region contribution
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


# =========================
# Action Recommendations
# =========================
@router.get("/action-recommendations")
def action_recommendations(db: Session = Depends(get_db)):
    records = db.query(Sales).all()

    if not records:
        raise HTTPException(status_code=404, detail="No data available")

    df = pd.DataFrame([
        {
            "order_date": r.order_date,
            "product": r.product,
            "region": r.region,
            "revenue": float(r.revenue),
            "quantity": r.quantity
        }
        for r in records
    ])

    df["order_date"] = pd.to_datetime(df["order_date"])
    df["month"] = df["order_date"].dt.to_period("M")

    monthly = df.groupby("month").agg({
        "revenue": "sum",
        "quantity": "sum"
    }).reset_index()

    if len(monthly) < 2:
        raise HTTPException(status_code=400, detail="Not enough data")

    prev, curr = monthly.iloc[-2], monthly.iloc[-1]

    revenue_change = ((curr["revenue"] - prev["revenue"]) / prev["revenue"]) * 100
    quantity_change = ((curr["quantity"] - prev["quantity"]) / prev["quantity"]) * 100

    recommendations = []

    if revenue_change < -10:
        recommendations.append("Revenue dropped significantly. Investigate product-level performance.")

    if quantity_change < -10:
        recommendations.append("Sales volume declined. Consider promotional campaigns.")

    if revenue_change < 0 and quantity_change >= 0:
        recommendations.append("Revenue declined but volume stable. Review pricing strategy.")

    product_prev = df[df["month"] == prev["month"]].groupby("product")["revenue"].sum()
    product_curr = df[df["month"] == curr["month"]].groupby("product")["revenue"].sum()
    product_diff = (product_curr - product_prev).sort_values()

    if not product_diff.empty:
        recommendations.append(f"Focus recovery strategy on product: {product_diff.index[0]}")

    return {
        "revenue_change_%": revenue_change,
        "quantity_change_%": quantity_change,
        "recommendations": recommendations
    }


# =========================
# Dashboard
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

    df = pd.DataFrame([
        {
            "order_date": r.order_date,
            "product": r.product,
            "region": r.region,
            "revenue": float(r.revenue),
            "quantity": r.quantity
        }
        for r in records
    ])

    df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")
    df = df.dropna(subset=["order_date"])

    return calculate_dashboard(df)


# =========================
# SMART AI RESPONSE
# =========================

@router.post("/ai-response")
async def ai_response(request: AIRequest, db: Session = Depends(get_db)):
<<<<<<< HEAD

=======
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    # 🟢 Fallback Mode
    if not GEMINI_API_KEY:
        return {
            "growth_analysis": "Revenue trend shows positive movement based on computed KPIs.",
            "risk_analysis": "One or more products show declining performance and require review.",
            "product_strategy": "Increase investment in top-performing segments and optimize weak SKUs.",
            "regional_strategy": "Strengthen distribution in high-performing regions.",
            "executive_actions": [
                "Reallocate marketing budget toward growth drivers",
                "Run product-level margin diagnostics",
                "Investigate underperforming regions"
            ]
        }
>>>>>>> 5143ce6 (Fixed ai)
    question = request.question.strip()
    intent = detect_intent(question)

    # -------------------------------------------------
    # 1️⃣ Greeting / Unrelated
    # -------------------------------------------------
    if intent == "greeting":
        return {
            "answer": "Hello 👋 I’m your AI data analyst. Ask about revenue, products, regions, or trends."
        }

    if intent == "unrelated":
        return {
            "answer": "I specialize in analyzing your sales data."
        }

    # -------------------------------------------------
    # 2️⃣ Fetch Sales Data
    # -------------------------------------------------
    records = db.query(Sales).all()
    if not records:
        raise HTTPException(status_code=404, detail="No sales data available")

    df = pd.DataFrame([
        {
            "order_date": r.order_date,
            "product": r.product,
            "region": r.region,
            "revenue": float(r.revenue),
            "quantity": r.quantity
        }
        for r in records
    ])

    df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")
    df = df.dropna(subset=["order_date"])

    # -------------------------------------------------
    # 3️⃣ Apply Filters
    # -------------------------------------------------
    filters = extract_filters(question)
    result_data = apply_filters(df, filters)
    final_answer = explain_results(question, result_data)

    # -------------------------------------------------
    # 4️⃣ Compute KPIs
    # -------------------------------------------------
    business_summary = compute_business_summary(df)

    # -------------------------------------------------
    # 5️⃣ Check API Key (Fallback Mode)
    # -------------------------------------------------
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    if not GEMINI_API_KEY:
        return {
            "question": question,
            "filters_used": filters,
            "business_summary": business_summary,
            "insights": {
                "growth_analysis": "Revenue trend shows positive movement based on computed KPIs.",
                "risk_analysis": "One or more products show declining performance and require review.",
                "product_strategy": "Increase investment in top-performing segments and optimize weak SKUs.",
                "regional_strategy": "Strengthen distribution in high-performing regions.",
                "executive_actions": [
                    "Reallocate marketing budget toward growth drivers",
                    "Run product-level margin diagnostics",
                    "Investigate underperforming regions"
                ]
            },
            "answer": final_answer,
            "ai_status": "fallback_no_api_key"
        }

    # -------------------------------------------------
    # 6️⃣ Build AI Prompt
    # -------------------------------------------------
    prompt = f"""
<<<<<<< HEAD
    You are a senior business strategy analyst.

    Based on the following computed KPIs:

    {business_summary}

    Provide:

    1. Growth diagnosis
    2. Revenue risk areas
    3. Product-level strategy
    4. Region-level recommendation
    5. 3 concrete executive actions

    Respond strictly in JSON format:
    {{
        "growth_analysis": "...",
        "risk_analysis": "...",
        "product_strategy": "...",
        "regional_strategy": "...",
        "executive_actions": ["...", "...", "..."]
    }}
    """

    # -------------------------------------------------
    # 7️⃣ Call Gemini 2.5 Flash
    # -------------------------------------------------
    try:
        client = genai.Client(api_key=GEMINI_API_KEY)
=======
            You are a senior business strategy analyst.

            Based on the following computed KPIs:

            {business_summary}

            Provide:

            1. Growth diagnosis
            2. Revenue risk areas
            3. Product-level strategy
            4. Region-level recommendation
            5. 3 concrete executive actions

            Be concise, strategic, and data-driven.
            """
    # Call AI engine (existing function)
    ai_result = generate_insight(prompt)

    # Optionally, structure the AI response
    structured_response = {
        "growth_analysis": ai_result.get("growth_analysis"),
        "risk_analysis": ai_result.get("risk_analysis"),
        "product_strategy": ai_result.get("product_strategy"),
        "regional_strategy": ai_result.get("regional_strategy"),
        "executive_actions": ai_result.get("executive_actions", [])
    }
    
>>>>>>> 5143ce6 (Fixed ai)

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        ai_text = response.text

        # 🔐 Extract JSON safely
        json_match = re.search(r"\{.*\}", ai_text, re.DOTALL)
        if not json_match:
            raise ValueError("Invalid JSON returned by AI")

        ai_result = json.loads(json_match.group())

        structured_response = {
            "growth_analysis": ai_result.get("growth_analysis"),
            "risk_analysis": ai_result.get("risk_analysis"),
            "product_strategy": ai_result.get("product_strategy"),
            "regional_strategy": ai_result.get("regional_strategy"),
            "executive_actions": ai_result.get("executive_actions", [])
        }

        ai_status = "success"

    except Exception as e:
        structured_response = {
            "growth_analysis": "AI analysis temporarily unavailable.",
            "risk_analysis": "Unable to evaluate risks at this time.",
            "product_strategy": "Review top and bottom SKUs manually.",
            "regional_strategy": "Review regional sales performance.",
            "executive_actions": [
                "Check AI configuration",
                "Validate API key",
                "Retry request"
            ]
        }

        ai_status = "failed"

    # -------------------------------------------------
    # 8️⃣ Final Response
    # -------------------------------------------------
    return {
        "question": question,
        "filters_used": filters,
        "business_summary": business_summary,
        "insights": structured_response,
        "answer": final_answer,
        "ai_status": ai_status
    }

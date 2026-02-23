import pandas as pd

def clean_data(df: pd.DataFrame):
    # Standardize column names
    df.columns = df.columns.str.lower().str.strip()

    required_columns = ["order_date", "product", "region", "revenue", "quantity"]

    # Ensure required columns exist
    for col in required_columns:
        if col not in df.columns:
            raise ValueError(f"Missing required column: {col}")

    # Drop duplicates
    df = df.drop_duplicates()

    # Convert numeric columns safely
    df["revenue"] = pd.to_numeric(df["revenue"], errors="coerce")
    df["quantity"] = pd.to_numeric(df["quantity"], errors="coerce")

    # Convert order_date to datetime
    df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")

    # Drop rows with missing essential values
    df = df.dropna(subset=required_columns)

    return df

def calculate_dashboard(df: pd.DataFrame):
    # Ensure order_date is datetime
    if not pd.api.types.is_datetime64_any_dtype(df["order_date"]):
        df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")
        df = df.dropna(subset=["order_date"])

    # Create month column safely
    df["month"] = df["order_date"].dt.strftime("%b")

    kpis = {
        "total_revenue": float(df["revenue"].sum()),
        "total_orders": int(len(df)),
        "top_product": df.groupby("product")["revenue"].sum().idxmax()
    }

    revenue_trend = (
        df.groupby("month")["revenue"]
        .sum()
        .reset_index()
        .to_dict(orient="records")
    )

    product_analysis = (
        df.groupby("product")["revenue"]
        .sum()
        .reset_index()
        .to_dict(orient="records")
    )

    region_analysis = (
        df.groupby("region")["revenue"]
        .sum()
        .reset_index()
        .to_dict(orient="records")
    )

    return {
        "kpis": kpis,
        "revenue_trend": revenue_trend,
        "product_analysis": product_analysis,
        "region_analysis": region_analysis
    }

def calculate_kpis(df: pd.DataFrame):
    # Safe check
    if not pd.api.types.is_datetime64_any_dtype(df["order_date"]):
        df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")
        df = df.dropna(subset=["order_date"])

    return {
        "total_revenue": float(df["revenue"].sum()),
        "total_orders": int(len(df)),
        "top_product": df.groupby("product")["revenue"].sum().idxmax()
    }

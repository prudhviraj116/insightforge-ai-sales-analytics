from datetime import datetime, timedelta

def apply_filters(df, filters):

    if not filters:
        return {"error": "Could not understand question"}

    # Region filter
    if filters.get("region"):
        df = df[df["region"].str.lower() == filters["region"].lower()]

    # Product filter
    if filters.get("product"):
        df = df[df["product"].str.lower() == filters["product"].lower()]

    # Date filtering
    if filters.get("date_range") == "last_3_months":
        cutoff = datetime.now() - timedelta(days=90)
        df = df[df["order_date"] >= cutoff]

    if filters.get("date_range") == "last_6_months":
        cutoff = datetime.now() - timedelta(days=180)
        df = df[df["order_date"] >= cutoff]

    metric = filters.get("metric", "revenue")

    # Grouping
    if filters.get("group_by"):
        grouped = df.groupby(filters["group_by"])[metric].sum().reset_index()
        return grouped.to_dict(orient="records")

    total = df[metric].sum()
    return {"total": float(total)}
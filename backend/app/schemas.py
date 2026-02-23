from pydantic import BaseModel
from datetime import date

class SalesCreate(BaseModel):
    order_date: date
    product: str
    region: str
    revenue: float
    quantity: int

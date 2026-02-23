from sqlalchemy import Column, Integer, Float, String, Date
from .database import Base

class Sales(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    order_date = Column(Date)
    product = Column(String(100))
    region = Column(String(100))
    revenue = Column(Float)
    quantity = Column(Integer)

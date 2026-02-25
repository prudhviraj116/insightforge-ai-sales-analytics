from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import logging

from .routes import sales
from .database import Base, engine

app = FastAPI(title="InsightForge AI – Sales Analytics Platform")

# Create tables on startup
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(sales.router, prefix="/sales", tags=["Sales"])

# CORS
origins = [
    "http://localhost:3000",
    "https://insightforge-ai-sales-analytics-42b2nlmns.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global error handler
logger = logging.getLogger(__name__)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal Server Error"}
    )

@app.get("/health")
def health():
    return {"status": "ok"}
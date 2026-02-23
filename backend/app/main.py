from fastapi import FastAPI
from .routes import sales
from .database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="InsightForge AI – Sales Analytics Platform")

app.include_router(sales.router, prefix="/sales", tags=["Sales"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import logging

app = FastAPI()

logger = logging.getLogger(__name__)

# 👇 ADD IT HERE (after app = FastAPI())
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal Server Error"}
    )

# Your routes below
@app.get("/health")
def health():
    return {"status": "ok"}

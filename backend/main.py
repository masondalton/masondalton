from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import os
from dotenv import load_dotenv

from routers import nasa, wikipedia

load_dotenv()

app = FastAPI(title="NASA API Service", version="1.0.0")

# Rate limiting setup
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(nasa.router, prefix="/api/nasa", tags=["nasa"])
app.include_router(wikipedia.router, prefix="/api/wikipedia", tags=["wikipedia"])


@app.get("/")
async def root():
    return {"message": "NASA API Service", "status": "running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}

from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.database import init_db
from app.routers import auth, contact, blog, certificates

limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    from app.database import engine
    await init_db()
    yield
    await engine.dispose()


app = FastAPI(
    title=settings.APP_NAME,
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

app.mount("/uploads", StaticFiles(directory=str(settings.UPLOAD_DIR)), name="uploads")

app.include_router(auth.router)
app.include_router(contact.router)
app.include_router(blog.router)
app.include_router(certificates.router)


@app.api_route("/api/health", methods=["GET", "HEAD"])
async def health():
    from sqlalchemy import text
    from app.database import async_session
    try:
        async with async_session() as session:
            await session.execute(text("SELECT 1"))
        return {"status": "ok", "database": "ok"}
    except Exception:
        return JSONResponse(status_code=503, content={"status": "degraded", "database": "unavailable"})

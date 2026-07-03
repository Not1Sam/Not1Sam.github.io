from pydantic_settings import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    APP_NAME: str = "Not1Sam Portfolio API"
    DEBUG: bool = False
    SECRET_KEY: str = "change-me-in-production-use-openssl-rand-hex-32"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    DATABASE_URL: str = "sqlite+aiosqlite:///./portfolio.db"
    UPLOAD_DIR: Path = Path("uploads")
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024
    ADMIN_USERNAME: str = ""
    ADMIN_PASSWORD: str = ""
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://not1sam.github.io",
        "https://x7k9m2.bungus.fyi",
        "http://84.8.221.29",
        "http://84.8.221.29:8001",
    ]

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
from datetime import datetime, timedelta, timezone
import re

from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

ALGORITHM = "HS256"

# ── Hardcoded admin credentials ──────────────────────────
# Change these in production via environment variables
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "Admin123!"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def validate_password(password: str) -> list[str]:
    errors = []
    rules = [
        (r".{8,}", "Password must be at least 8 characters"),
        (r"[A-Z]", "Password must contain an uppercase letter"),
        (r"[a-z]", "Password must contain a lowercase letter"),
        (r"[0-9]", "Password must contain a digit"),
    ]
    for pattern, msg in rules:
        if not re.search(pattern, password):
            errors.append(msg)
    return errors


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)


def get_current_admin(token: str = Depends(oauth2_scheme)) -> dict:
    """Validate JWT and return admin payload. All authenticated users are admin."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        username: str | None = payload.get("sub")
        role: str | None = payload.get("role")
        if username is None or role != "admin":
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return {"username": username, "role": role}

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordRequestForm
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.config import settings
from app.schemas.schemas import Token
from app.services.auth import create_access_token, get_current_admin

router = APIRouter(prefix="/api/auth", tags=["auth"])
limiter = Limiter(key_func=get_remote_address)


@router.post("/login", response_model=Token)
@limiter.limit("5/minute")
async def login(request: Request, form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.password != settings.ADMIN_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": settings.ADMIN_USERNAME, "role": "admin"})
    return Token(access_token=access_token, role="admin", username=settings.ADMIN_USERNAME)


@router.get("/me")
async def get_profile(admin: dict = Depends(get_current_admin)):
    return {"username": admin["username"], "role": admin["role"]}

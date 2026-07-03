from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.config import settings
from app.schemas.schemas import Token
from app.services.auth import verify_password, create_access_token, get_current_admin

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username != settings.ADMIN_USERNAME or form_data.password != settings.ADMIN_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": settings.ADMIN_USERNAME, "role": "admin"})
    return Token(access_token=access_token, role="admin", username=settings.ADMIN_USERNAME)


@router.get("/me")
async def get_profile(admin: dict = Depends(get_current_admin)):
    return {"username": admin["username"], "role": admin["role"]}

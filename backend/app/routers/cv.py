import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.config import settings
from app.database import get_db
from app.models.models import CV
from app.schemas.schemas import CVResponse
from app.services.auth import get_current_admin

router = APIRouter(prefix="/api/cv", tags=["cv"])

ALLOWED_EXTENSIONS = {".pdf"}
MAX_CV_SIZE = 20 * 1024 * 1024  # 20MB


@router.get("", response_model=CVResponse | None)
async def get_cv(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CV).order_by(CV.uploaded_at.desc()).limit(1))
    cv = result.scalar_one_or_none()
    return cv


@router.post("", response_model=CVResponse, status_code=201)
async def upload_cv(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    _admin: dict = Depends(get_current_admin),
):
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File type {ext} not allowed. Only PDF is accepted.")

    content = await file.read()
    if len(content) > MAX_CV_SIZE:
        raise HTTPException(status_code=400, detail="File too large (max 20MB)")

    existing = await db.execute(select(CV))
    for old_cv in existing.scalars().all():
        old_filepath = settings.UPLOAD_DIR / old_cv.filename
        if old_filepath.exists():
            old_filepath.unlink()
        await db.delete(old_cv)

    filename = f"cv-{uuid.uuid4()}{ext}"
    filepath = settings.UPLOAD_DIR / filename
    filepath.write_bytes(content)

    cv = CV(
        filename=filename,
        file_path=f"/uploads/{filename}",
        original_name=file.filename or f"cv{ext}",
    )
    db.add(cv)
    await db.commit()
    await db.refresh(cv)
    return cv


@router.delete("", status_code=204)
async def delete_cv(
    db: AsyncSession = Depends(get_db),
    _admin: dict = Depends(get_current_admin),
):
    result = await db.execute(select(CV))
    cv = result.scalar_one_or_none()
    if not cv:
        raise HTTPException(status_code=404, detail="No CV found")

    filepath = settings.UPLOAD_DIR / cv.filename
    if filepath.exists():
        filepath.unlink()

    await db.delete(cv)
    await db.commit()

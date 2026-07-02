import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.config import settings
from app.database import get_db
from app.models.models import Certificate
from app.schemas.schemas import CertificateResponse
from app.services.auth import get_current_admin

router = APIRouter(prefix="/api/certificates", tags=["certificates"])

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".pdf"}


@router.get("", response_model=list[CertificateResponse])
async def list_certificates(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Certificate).order_by(Certificate.created_at.desc()))
    return result.scalars().all()


@router.get("/{cert_id}", response_model=CertificateResponse)
async def get_certificate(cert_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Certificate).where(Certificate.id == cert_id))
    cert = result.scalar_one_or_none()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    return cert


@router.post("", response_model=CertificateResponse, status_code=201)
async def upload_certificate(
    title: str = File(...),
    issuer: str = File(...),
    date: str = File(...),
    credential_url: str | None = File(None),
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    _admin: dict = Depends(get_current_admin),
):
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File type {ext} not allowed")

    content = await file.read()
    if len(content) > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=400, detail="File too large (max 10MB)")

    filename = f"{uuid.uuid4()}{ext}"
    filepath = settings.UPLOAD_DIR / filename
    filepath.write_bytes(content)

    cert = Certificate(
        title=title,
        issuer=issuer,
        date=date,
        image_path=f"/uploads/{filename}",
        credential_url=credential_url,
    )
    db.add(cert)
    await db.commit()
    await db.refresh(cert)
    return cert


@router.delete("/{cert_id}", status_code=204)
async def delete_certificate(
    cert_id: str,
    db: AsyncSession = Depends(get_db),
    _admin: dict = Depends(get_current_admin),
):
    result = await db.execute(select(Certificate).where(Certificate.id == cert_id))
    cert = result.scalar_one_or_none()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")

    filepath = settings.UPLOAD_DIR / Path(cert.image_path).name
    if filepath.exists():
        filepath.unlink()

    await db.delete(cert)
    await db.commit()

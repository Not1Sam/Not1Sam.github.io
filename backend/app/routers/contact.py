from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.database import get_db
from app.models.models import ContactMessage
from app.schemas.schemas import ContactCreate, ContactResponse
from app.services.auth import get_current_admin

router = APIRouter(prefix="/api/contact", tags=["contact"])
limiter = Limiter(key_func=get_remote_address)


@router.post("", response_model=ContactResponse, status_code=201)
@limiter.limit("3/minute")
async def create_message(request: Request, data: ContactCreate, db: AsyncSession = Depends(get_db)):
    msg = ContactMessage(**data.model_dump())
    db.add(msg)
    await db.commit()
    await db.refresh(msg)
    return msg


@router.get("", response_model=list[ContactResponse])
async def list_messages(
    db: AsyncSession = Depends(get_db),
    _admin: dict = Depends(get_current_admin),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
):
    offset = (page - 1) * limit
    result = await db.execute(
        select(ContactMessage).order_by(ContactMessage.created_at.desc()).offset(offset).limit(limit)
    )
    return result.scalars().all()


@router.delete("/{message_id}", status_code=204)
async def delete_message(
    message_id: str,
    db: AsyncSession = Depends(get_db),
    _admin: dict = Depends(get_current_admin),
):
    result = await db.execute(select(ContactMessage).where(ContactMessage.id == message_id))
    msg = result.scalar_one_or_none()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    await db.delete(msg)
    await db.commit()

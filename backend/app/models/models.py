import uuid
from datetime import datetime
from sqlalchemy import String, Text, DateTime, Index, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class ContactMessage(Base):
    __tablename__ = "contact_messages"
    __table_args__ = (Index("ix_contact_created_at", "created_at"),)

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(255))
    message: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class BlogPost(Base):
    __tablename__ = "blog_posts"
    __table_args__ = (Index("ix_blog_created_at", "created_at"),)

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title: Mapped[str] = mapped_column(String(200))
    excerpt: Mapped[str] = mapped_column(String(500))
    content: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())


class Certificate(Base):
    __tablename__ = "certificates"
    __table_args__ = (Index("ix_cert_created_at", "created_at"),)

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title: Mapped[str] = mapped_column(String(200))
    issuer: Mapped[str] = mapped_column(String(200))
    date: Mapped[str] = mapped_column(String(20))
    image_path: Mapped[str] = mapped_column(String(500))
    credential_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

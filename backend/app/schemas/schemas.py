from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=2000)


class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    message: str
    created_at: datetime

    model_config = {"from_attributes": True}


class BlogPostCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    excerpt: str = Field(..., min_length=1, max_length=500)
    content: str = Field(..., min_length=1)


class BlogPostUpdate(BaseModel):
    title: str | None = Field(None, max_length=200)
    excerpt: str | None = Field(None, max_length=500)
    content: str | None = None


class BlogPostResponse(BaseModel):
    id: str
    title: str
    excerpt: str
    content: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class CertificateCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    issuer: str = Field(..., min_length=1, max_length=200)
    date: str = Field(..., max_length=20)
    credential_url: str | None = None


class CertificateResponse(BaseModel):
    id: str
    title: str
    issuer: str
    date: str
    image_path: str
    credential_url: str | None
    created_at: datetime

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    username: str

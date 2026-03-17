from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Todo schemas
class TodoBase(BaseModel):
    title: str
    completed: bool = False

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None
    id: int

class Todo(TodoBase):
    id: int
    createdAt: datetime
    updatedAt: datetime
    userId: int

    class Config:
        from_attributes = True

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    success: bool
    token: str
    message: str
    email: str

class TokenData(BaseModel):
    id: Optional[int] = None

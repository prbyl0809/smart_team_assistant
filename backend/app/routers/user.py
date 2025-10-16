from typing import List

from app.schemas.user import UserCreate, UserResponse
from app.crud.user import create_user, get_user_by_email, get_user_by_username, get_users
from app.dependencies.db import get_db
from app.dependencies.auth import get_current_user
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    if get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already taken")
    
    created_user = create_user(db, user)
    return created_user


@router.get("/me", response_model=UserResponse)
def get_current_user_info(db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    user = get_user_by_email(db, current_user.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/", response_model=List[UserResponse])
def list_users(
    db: Session = Depends(get_db),
    _: UserResponse = Depends(get_current_user)
):
    return get_users(db)

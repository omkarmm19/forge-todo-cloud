from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import models, schemas, auth
from database import get_db

router = APIRouter(
    prefix="/api/v1/user",
    tags=["user"],
)

@router.post("/signup", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=409, detail="A user with this email already exists.")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(
        email=user.email,
        name=user.name,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/signin", response_model=schemas.Token)
def signin(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect Credentials")
    
    if not auth.verify_password(user_credentials.password, user.password):
        raise HTTPException(status_code=401, detail="Incorrect Credentials")
    
    access_token = auth.create_access_token(data={"id": user.id})
    return {
        "success": True,
        "token": access_token,
        "message": "Successfully signed in",
        "email": user.email
    }

@router.get("/me")
def me(current_user: models.User = Depends(auth.get_current_user)):
    return {"message": "user exist", "success": True}

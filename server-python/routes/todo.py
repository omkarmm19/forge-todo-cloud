from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models, schemas, auth
from database import get_db

router = APIRouter(
    prefix="/api/v1/todo",
    tags=["todo"],
)

@router.post("", response_model=schemas.Todo, status_code=status.HTTP_201_CREATED)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    new_todo = models.Todo(
        title=todo.title,
        completed=todo.completed,
        userId=current_user.id
    )
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

@router.get("", response_model=List[schemas.Todo])
def get_todos(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    todos = db.query(models.Todo).filter(models.Todo.userId == current_user.id).order_by(models.Todo.createdAt.desc()).all()
    return todos

@router.put("", response_model=schemas.Todo)
def update_todo(todo_update: schemas.TodoUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_update.id, models.Todo.userId == current_user.id).first()
    if not todo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    
    if todo_update.title is not None:
        todo.title = todo_update.title
    if todo_update.completed is not None:
        todo.completed = todo_update.completed
        
    db.commit()
    db.refresh(todo)
    return todo

@router.delete("")
def delete_todo(todo_delete: schemas.TodoUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    # Reusing TodoUpdate for delete as it has the ID
    todo = db.query(models.Todo).filter(models.Todo.id == todo_delete.id, models.Todo.userId == current_user.id).first()
    if not todo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    
    db.delete(todo)
    db.commit()
    return {"message": "Todo deleted successfully"}

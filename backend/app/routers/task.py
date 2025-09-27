from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.task import TaskCreate, TaskRead, TaskUpdate
from app.models import Task, User
from app.dependencies.auth import get_db, get_current_user
from app.crud import task as crud

router = APIRouter(prefix="/project/{project_id}/tasks", tags=["tasks"])

@router.post("/", response_model=TaskCreate, status_code=201)
def create_task(
    project_id: int,
    task: TaskCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    try:
        return crud.create_task(db, task, project_id, current_user)
    except (ValueError, PermissionError) as e:
        raise HTTPException(status_code=403, detail=str(e))


@router.get("/", response_model=List[TaskRead])
def list_tasks(
    project_id: int,
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    try:
        return crud.get_tasks_for_project(db, project_id, current_user)
    except (ValueError, PermissionError) as e:
        raise HTTPException(status_code=403, detail=str(e))


@router.get("/{task_id}", response_model=TaskRead)
def get_task(
    project_id: int,
    task_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    try:
        return crud.get_task_by_id(db, project_id, task_id, current_user)
    except (ValueError, PermissionError) as e:
        raise HTTPException(status_code=403, detail=str(e))


@router.put("/{task_id}", response_model=TaskRead)
def update_task(
    project_id: int,
    task_id: int, 
    task_update: TaskUpdate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    try:
        return crud.update_task(db, project_id, task_id, task_update, current_user)
    except (ValueError, PermissionError) as e:
        raise HTTPException(status_code=403, detail=str(e))

@router.patch("/{task_id}", response_model=TaskRead)
def partial_update_task(
    project_id: int,
    task_id: int, 
    task_update: TaskUpdate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    try:
        return crud.partial_update_task(db, project_id, task_id, task_update, current_user)
    except (ValueError, PermissionError) as e:
        raise HTTPException(status_code=403, detail=str(e))

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    project_id: int,
    task_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    try:
        crud.delete_task(db, project_id, task_id, current_user)
    except (ValueError, PermissionError) as e:
        raise HTTPException(status_code=403, detail=str(e))

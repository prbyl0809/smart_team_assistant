from app.dependencies.db import get_db
from app.schemas.project import ProjectRead, ProjectCreate, ProjectUpdate
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.models import User
from app.dependencies.auth import get_current_user
from app.crud import project as crud

router = APIRouter(prefix="/projects", tags=["projects"])


@router.post("/", response_model=ProjectRead, status_code=status.HTTP_201_CREATED)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return crud.create_project(db, project, current_user.id)


@router.get("/", response_model=List[ProjectRead])
def read_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve all projects for the current user.
    """
    return crud.get_projects_by_user(db, current_user.id)

@router.put("/{project_id}", response_model=ProjectRead)
def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = crud.update_project(db, project_id, project_update, current_user.id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found or not authorized to update")
    return project


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    success = crud.delete_project(db, project_id, current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found or not authorized to delete")

@router.get("/{project_id}", response_model=ProjectRead)
def read_project_by_id(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = crud.get_project_by_id(db, project_id, current_user.id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found or not authorized to view")
    return project
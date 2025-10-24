from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.crud import comment as crud
from app.dependencies.auth import get_current_user
from app.dependencies.db import get_db
from app.models import User
from app.schemas.comment import CommentCreate, CommentRead, CommentUpdate

router = APIRouter(prefix="/projects/{project_id}/comments", tags=["Comments"])


@router.get("/", response_model=List[CommentRead])
def list_project_comments(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return crud.list_comments_for_project(db, project_id, current_user)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc
    except PermissionError as exc:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(exc)) from exc


@router.post("/", response_model=CommentRead, status_code=status.HTTP_201_CREATED)
def create_project_comment(
    project_id: int,
    comment: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return crud.create_comment(db, project_id, comment, current_user)
    except ValueError as exc:
        status_code = (
            status.HTTP_400_BAD_REQUEST
            if str(exc) == "Comment body cannot be empty"
            else status.HTTP_404_NOT_FOUND
        )
        raise HTTPException(status_code=status_code, detail=str(exc)) from exc
    except PermissionError as exc:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(exc)) from exc


@router.patch("/{comment_id}", response_model=CommentRead)
def update_project_comment(
    project_id: int,
    comment_id: int,
    comment_update: CommentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return crud.update_comment(db, project_id, comment_id, comment_update, current_user)
    except ValueError as exc:
        status_code = (
            status.HTTP_400_BAD_REQUEST
            if str(exc) == "Comment body cannot be empty"
            else status.HTTP_404_NOT_FOUND
        )
        raise HTTPException(status_code=status_code, detail=str(exc)) from exc
    except PermissionError as exc:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(exc)) from exc


@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project_comment(
    project_id: int,
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        crud.delete_comment(db, project_id, comment_id, current_user)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc
    except PermissionError as exc:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(exc)) from exc

from typing import List

from sqlalchemy.orm import Session

from app.crud.task import verify_project_access
from app.models.comment import Comment
from app.models.user import User
from app.schemas.comment import CommentCreate, CommentUpdate


def list_comments_for_project(
    db: Session,
    project_id: int,
    current_user: User,
) -> List[Comment]:
    verify_project_access(db, project_id, current_user)
    return (
        db.query(Comment)
        .filter(Comment.project_id == project_id)
        .order_by(Comment.created_at.asc())
        .all()
    )


def create_comment(
    db: Session,
    project_id: int,
    payload: CommentCreate,
    current_user: User,
) -> Comment:
    verify_project_access(db, project_id, current_user)
    body = payload.body.strip()
    if not body:
        raise ValueError("Comment body cannot be empty")

    new_comment = Comment(
        body=body,
        project_id=project_id,
        author_id=current_user.id,
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment


def _get_comment_or_error(
    db: Session,
    project_id: int,
    comment_id: int,
) -> Comment:
    comment = (
        db.query(Comment)
        .filter(Comment.project_id == project_id, Comment.id == comment_id)
        .first()
    )
    if not comment:
        raise ValueError("Comment not found")
    return comment


def update_comment(
    db: Session,
    project_id: int,
    comment_id: int,
    payload: CommentUpdate,
    current_user: User,
) -> Comment:
    verify_project_access(db, project_id, current_user)
    comment = _get_comment_or_error(db, project_id, comment_id)
    if comment.author_id != current_user.id:
        raise PermissionError("Not authorized to update this comment")

    body = payload.body.strip()
    if not body:
        raise ValueError("Comment body cannot be empty")

    if comment.body != body:
        comment.body = body
        comment.edited = True
    db.commit()
    db.refresh(comment)
    return comment


def delete_comment(
    db: Session,
    project_id: int,
    comment_id: int,
    current_user: User,
) -> None:
    verify_project_access(db, project_id, current_user)
    comment = _get_comment_or_error(db, project_id, comment_id)
    if comment.author_id != current_user.id:
        raise PermissionError("Not authorized to delete this comment")

    db.delete(comment)
    db.commit()

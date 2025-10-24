from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CommentBase(BaseModel):
    body: str = Field(..., min_length=1, max_length=2000)


class CommentCreate(CommentBase):
    ...


class CommentUpdate(BaseModel):
    body: str = Field(..., min_length=1, max_length=2000)


class CommentAuthor(BaseModel):
    id: int
    username: str

    model_config = ConfigDict(from_attributes=True)


class CommentRead(CommentBase):
    id: int
    project_id: int
    author: CommentAuthor
    edited: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

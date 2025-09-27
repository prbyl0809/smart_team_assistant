from __future__ import annotations
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
from app.models.base import Base

class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True, index=True, nullable=False)
    email: Mapped[str] = mapped_column(unique=True, index=True, nullable=False)
    hashed_password: Mapped[str]
    is_active: Mapped[bool] = mapped_column(default=True)

    projects: Mapped[List["Project"]] = relationship(back_populates="owner")
    tasks: Mapped[List["Task"]] = relationship(back_populates="assignee")

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"
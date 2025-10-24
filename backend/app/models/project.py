from __future__ import annotations
from datetime import datetime, timezone
from enum import Enum
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
from app.models.base import Base

class ProjectStatus(str, Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    BLOCKED = "blocked"
    BACKLOG = "backlog"

class ProjectPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class Project(Base):
    __tablename__ = 'projects'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    description: Mapped[str]
    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    due_date: Mapped[datetime] = mapped_column(
        nullable=True
    )
    is_archived: Mapped[bool] = mapped_column(default=False)
    status: Mapped[ProjectStatus] = mapped_column(
        String,
        default=ProjectStatus.BACKLOG.value,
        nullable=False,
    )
    priority: Mapped[ProjectPriority] = mapped_column(
        String,
        default=ProjectPriority.MEDIUM.value,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )

    owner: Mapped["User"] = relationship(back_populates="projects")
    tasks: Mapped[List["Task"]] = relationship(back_populates="project")
    comments: Mapped[List["Comment"]] = relationship(
        back_populates="project", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Project(id={self.id}, name='{self.name}', owner_id={self.owner_id}, status='{self.status}', priority='{self.priority}')>"

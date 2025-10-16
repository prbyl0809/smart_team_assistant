from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Optional
from app.models.project import ProjectStatus, ProjectPriority


class ProjectBase(BaseModel):
    name: str
    description: str
    due_date: Optional[datetime] = None
    status: Optional[ProjectStatus] = None
    priority: Optional[ProjectPriority] = None
    is_archived: bool = False


class ProjectCreate(ProjectBase):
    ...


class ProjectRead(ProjectBase):
    id: int
    owner_id: int
    status: ProjectStatus
    priority: ProjectPriority
    is_archived: bool = False
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    status: Optional[ProjectStatus] = None
    priority: Optional[ProjectPriority] = None
    is_archived: bool = None
    owner_id: Optional[int] = None

from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

from app.models.task import TaskPriority, TaskStatus

class TaskCreate(BaseModel):
    title: str
    description: str
    status: Optional[TaskStatus] = TaskStatus.TODO
    priority: Optional[TaskPriority] = TaskPriority.MEDIUM
    due_date: Optional[datetime] = None
    order: Optional[int] = None
    assignee_id: Optional[int] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    priority: Optional[TaskPriority] = None
    due_date: Optional[datetime] = None
    order: Optional[int] = None
    assignee_id: Optional[int] = None

class TaskRead(BaseModel):
    id: int
    title: str
    description: str
    status: TaskStatus
    priority: TaskPriority
    due_date: Optional[datetime]
    order: Optional[int]
    created_at: datetime
    updated_at: datetime
    project_id: int
    assignee_id: Optional[int]
    model_config = ConfigDict(from_attributes=True)

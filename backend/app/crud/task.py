from typing import List
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.schemas.task import TaskCreate, TaskRead, TaskUpdate
from app.models.project import Project
from app.models.task import Task
from app.models.user import User


def verify_project_access(
    db: Session,
    project_id: int,
    current_user: User,
) -> Project:
    project = (
        db.query(Project)
        .outerjoin(Task, Task.project_id == Project.id)
        .filter(
            Project.id == project_id,
            or_(
                Project.owner_id == current_user.id,
                Task.assignee_id == current_user.id,
            ),
        )
        .first()
    )
    if not project:
        raise ValueError("Project not found")
    return project


def verify_project_ownership(
    db: Session,
    project_id: int,
    current_user: User
) -> Project:
    project = verify_project_access(db, project_id, current_user)
    if project.owner_id != current_user.id:
        raise ValueError("Not authorized to access this project")
    return project


def create_task(
    db: Session, 
    task: TaskCreate, 
    project_id: int, 
    current_user: User
) -> TaskCreate:
    """
    Create a new task in the specified project.
    
    Args:
        db (Session): Database session.
        task (TaskCreate): Task creation schema.
        project_id (int): ID of the project to which the task belongs.
        current_user (User): The user creating the task.
    
    Returns:
        TaskRead: The created task instance.
    """
    verify_project_ownership(db, project_id, current_user)

    new_task = Task(**task.model_dump(), project_id=project_id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

def get_tasks_for_project(
    db: Session, 
    project_id: int, 
    current_user: User
) -> List[TaskRead]:
    """
    Retrieve all tasks for a specific project.
    
    Args:
        db (Session): Database session.
        project_id (int): ID of the project.
        current_user (User): The user requesting the tasks.
    
    Returns:
        list[TaskRead]: A list of tasks in the specified project.
    """
    verify_project_access(db, project_id, current_user)
    return db.query(Task).filter(Task.project_id == project_id).all()


def get_task_by_id(
    db: Session, 
    project_id: int, 
    task_id: int, 
    current_user: User
) -> TaskRead:
    """
    Retrieve a specific task by its ID within a project.
    
    Args:
        db (Session): Database session.
        project_id (int): ID of the project.
        task_id (int): ID of the task to retrieve.
        current_user (User): The user requesting the task.
    
    Returns:
        TaskRead: The requested task instance.
    """
    verify_project_access(db, project_id, current_user)
    task = db.query(Task).filter(Task.id == task_id, Task.project_id == project_id).first()
    if not task:
        raise ValueError("Task not found")
    return task


def update_task(
    db: Session, 
    project_id: int, 
    task_id: int, 
    task_update: TaskCreate, 
    current_user: User
) -> TaskUpdate:
    """
    Update an existing task in a project.
    
    Args:
        db (Session): Database session.
        project_id (int): ID of the project.
        task_id (int): ID of the task to update.
        task_update (TaskCreate): Updated task data.
        current_user (User): The user updating the task.
    
    Returns:
        TaskRead: The updated task instance.
    """
    verify_project_ownership(db, project_id, current_user)
    
    task = get_task_by_id(db, project_id, task_id, current_user)
    if not task:
        raise ValueError("Task not found")
    
    for key, value in task_update.model_dump(exclude_unset=True).items():
        setattr(task, key, value)
    
    db.commit()
    db.refresh(task)
    return task


def partial_update_task(
    db: Session, 
    project_id: int, 
    task_id: int, 
    task_update: TaskUpdate, 
    current_user: User
) -> TaskUpdate:
    """
    Partially update an existing task in a project.
    
    Args:
        db (Session): Database session.
        project_id (int): ID of the project.
        task_id (int): ID of the task to update.
        task_update (TaskUpdate): Partial updated task data.
        current_user (User): The user updating the task.
    
    Returns:
        TaskRead: The updated task instance.
    """
    verify_project_ownership(db, project_id, current_user)
    
    task = get_task_by_id(db, project_id, task_id, current_user)
    if not task:
        raise ValueError("Task not found")
    
    for key, value in task_update.model_dump(exclude_unset=True).items():
        setattr(task, key, value)
    
    db.commit()
    db.refresh(task)
    return task


def delete_task(
    db: Session, 
    project_id: int, 
    task_id: int, 
    current_user: User
) -> None:
    """
    Delete a task from a project.
    
    Args:
        db (Session): Database session.
        project_id (int): ID of the project.
        task_id (int): ID of the task to delete.
        current_user (User): The user deleting the task.
    
    Returns:
        bool: True if the task was deleted, False if not found.
    """
    verify_project_ownership(db, project_id, current_user)
    
    task = get_task_by_id(db, project_id, task_id, current_user)
    if not task:
        raise ValueError("Task not found")
    
    db.delete(task)
    db.commit()

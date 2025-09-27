from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate


def create_project(db: Session, project: ProjectCreate, owner_id: int) -> Project:
    """
    Create a new project in the database.
    
    Args:
        db (Session): Database session.
        project (ProjectCreate): Project creation schema.
        owner_id (int): ID of the user creating the project.
    
    Returns:
        Project: The created project instance.
    """
    new_project = Project(
        name=project.name,
        description=project.description,
        owner_id=owner_id,
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project


def get_projects_by_user(db: Session, user_id: int):
    """
    Retrieve all projects owned by a specific user.
    Args:
        db (Session): Database session.
        user_id (int): ID of the user whose projects are to be retrieved.
    Returns:
        List[Project]: A list of projects owned by the user.
    """
    return db.query(Project).filter(Project.owner_id == user_id).all()


def get_project_by_id(db: Session, project_id: int, owner_id: int) -> Project:
    """
    Retrieve a project by its ID.
    
    Args:
        db (Session): Database session.
        project_id (int): ID of the project to retrieve.
    
    Returns:
        Project: The project instance if found, otherwise None.
    """
    return db.query(Project).filter(Project.id == project_id, Project.owner_id == owner_id).first()


def update_project(db: Session, project_id: int, updates: ProjectUpdate, owner_id: int) -> Project:
    """
    Update an existing project.
    
    Args:
        db (Session): Database session.
        project_id (int): ID of the project to update.
        updates (ProjectUpdate): Updated project data.
    
    Returns:
        Project: The updated project instance if found, otherwise None.
    """
    project = db.query(Project).filter(Project.id == project_id, Project.owner_id == owner_id).first()
    if not project:
        return None

    for field, value in updates.dict(exclude_unset=True).items():
        setattr(project, field, value)

    db.commit()
    db.refresh(project)
    return project


def delete_project(db: Session, project_id: int, owner_id: int) -> bool:
    """
    Delete a project by its ID.
    
    Args:
        db (Session): Database session.
        project_id (int): ID of the project to delete.
    
    Returns:
        bool: True if the project was deleted, False if not found.
    """
    project = db.query(Project).filter(Project.id == project_id, Project.owner_id == owner_id).first()
    if not project:
        return False

    db.delete(project)
    db.commit()
    return True
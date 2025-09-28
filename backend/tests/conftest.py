import os
from typing import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from sqlalchemy.orm import sessionmaker
import sys
import pathlib

# Ensure SECRET_KEY is set before importing the app/auth modules
os.environ.setdefault("SECRET_KEY", "testsecret")
os.environ.setdefault("DATABASE_URL", "sqlite:///./_tests_dummy.db")

ROOT = pathlib.Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import main  # noqa: E402
from app.models.base import Base  # noqa: E402
from app.dependencies.db import get_db  # noqa: E402
from app.models.user import User  # noqa: E402
from app.utils.security import hash_password  # noqa: E402
app = main.app


@pytest.fixture()
def db_session() -> Generator:
    # In-memory SQLite shared across threads using StaticPool
    engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    # Create all tables
    Base.metadata.create_all(bind=engine)

    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        engine.dispose()


def _override_get_db(session):
    def _get_db():
        try:
            yield session
        finally:
            pass
    return _get_db


@pytest.fixture()
def client(db_session) -> Generator[TestClient, None, None]:
    # Override DB dependency
    app.dependency_overrides[get_db] = _override_get_db(db_session)
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


@pytest.fixture()
def test_user(db_session) -> User:
    user = User(
        username="alice",
        email="alice@example.com",
        hashed_password=hash_password("secretpassword"),
        is_active=True,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture()
def auth_client(client: TestClient, test_user: User):
    # Provide a dependency override for authenticated routes
    from app.dependencies.auth import get_current_user as _get_current_user

    def override_current_user():
        return test_user

    app.dependency_overrides[_get_current_user] = override_current_user
    try:
        yield client
    finally:
        app.dependency_overrides.pop(_get_current_user, None)

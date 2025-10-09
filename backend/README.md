Smart Team Assistant - Backend

## Overview
This FastAPI service powers authentication, project management, and task workflows for Smart Team Assistant. It provides JWT-secured endpoints, SQLAlchemy models, and extensive pytest coverage to keep business logic reliable.

## Key Features
- JWT-based auth with registration and login flows
- Project CRUD with ownership checks, prioritisation, status, due date, and archive fields
- Task CRUD scoped to projects with ordering, status transitions, and permission enforcement
- Consistent ordering (due date + created timestamp) for project listings
- Ready-to-run Docker setup plus Alembic migrations for schema evolution

## Quick Start (Docker)
```
docker-compose up --build
```
Services: API at http://localhost:8000 (Swagger at /docs) and PostgreSQL via the `db` container.

## Local Development (without Docker)
1. Install Python 3.11+ and PostgreSQL 15+
2. Copy `backend/.env.example` to `backend/.env` and update values
3. Create virtual environment and install dependencies:
   ```
   python -m venv .venv
   .\.venv\Scripts\activate   # Windows
   source .venv/bin/activate    # macOS/Linux
   pip install -r requirements.txt
   ```
4. Run migrations and start the dev server:
   ```
   alembic upgrade head
   uvicorn main:app --reload
   ```

### Environment variables
```
DATABASE_URL=postgresql://smartuser:smartpass@localhost:5432/smartdb
SECRET_KEY=change_me
```

## Running Tests
```
pytest
```
Test suite covers auth, projects, and tasks (including permission failures and ordering rules).

## Project Structure Highlights
- `main.py` – FastAPI app definition, CORS setup, router mounting
- `app/routers/` – auth, user, project, and task endpoints
- `app/models/` – SQLAlchemy models (Project, Task, User)
- `app/schemas/` – Pydantic request/response schemas
- `app/crud/` – DB operations with ownership validation
- `app/dependencies/` – shared FastAPI dependencies (DB session, current user)
- `alembic/` – migration environment and versioned scripts
- `tests/` – pytest suite with fixtures, auth helpers, and endpoint coverage

## Useful Commands
- Create migration: `alembic revision --autogenerate -m "describe change"`
- Upgrade DB: `alembic upgrade head`
- Generate JWT for debugging: use `/auth/login` and copy the `access_token`

## API Reference
Interactive documentation is always available at `http://localhost:8000/docs`. For CLI exploration use `httpie` or `curl`, e.g.
```
http POST :8000/api/projects name="Demo" description="First project" "Authorization:Bearer <token>"
```

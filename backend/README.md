Smart Team Assistant — Backend

Stack
- FastAPI (app server) and Uvicorn (ASGI)
- SQLAlchemy 2.0 (ORM) + Alembic (migrations)
- PostgreSQL
- JWT auth (python‑jose) + passlib (bcrypt)

Run with Docker
- From repo root: `docker-compose up --build`
- API available at `http://localhost:8000` (interactive docs at `/docs`).
- Postgres runs in the `db` service as configured in `docker-compose.yml`.

Run Locally (without Docker)
- Prereqs: Python 3.11+, PostgreSQL 15+.
- Environment (create `backend/.env`):
  - `DATABASE_URL=postgresql://USER:PASS@localhost:5432/DBNAME`
  - `SECRET_KEY=your_secret_key`
- Install deps:
  - `python -m venv venv && source venv/bin/activate` (Windows: `venv\Scripts\activate`)
  - `pip install -r requirements.txt`
- Prepare DB: `alembic upgrade head`
- Start API: `uvicorn main:app --reload`

Project Structure (key paths)
- `backend/main.py` — FastAPI app, CORS, and routers.
- `backend/app/routers/*` — Route handlers for auth, users, projects, tasks.
- `backend/app/models/*` — SQLAlchemy models and Base.
- `backend/app/schemas/*` — Pydantic schemas for request/response.
- `backend/app/crud/*` — DB operations.
- `backend/app/dependencies/*` — Request dependencies (DB session, auth).
- `backend/alembic/*` — Migration environment and versions.

Environment Variables
- `DATABASE_URL` (required) — SQLAlchemy/Alembic connection string.
- `SECRET_KEY` (required) — JWT signing key.

Migrations
- Create: `alembic revision --autogenerate -m "describe changes"`
- Apply: `alembic upgrade head`

Auth Flow (example)
- Register: `POST /users/register` with JSON `{ username, email, password }`.
- Login: `POST /auth/login` (OAuth2 form fields `username`, `password`).
- Use token: Add header `Authorization: Bearer <token>`.

Endpoints (summary)
- `POST /auth/login`, `GET /auth/protected`
- `POST /users/register`, `GET /users/me`
- `GET /projects`, `POST /projects`, `GET /projects/{id}`, `PUT /projects/{id}`, `DELETE /projects/{id}`
- `GET /project/{project_id}/tasks`, `POST /project/{project_id}/tasks`, `GET /project/{project_id}/tasks/{task_id}`, `PUT|PATCH /project/{project_id}/tasks/{task_id}`, `DELETE /project/{project_id}/tasks/{task_id}`

CORS
- By default allows `http://localhost:5173` (see `backend/main.py:12`). Update if your frontend origin differs.

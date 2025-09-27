Smart Team Assistant

Overview

- Full‑stack project and task management app with a Kanban‑style board.
- Backend: FastAPI + SQLAlchemy + Alembic + PostgreSQL.
- Frontend: React (Vite + TypeScript) + MUI + dnd‑kit.
- Docker Compose for local development.

Quick Start (Docker)

- Prereqs: Docker and Docker Compose.
- From the repo root, run: `docker-compose up --build`
- Services:
  - API: `http://localhost:8000` (FastAPI docs at `/docs`)
  - Frontend: `http://localhost:5173`
  - Postgres: `localhost:5432` (user `smartuser`, db `smartdb` as defined in `docker-compose.yml`)

Local Setup (Manual)

- Backend
  - Prereqs: Python 3.11+, PostgreSQL 15+.
  - Env vars (create `backend/.env`):
    - `DATABASE_URL=postgresql://USER:PASS@localhost:5432/DBNAME`
    - `SECRET_KEY=your_secret_key`
  - Install deps: `python -m venv venv && source venv/bin/activate` (or `venv\Scripts\activate` on Windows) then `pip install -r backend/requirements.txt`
  - Run DB migrations: `cd backend && alembic upgrade head`
  - Start API: `uvicorn backend.main:app --reload` (or from `backend/` as `uvicorn main:app --reload`)
- Frontend
  - Prereqs: Node 20+.
  - Install deps: `cd frontend && npm install`
  - Start dev server: `npm run dev` then open `http://localhost:5173`
  - The API base URL is configured in `frontend/src/api/axios.ts:1`.

Environment Variables

- Backend (required)
  - `DATABASE_URL` – connection string used by SQLAlchemy and Alembic.
  - `SECRET_KEY` – signing key for JWT tokens.
- Frontend
  - Uses `frontend/src/api/axios.ts` base URL. Adjust if the API runs elsewhere.

Migrations

- Create revision: `cd backend && alembic revision --autogenerate -m "message"`
- Apply latest: `alembic upgrade head`

API Overview (high level)

- Auth: `POST /auth/login` (OAuth2 password form), `GET /auth/protected`
- Users: `POST /users/register`, `GET /users/me`
- Projects: `GET /projects`, `POST /projects`, `GET /projects/{id}`, `PUT /projects/{id}`, `DELETE /projects/{id}`
- Tasks (scoped by project):
  - `GET /project/{project_id}/tasks`
  - `POST /project/{project_id}/tasks`
  - `GET /project/{project_id}/tasks/{task_id}`
  - `PUT /project/{project_id}/tasks/{task_id}`
  - `PATCH /project/{project_id}/tasks/{task_id}`
  - `DELETE /project/{project_id}/tasks/{task_id}`

Notes

- CORS is configured for `http://localhost:5173` in `backend/main.py:12`. Update if the frontend origin changes.
- The frontend stores the JWT access token in `localStorage` under key `token` (see `frontend/src/api/axios.ts:10`).

# Smart Team Assistant

## Purpose

Smart Team Assistant is a full-stack project and task management application that gives small teams modern, visual workflows to organize their work. The short-term focus is transparent project tracking (Kanban board, stats, detailed views). The long-term vision introduces an AI assistant that can suggest tasks, prioritize work, and support decision making.

### Features at a Glance

- Authentication flow with registration, login, JWT storage, and automatic token expiry handling
- Project workspace with inline editing for status, priority, due date, and archive state
- Dashboard analytics, search, and detailed project drill-down pages
- Task experience with list view quick edits plus drag-and-drop Kanban board powered by @dnd-kit
- Automated backend test suite (pytest) validating auth, project, and task flows
- Containerized environment with Docker Compose and Jenkins pipeline for build/test/publish

### Live Demo

Hosted on AWS EC2: [http://3.120.227.99](http://3.120.227.99)

### Demo Credentials

```
username: testuser
password: testpassword
```

## Quick Start

```
git clone https://github.com/prbyl0809/smart_team_assistant.git
cd smart_team_assistant
docker-compose up --build
```

Front-end: http://localhost:5173 | API: http://localhost:8000 | Swagger: http://localhost:8000/docs

## Roadmap & Next Steps

1. **Task depth** - modal-based create/update flows, due date and assignee UI, comments, checklists
2. **Collaboration** - roles (owner/member), activity log, dedicated archived project views
3. **AI integration prep** - define recommendation API contract, mock responses, "Suggested tasks" UI placeholder
4. **Quality assurance** - broaden pytest coverage, add basic end-to-end (Playwright/Cypress), integrate lint/format checks
5. **DevOps enhancements** - extend Jenkins pipeline with deploy stage, scaffold Terraform for EC2, explore GitHub Actions fallback

## Architecture Overview

```
[React + Vite + MUI] --HTTP--> [FastAPI backend] --SQLAlchemy--> [PostgreSQL]
         |                              ^
         |                              |
   local dev (Vite)              Jenkins CI/CD
         |                              |
   Docker Compose <---- Docker images --Docker Hub
         |                              |
     AWS EC2 (docker-compose runtime) -- future IaC/automation
```

- **Frontend**: TypeScript, React Router, React Query, Material UI dark theme, dnd-kit for drag-and-drop
- **Backend**: FastAPI, SQLAlchemy ORM, Pydantic schemas, Alembic migrations, JWT auth
- **Database**: PostgreSQL 15 (via Docker Compose); long-term plan for AWS RDS
- **Communication**: REST API with axios interceptors

## Tech Stack Details

- **Frontend**: Vite, TypeScript, React 18, React Router, React Query, Material UI 5, dnd-kit
- **Backend**: Python 3.11, FastAPI, SQLAlchemy, Alembic, Pydantic, Passlib, python-jose
- **Testing**: Pytest + HTTPX test client
- **CI/CD**: Jenkins declarative pipeline, Docker, Docker Compose
- **Infrastructure**: AWS EC2 (Ubuntu) host, Docker Hub registry, Jenkins credential management

## Development Environment

### Docker Compose

```
docker-compose up --build
```

Services:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000 (Swagger UI at `/docs`)
- PostgreSQL: localhost:5432 (`smartuser` / `smartpass` / `smartdb`)

### Manual Setup

**Backend**

```
cd backend
python -m venv .venv
.\.venv\Scripts\activate   # Windows
pip install -r requirements.txt
alembic upgrade head
uvicorn main:app --reload
```

Copy `backend/.env.example` to `backend/.env` and adjust as needed:

```
DATABASE_URL=postgresql://smartuser:smartpass@localhost:5432/smartdb
SECRET_KEY=change_me
```

**Frontend**

```
cd frontend
npm install
npm run dev
```
(Optional) Copy `frontend/.env.example` to `frontend/.env` if you need to override the API base URL.

The default API base URL lives in `frontend/src/shared/api/axios.ts` (pointing to `/api`).

## Testing

```
cd backend
pytest
```

The current suite covers authentication, project and task happy paths, and authorization. Planned: more edge cases, validation checks, and frontend E2E coverage.

## Project Structure

```
backend/   # FastAPI app, SQLAlchemy models, Alembic migrations, pytest
frontend/  # React + Vite app, feature-based folders, shared components
Jenkinsfile
docker-compose.yml
```

Key backend directories: `app/routers`, `app/models`, `app/schemas`, `tests/`. Frontend highlights: `src/features/*`, `src/pages`, `src/shared`.

### Key Source Files

- `frontend/src/pages/ProjectsPage.tsx` – dashboard with stats, search, and project list
- `frontend/src/features/projects/components/ProjectDetailsHeader.tsx` – inline editing for project attributes
- `frontend/src/features/tasks/components/TaskBoard.tsx` – Kanban board with drag-and-drop
- `backend/app/routers/project.py` – project CRUD endpoints
- `backend/app/routers/task.py` – task CRUD endpoints with ownership checks

## CI/CD & DevOps

- Jenkins stages: Git SHA init -> backend build -> frontend build -> backend tests -> Docker pushes (tags: build number, Git SHA, latest)
- Docker Hub credentials injected via `usernamePassword`
- Pipeline output logs which tags were published
- Planned: deploy stage (SSH or AWS CLI) and IaC templates for reproducible environments

## AWS Deployment

- EC2 host runs docker-compose for backend and frontend containers
- Update workflow today: after Jenkins push, manually `docker pull` and `docker-compose up -d`
- Next: automated rollout (extra Jenkins stage or GitHub Actions) and secrets via AWS Systems Manager

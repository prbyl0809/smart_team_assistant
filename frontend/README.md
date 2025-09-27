Smart Team Assistant — Frontend

Stack

- React 19 + TypeScript (Vite)
- MUI (Material UI) for components
- TanStack Query for data fetching/caching
- dnd‑kit for drag‑and‑drop on the task board
- React Router for routing

Prerequisites

- Node.js 20+

Getting Started

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Open: `http://localhost:5173`

API Base URL

- Configured in `src/api/axios.ts:1` as `http://localhost:8000`.
- The JWT token is read from `localStorage` under key `token` and sent in the `Authorization` header.

Project Structure (key paths)

- `src/pages/*` — top‑level pages (e.g., Login, Dashboard).
- `src/components/*` — UI components (TaskBoard, TaskColumn, Navbar, etc.).
- `src/context/AuthContext.tsx` — auth state provider.
- `src/hooks/*` — custom hooks (e.g., `useAuth`, `useCreateProject`, `useProjectDetails`).
- `src/api/*` — API clients and helpers.
- `src/types/*` — shared TypeScript types.

Common Tasks

- Lint: `npm run lint`
- Build: `npm run build`
- Preview production build: `npm run preview`

Notes

- Ensure the backend CORS origin matches the frontend host (default `http://localhost:5173`).
- If you change the API port or host, update `src/api/axios.ts` accordingly.

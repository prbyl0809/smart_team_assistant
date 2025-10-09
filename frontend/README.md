Smart Team Assistant - Frontend

## Overview

This React + TypeScript single-page application delivers the Smart Team Assistant experience: authentication, project dashboards, drag-and-drop task boards, and inline editing powered by Material UI.

## Key Features

- Auth-aware routing with protected areas (Dashboard, Projects, Project details)
- Projects workspace with statistics, search, inline editing, and archive toggle
- Task management with list view quick edits and @dnd-kit Kanban board
- Inline editing components for text, select, date, and switch (shared inline UI kit)
- React Query for data fetching/caching and automatic cache updates
- Theming via custom MUI dark palette and shared design tokens

## Getting Started

1. Install Node.js 20+
2. Install dependencies and start dev server:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:5173 in your browser
4. (Optional) Copy `frontend/.env.example` to `frontend/.env` to override API targets (e.g. `VITE_API_BASE_URL`)

## Available Scripts

- `npm run dev` – Vite dev server with HMR
- `npm run build` – production build in `dist/`
- `npm run preview` – serve the built app locally
- `npm run lint` – ESLint with project configuration

## Environment Settings

Axios defaults to `/api`, allowing the backend to proxy requests. To point at a remote API set:

```
VITE_API_BASE_URL=https://api.your-host.com
```

## Project Structure Highlights

- `src/main.tsx` – React root with ThemeProvider, QueryClient, Router
- `src/App.tsx` – route definitions and protected-route guard
- `src/pages/` – page-level components (Login, Register, Dashboard, Projects, ProjectDetails)
- `src/features/projects/` – project forms, cards, headers, info panels, hooks, API clients
- `src/features/tasks/` – task board, list, drag-and-drop components, hooks, API helpers
- `src/features/auth/` – AuthContext, login hook, API client
- `src/shared/` – reusable components (Navbar, inline editors), Axios instance, constants
- `src/types/` – shared TypeScript types for projects and tasks

## Styling & UX

- Material UI components themed via `src/theme.ts`
- Responsive layout with MUI Grid/Stack patterns and dark theme palette
- Drag-and-drop interactions built with `@dnd-kit/core`

## Linking with Backend

Ensure backend CORS allows your frontend origin (defaults already cover http://localhost:5173). When deployed separately, update both `VITE_API_BASE_URL` and the backend CORS list.

## Demo Credentials

To explore the live demo quickly:

```
username: testuser
password: testpassword
```

Use the navbar links to browse Dashboard, Projects overview, and project detail boards.

# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Full-stack zombie shooter game — Pacific Zombie Fighter — with a React + Vite frontend and Express backend.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React 19, Vite, Tailwind CSS v4, shadcn/ui

## Artifacts

- `artifacts/zombie-shooter` — Pacific Zombie Fighter web app (React + Vite, port 26241, preview at `/`)
- `artifacts/api-server` — Express API server (port 8080, routes at `/api`)
- `artifacts/mockup-sandbox` — Design/mockup sandbox

## Architecture

- **Frontend** (`artifacts/zombie-shooter`): Canvas-based zombie shooter game with character selection, tournament system, leaderboard, and admin panel. Anti-cheat measures for tournament play.
- **Backend** (`artifacts/api-server`): JWT auth (SESSION_SECRET), tournament management, score submission with session tokens (anti-cheat), leaderboard endpoints, admin CRUD.
- **DB Schema** (`lib/db/src/schema/`): `users`, `tournaments`, `scores`, `game_sessions` tables.
- **Auth**: JWT tokens via `SESSION_SECRET`. Players log in with Discord username + tournament password. Admins have separate bcrypt-hashed passwords.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `PORT=8080 pnpm --filter @workspace/api-server run dev` — run API server locally
- `PORT=26241 BASE_PATH=/ pnpm --filter @workspace/zombie-shooter run dev` — run frontend locally

## Required Secrets

- `DATABASE_URL` — PostgreSQL connection string
- `SESSION_SECRET` — JWT signing secret

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

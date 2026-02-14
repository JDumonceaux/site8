---
applyTo: "**"
---

# Instructions for Copilot

This repository contains a monorepo-style web application with three main parts: the frontend (`client/`), the API service (`server1/`), and shared types/utilities (`shared/`). The goal of these instructions is to help AI coding agents make productive, small, high-confidence changes.

Guiding principles

- Prioritize minimal, focused edits that preserve existing patterns and build/test scripts.
- Follow repository conventions: TypeScript strict mode, local `@site8/shared` package, and existing ESLint/Prettier/Husky hooks.

Tech stack guardrails

- Do not suggest or introduce **Zod**, **Axios**, or **Font Awesome** unless the user explicitly requests them.
- Prefer existing project patterns for these concerns:
  - Validation: use current project validation approach already present in the codebase.
  - HTTP client: use the centralized `client/src/lib/api/` fetch-based client and React Query integration.
  - Icons: use existing icon components under `client/src/components/`.
- If a solution could use disallowed libraries, provide the equivalent implementation with existing repo utilities.

Quick architecture summary

- Frontend: `client/` — Vite + React (React 19), sources in `client/src`, dev: `npm run dev`, build: `npm run build`, tests: `npm run test`.
- Server: `server1/` — Express + TypeScript, entry `server1/src/server.ts`, build via `npm run build` then `npm start` (starts `dist/server.js`).
- Shared: `shared/` — shared types/utilities compiled with `tsc` and referenced as `@site8/shared` in `client` and `server1`.

React 19.24 guidance

- Treat React **19.24** as the default target for frontend suggestions and implementations.
- Prefer modern React structures: functional components, composable custom hooks, route/feature-level `Suspense`, and clear state boundaries.
- Prefer React 19 patterns where applicable: `useActionState`, `useOptimistic`, transitions (`startTransition`, `useTransition`), and deferred rendering (`useDeferredValue`).
- Use `use()` and other experimental/canary React capabilities only when supported by project tooling and when they improve clarity or UX.
- Keep compatibility with existing app architecture (Vite client, React Query, current providers) and avoid introducing patterns that require framework migration.

Developer workflows (explicit commands)

- Run frontend dev: `cd client && npm install && npm run dev`.
- Build frontend: `cd client && npm run build` (runs `tsc` type-check then `vite build`).
- Run server (production build): `cd server1 && npm install && npm run build && npm start`.
- Lint & format: `npm run lint` and `npm run format` (run from the package workspace you modify: `client/` or `server1/`).

Project-specific patterns & conventions

- Strict TypeScript: both `client/tsconfig.json` and `server1/tsconfig.json` enable `strict` and many strict flags — prefer explicit types and avoid `any`.
- Local shared package: `@site8/shared` is a file:../shared dependency; modify shared types carefully and rebuild consumers.
- Error handling: frontend initializes `createRoot` with custom error hooks (`client/src/main.tsx`) — preserve `logError` usage.
- Server routing: `server1/src/server.ts` wires many small routers under `/api/*` — add routes under `app/routes/*` and register them in `server.ts`.
- Security & ops: server uses `helmet`, `compression`, and rate limiting; respect these configs when adding endpoints.

Files to inspect before changing code

- Server entry: [server1/src/server.ts](../server1/src/server.ts)
- Frontend entry: [client/src/main.tsx](../client/src/main.tsx)
- Shared package: [shared/package.json](../shared/package.json) and `shared/src` (types/utilities)
- Client tsconfig: [client/tsconfig.json](../client/tsconfig.json) and server tsconfig: [server1/tsconfig.json](../server1/tsconfig.json)

Testing & CI notes

- Frontend tests use `vitest` (`client/package.json` scripts). Storybook is present for UI components.
- Server has a build step that outputs `dist/`; tests are not centralized — search for `*.test.ts` for unit tests.

When making changes, prefer the smallest reproducible edit. If adding a public API change that affects both `client` and `server1`, include updated `shared/` type(s) and a brief note in the PR describing required rebuild steps for consumers.

Examples

- Add a new read route: create `server1/src/app/routes/newRoute.ts`, export router, then register in `server1/src/server.ts` under `/api/new`.
- Add a shared type: add to `shared/src/index.ts`, run `cd shared && npm run build`, then update imports in `client`/`server1` and run their builds.

Ask the user when in doubt about breaking cross-package types or changing API route behavior.

If you update these instructions, keep them short and focused — they are intended for AI agents making safe edits.

Please review — tell me which areas need more detail or examples.

```instructions
---
applyTo: "**"
---

# Instructions for Copilot

This repository contains a monorepo-style web application with three main parts: the frontend (`client/`), the API service (`server1/`), and shared types/utilities (`shared/`). The goal of these instructions is to help AI coding agents make productive, small, high-confidence changes.

Guiding principles
- Prioritize minimal, focused edits that preserve existing patterns and build/test scripts.
- Follow repository conventions: TypeScript strict mode, local `@site8/shared` package, and existing ESLint/Prettier/Husky hooks.

Quick architecture summary
- Frontend: `client/` — Vite + React (React 19), sources in `client/src`, dev: `npm run dev`, build: `npm run build`, tests: `npm run test`.
- Server: `server1/` — Express + TypeScript, entry `server1/src/server.ts`, build via `npm run build` then `npm start` (starts `dist/server.js`).
- Shared: `shared/` — shared types/utilities compiled with `tsc` and referenced as `@site8/shared` in `client` and `server1`.

Developer workflows (explicit commands)
- Run frontend dev: `cd client && npm install && npm run dev`.
- Build frontend: `cd client && npm run build` (runs `tsc` type-check then `vite build`).
- Run server (production build): `cd server1 && npm install && npm run build && npm start`.
- Lint & format: `npm run lint` and `npm run format` (run from the package workspace you modify: `client/` or `server1/`).

Project-specific patterns & conventions
- Strict TypeScript: both `client/tsconfig.json` and `server1/tsconfig.json` enable `strict` and many strict flags — prefer explicit types and avoid `any`.
- Local shared package: `@site8/shared` is a file:../shared dependency; modify shared types carefully and rebuild consumers.
- Error handling: frontend initializes `createRoot` with custom error hooks (`client/src/main.tsx`) — preserve `logError` usage.
- Server routing: `server1/src/server.ts` wires many small routers under `/api/*` — add routes under `app/routes/*` and register them in `server.ts`.
- Security & ops: server uses `helmet`, `compression`, and rate limiting; respect these configs when adding endpoints.

Files to inspect before changing code
- Server entry: [server1/src/server.ts](../server1/src/server.ts)
- Frontend entry: [client/src/main.tsx](../client/src/main.tsx)
- Shared package: [shared/package.json](../shared/package.json) and `shared/src` (types/utilities)
- Client tsconfig: [client/tsconfig.json](../client/tsconfig.json) and server tsconfig: [server1/tsconfig.json](../server1/tsconfig.json)

Testing & CI notes
- Frontend tests use `vitest` (`client/package.json` scripts). Storybook is present for UI components.
- Server has a build step that outputs `dist/`; tests are not centralized — search for `*.test.ts` for unit tests.

When making changes, prefer the smallest reproducible edit. If adding a public API change that affects both `client` and `server1`, include updated `shared/` type(s) and a brief note in the PR describing required rebuild steps for consumers.

Examples
- Add a new read route: create `server1/src/app/routes/newRoute.ts`, export router, then register in `server1/src/server.ts` under `/api/new`.
- Add a shared type: add to `shared/src/index.ts`, run `cd shared && npm run build`, then update imports in `client`/`server1` and run their builds.

Ask the user when in doubt about breaking cross-package types or changing API route behavior.

If you update these instructions, keep them short and focused — they are intended for AI agents making safe edits.

Please review — tell me which areas need more detail or examples.

```

---

## applyTo: "\*\*"

# Instructions for Copilot

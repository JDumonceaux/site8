---
applyTo: "**"
---

# Instructions for Copilot

This monorepo contains three packages: `client/` (Vite + React 19), `server/` (Express + TypeScript), and `shared/` (types/utilities consumed by both). Make minimal, focused edits that preserve existing patterns.

## Protected Files

**Never modify, overwrite, or delete any `.env*` files** (e.g. `server/.env.dev`, `server/.env.production`, `client/.env*`). These files contain secrets and environment-specific configuration. If env changes are needed, describe what to add and let the user edit them manually.

## Tech Stack Guardrails

- **Do NOT introduce Zod, Axios, or Font Awesome** — they are banned unless user explicitly requests them.
- Validation: use **Valibot** (already present in both client and server).
- HTTP client: use `client/src/lib/api/` (fetch-based `apiClient` with `.get()/.post()/.patch()` etc.) + React Query.
- Icons: use existing components under `client/src/components/icons/`.

## Developer Commands

| Task                     | Command                                                               |
| ------------------------ | --------------------------------------------------------------------- |
| Frontend dev             | `cd client && npm run dev`                                            |
| Frontend build           | `cd client && npm run build` (runs `tsc` then `vite build`)           |
| Frontend type-check only | `cd client && npm run type-check`                                     |
| Frontend tests           | `cd client && npm run test`                                           |
| Frontend Storybook       | `cd client && npm run storybook`                                      |
| Server build + start     | `cd server && npm run build && npm start` (loads `.env.dev`)          |
| Server debug             | `cd server && npm run debug`                                          |
| Lint / format            | `npm run lint` / `npm run format` (run from the package you modified) |
| Rebuild shared           | `cd shared && npm run build`                                          |

## Architecture

**Client** (`client/src/`):

- `app/` — routing (public, auth, protected content routes), providers, `App.tsx`
- `features/` — self-contained feature folders (auth, home, images, menu, site, tests, travel, yatch, generic, layouts, file-upload)
- `components/` — reusable UI components and icons
- `hooks/` — shared custom hooks
- `lib/api/` — centralized fetch client (`client.ts`, `request-builder.ts`, `response-parser.ts`, `retry-policy.ts`)
- `store/` — Redux Toolkit store; two slices: `appSettings` and `snackbar`. **React Query handles server state; Redux only for UI state.**
- `types/` — client-side types (Auth, AppSettings, FormState, etc.)

**Server** (`server/src/`):

- `server.ts` — Express entry; mounts all routers; configures helmet, compression, CORS, rate limiting
- `app/routes/` — small focused routers registered under `/api/*`
- `features/`, `services/`, `middleware/`, `utils/`

**Shared** (`shared/src/`):

- Exported as `@site8/shared` (file:../shared dep). Contains entity types (`Page`, `MenuItem`, `Image`, `Place`, `Test`, etc.), validation schemas, and utility functions.
- **Always rebuild** after changes: `cd shared && npm run build`, then rebuild consumer packages.

## Key Conventions

**Path aliases (client only — server has none):**

- `@app/*`, `@components/*`, `@features/*`, `@hooks/*`, `@lib/*`, `@providers/*`, `@store/*`, `@types`

**TypeScript:** Both packages use `strict: true`. Client targets ES2024, server targets ESNext/NodeNext with `verbatimModuleSyntax: true`.

**Authentication:** AWS Amplify (`@aws-amplify/ui-react`). Toggled by `VITE_USE_AUTH` / `USE_AUTH` env var validated via Valibot. Auth is client-side only (route guards via `ProtectedRoute`); server routes have no centralized auth middleware currently.

**Server rate limiting:** Read routes use standard limiter; mutation routes (POST/PUT/PATCH/DELETE) use stricter `mutationLimiter`. The Gemini route (`/api/gemini`) has a 30+ second timeout override. Respect these when adding endpoints.

**Error handling:** `client/src/main.tsx` wraps `createRoot` with `logError` callbacks — preserve this pattern.

**Feature structure:** Each feature is self-contained: `FeaturePage.tsx`, custom hooks, `types.ts`. Follow this pattern when adding features.

**ESLint:** Client uses 14+ ESLint plugins in separate config files (`eslint.config.*.mjs`). Run `npm run lint:fix` to auto-fix where possible.

## Files to Read Before Changing Code

- Server entry: `server/src/server.ts`
- Frontend entry: `client/src/main.tsx`
- Shared exports: `shared/src/index.ts`
- Client tsconfig (aliases): `client/tsconfig.json`

## Common Tasks

**Add a server route (read):**

1. Create `server/src/app/routes/myRoute.ts`, export `Router`
2. Register in `server/src/server.ts`: `app.use('/api/my', myRouter)`

**Add a server route (mutation):**

- Same as above but: `app.use('/api/my', mutationLimiter, myRouter)`

**Add a shared type:**

1. Add to `shared/src/index.ts`
2. `cd shared && npm run build`
3. Update imports in client/server and run their builds

**Add a client feature:**

- Create `client/src/features/my-feature/` with `MyFeaturePage.tsx`, hook(s), and `types.ts`
- Register route in `client/src/app/routes/`

Ask the user before making breaking changes to cross-package types or altering existing API route behavior.

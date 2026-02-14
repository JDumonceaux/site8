# API Router Consistency Analysis Report

Generated: 2026-02-14

## Scope

- `server1/src/app/routes/*.ts`
- `server1/src/server.ts`

## Route Wrapper Consistency (`asyncHandler`)

- `createSimpleRouter.ts`: 1/1 wrapped
- `genericRouter.ts`: 2/2 wrapped
- `menuRouter.ts`: uses `createSimpleRouter` factory (no direct route definitions)
- `pageRouter.ts`: 4/4 wrapped
- `testsRouter.ts`: 8/8 wrapped
- `travelRouter.ts`: 2/2 wrapped

## Server Route Registration Snapshot

- `app.use('/api/travel', travelRouter);`
- `app.use('/api/generic', genericRouter);`
- `app.use('/api/tests', testsRouter, mutationLimiter);`
- `app.use('/api/menus', menuRouter, mutationLimiter);`
- `app.use('/api/page', pageRouter, mutationLimiter);`

## Summary

- Total direct routes scanned: 17
- Wrapped with `asyncHandler`: 17
- Unwrapped routes: 0

## Recommendation

- All scanned routes are consistently wrapped with `asyncHandler`.

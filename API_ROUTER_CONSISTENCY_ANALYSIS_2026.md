# API Router Consistency Analysis Report

**Report Generated:** May 9, 2026  
**Last Updated:** May 9, 2026  
**Assessment Basis:** Current server route files and dynamic registration flow

## Scope

- server/src/app/routes/\*.ts
- server/src/lib/RouterRegistry.ts
- server/src/server.ts

## Route Wrapper Consistency (`asyncHandler`)

- createSimpleRouter.ts: 1/1 wrapped
- geminiRouter.ts: 2/2 wrapped
- genericRouter.ts: 2/2 wrapped
- imageRouter.ts: 4/4 wrapped
- imagesRouter.ts: 5/5 wrapped
- menuRouter.ts: uses createSimpleRouter factory (no direct route definitions)
- testsRouter.ts: 8/8 wrapped
- travelRouter.ts: 2/2 wrapped

## Server Route Registration Snapshot

Routes are auto-registered by registerRoutes(app, mutationLimiter) in server/src/server.ts.

Discovered route configs (path + mutation limiter behavior):

- /api/gemini: registered without mutationLimiter
- /api/generic: registered without mutationLimiter
- /api/image: registered with mutationLimiter
- /api/images: registered with mutationLimiter
- /api/menus: registered without mutationLimiter
- /api/tests: registered with mutationLimiter
- /api/travel: registered without mutationLimiter

## Summary

- Total direct routes scanned: 24
- Wrapped with asyncHandler: 24
- Unwrapped routes: 0

Interpretation note:

- The 24-route total is the sum of direct route declarations in router modules plus the createSimpleRouter wrapper point.
- menuRouter.ts contributes through createSimpleRouter rather than direct route declarations.

## Recommendation

- All scanned direct route handlers are consistently wrapped with asyncHandler.
- Keep routeConfig present and accurate in each \*Router.ts module so dynamic registration stays reliable.

## Missing/Vague Review (May 9, 2026)

### Findings

- No critical inconsistencies found between report claims and current route files.
- Wrapper-count and routeConfig claims are evidence-backed in current sources.

### Clarifications Added

- Clarified how the 24-route total is computed to avoid ambiguity around factory-based routers.
- Confirmed registration behavior is routeConfig-driven and mutation-aware, not hardcoded in server entry.

### Residual Risk

- Route-level consistency can drift if new router files are added without routeConfig exports or without asyncHandler wrapping.
- Re-run this audit after adding endpoints or changing RouterRegistry behavior.

## Evidence Appendix

### Core Registration Evidence

- Dynamic registration call site: [server/src/server.ts](server/src/server.ts#L108)
- Route config guard and path validation: [server/src/lib/RouterRegistry.ts](server/src/lib/RouterRegistry.ts#L21), [server/src/lib/RouterRegistry.ts](server/src/lib/RouterRegistry.ts#L24)
- Mutation-aware registration branch: [server/src/lib/RouterRegistry.ts](server/src/lib/RouterRegistry.ts#L60), [server/src/lib/RouterRegistry.ts](server/src/lib/RouterRegistry.ts#L61), [server/src/lib/RouterRegistry.ts](server/src/lib/RouterRegistry.ts#L63)

### Route Wrapper Evidence

- createSimpleRouter wrapper point: [server/src/app/routes/createSimpleRouter.ts](server/src/app/routes/createSimpleRouter.ts#L29)
- genericRouter wrapped endpoints: [server/src/app/routes/genericRouter.ts](server/src/app/routes/genericRouter.ts#L22), [server/src/app/routes/genericRouter.ts](server/src/app/routes/genericRouter.ts#L32)
- testsRouter wrapped endpoints: [server/src/app/routes/testsRouter.ts](server/src/app/routes/testsRouter.ts#L17), [server/src/app/routes/testsRouter.ts](server/src/app/routes/testsRouter.ts#L24)
- imagesRouter wrapped endpoints: [server/src/app/routes/imagesRouter.ts](server/src/app/routes/imagesRouter.ts#L14), [server/src/app/routes/imagesRouter.ts](server/src/app/routes/imagesRouter.ts#L18)
- imageRouter wrapped endpoints: [server/src/app/routes/imageRouter.ts](server/src/app/routes/imageRouter.ts#L13), [server/src/app/routes/imageRouter.ts](server/src/app/routes/imageRouter.ts#L16)
- geminiRouter wrapped endpoints: [server/src/app/routes/geminiRouter.ts](server/src/app/routes/geminiRouter.ts#L23), [server/src/app/routes/geminiRouter.ts](server/src/app/routes/geminiRouter.ts#L24)
- travelRouter wrapped endpoints: [server/src/app/routes/travelRouter.ts](server/src/app/routes/travelRouter.ts#L12), [server/src/app/routes/travelRouter.ts](server/src/app/routes/travelRouter.ts#L15)

### Route Config Evidence

- /api/gemini config: [server/src/app/routes/geminiRouter.ts](server/src/app/routes/geminiRouter.ts#L8)
- /api/generic config: [server/src/app/routes/genericRouter.ts](server/src/app/routes/genericRouter.ts#L8)
- /api/image config with mutations: [server/src/app/routes/imageRouter.ts](server/src/app/routes/imageRouter.ts#L9)
- /api/images config with mutations: [server/src/app/routes/imagesRouter.ts](server/src/app/routes/imagesRouter.ts#L10)
- /api/menus config: [server/src/app/routes/menuRouter.ts](server/src/app/routes/menuRouter.ts#L5)
- /api/tests config with mutations: [server/src/app/routes/testsRouter.ts](server/src/app/routes/testsRouter.ts#L13)
- /api/travel config: [server/src/app/routes/travelRouter.ts](server/src/app/routes/travelRouter.ts#L7)

### Audit Method

- Scanned server route modules in server/src/app/routes.
- Verified each direct route declaration uses asyncHandler wrapping.
- Verified path registration behavior from RouterRegistry mutation branch logic.

### Evidence Quality

- This report is audit-grade for wrapper and registration claims cited in the appendix.
- It is a point-in-time snapshot and should be refreshed after route additions or registration changes.

### Minimum Audit Standard for Future Updates

- Include exact commands used to enumerate route files and wrapper usage.
- Include line-linked citations for all routeConfig declarations and registration branches.
- Include execution date and package scope.

### Recommended Verification Commands

- rg "export const routeConfig" server/src/app/routes/\*Router.ts
- rg "asyncHandler\(" server/src/app/routes/\*Router.ts
- rg "registerRoutes\(app, mutationLimiter\)" server/src/server.ts
- rg "routeModule.routeConfig.mutations|app.use\(" server/src/lib/RouterRegistry.ts

---

**Report Generated:** May 9, 2026  
**Last Updated:** May 9, 2026  
**Update Method:** Route-module scan + routeConfig and asyncHandler verification

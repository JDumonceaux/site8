# Structural Improvements Implementation Plan

**Last Updated:** February 14, 2026  
**Progress:** 10 of 21 items completed (48%)

## Legend

- ✅ **Completed** - Implementation finished and verified
- 🔄 **In Progress** - Currently being worked on
- ⏳ **Not Started** - Planned but not yet begun
- **P1** - Critical Priority
- **P2** - High Priority
- **P3** - Medium Priority
- **P4** - Low Priority / Nice to Have

---

## Recent Updates (February 14, 2026)

- ✅ New test item save flow fixed: create now uses `POST /api/tests` when `id === 0`.
- ✅ Client env migration completed for Vite: runtime usage moved to `import.meta.env` and `.env*` files aligned to `VITE_*` keys.
- ✅ Tests UX improvements delivered:
  - Section-level and group-level add buttons in tests sections view.
  - Left menu group click now scrolls to corresponding section.
  - Left menu title styling updated (spacing, underline, right-corner radius).
- ✅ Code block/type improvements delivered:
  - Code label now reflects `code.type` instead of hard-coded "Code".
  - `Type` and `Content` editors use shared `Input.Text` / `Input.TextArea`.
  - Save-time `code.type` normalization added using case-insensitive match against suggestions.
- ✅ API router consistency pass completed:
  - Remaining unwrapped handlers in `testsRouter` and `pageRouter` were wrapped with `asyncHandler`.
  - Analysis report refreshed in `API_ROUTER_CONSISTENCY_ANALYSIS_2026.md`.
- ✅ Centralized API client completed (Item 3):
  - Added `client/src/lib/api/` with typed fetch client, interceptors, timeout, and retry support.
  - Migrated feature/hook network calls from scattered `fetch()` usage to `apiClient`.

> Note: Plan progress now includes Item 3 and stands at 10/21 complete.

---

## Priority 1 - Critical (2 of 3 completed)

### ✅ 1. Refactor ServiceFactory Anti-pattern

**Status:** Completed  
**Priority:** P1  
**Description:** Replace manual singleton pattern in server1/src/utils/ServiceFactory.ts with dependency injection container. Remove eslint-disable directives for import/no-cycle.

**Completed Actions:**

- Refactored to ServiceContainer pattern
- Removed circular dependency issues
- Eliminated eslint-disable comments

---

### ✅ 2. Eliminate Type Duplication

**Status:** Completed  
**Priority:** P1  
**Description:** Create shared types package for 30+ duplicate types between client and server. Move common types (Pages, Images, Bookmarks, etc.) to shared location. Update imports across both codebases.

**Completed Actions:**

- Created @site8/shared package
- Moved 9 core types to shared package
- Updated imports across client and server
- Verified builds succeed

---

### ✅ 3. Build Centralized API Client

**Status:** Completed  
**Priority:** P1  
**Description:** Create centralized API client in `client/src/lib/api/` with interceptors, error handling, and type-safe endpoints. Replace scattered fetch calls.

**Completed Actions:**

- Created `client/src/lib/api/client.ts`, `types.ts`, and `index.ts`
- Implemented request/response/error interceptor hooks
- Added timeout and retry configuration
- Migrated feature/hook-level `fetch()` calls to centralized `apiClient`
- Preserved React Query integration and existing mutation/query behavior

---

## Priority 2 - High (3 of 5 completed)

### ⏳ 4. Refactor ProtectedRoute Authentication

**Status:** Not Started  
**Priority:** P2  
**Description:** Move hardcoded authentication logic from client/src/components/ProtectedRoute.tsx to auth context/hook. Implement proper auth state management.

**Implementation Steps:**

1. Review current ProtectedRoute implementation
2. Create auth context provider
3. Create useAuth hook with proper state management
4. Refactor ProtectedRoute to use context
5. Update all route guards to use new pattern
6. Add auth state persistence
7. Test authentication flows

**Files to Modify:**

- `client/src/components/ProtectedRoute.tsx`
- Create `client/src/providers/AuthProvider.tsx`
- Create `client/src/hooks/useAuth.ts`

---

### ✅ 5. Replace Alert() with Toast Notifications

**Status:** Completed  
**Priority:** P2  
**Description:** Replace native alert() calls with the existing Snackbar/notification system across client codebase. Implement consistent notification behavior.

**Completed Actions:**

- Replaced 3 alert() calls in RenderCode.tsx
- Used existing Snackbar system with useSnackbar hook
- Implemented success and error message variants
- Verified no remaining alert() calls in codebase

---

### ✅ 6. Reorganize Server Features Directory

**Status:** Completed  
**Priority:** P2  
**Description:** Separate server1/src/features/ concerns - move non-feature utilities to appropriate directories (lib/, utils/, services/).

**Completed Actions:**

- Moved files/ → lib/filesystem/
- Moved prettier/ → services/code-quality/
- Moved build/ → services/build/
- Moved generic/ → lib/generic/
- Updated 20+ import statements
- Verified server builds successfully

---

### ✅ 7. Resolve Circular Dependencies

**Status:** Completed  
**Priority:** P2  
**Description:** Fix import cycles identified by eslint. Refactor ServiceFactory and dependent services to eliminate circular imports.

**Completed Actions:**

- Refactored ServiceFactory to ServiceContainer
- Eliminated circular imports
- Removed all eslint-disable directives for import/no-cycle

---

### ⏳ 8. Complete TODO Endpoints

**Status:** Not Started  
**Priority:** P2  
**Description:** Finish implementing incomplete TODO-related endpoints in server. Add proper validation, error handling, and tests.

**Implementation Steps:**

1. Audit existing TODO endpoints
2. Implement missing CRUD operations
3. Add request validation using existing server validation patterns
4. Add proper error handling
5. Write integration tests
6. Update API documentation

**Files to Modify:**

- `server1/src/routes/todoRouter.ts` (if exists)
- Create TODO service and types

---

## Priority 3 - Medium (1 of 2 completed)

### ✅ 9. Consolidate Constants

**Status:** Completed  
**Priority:** P3  
**Description:** Merge fragmented constants from multiple files into centralized constants.ts files per domain (client/server).

**Completed Actions:**

- Consolidated server constants to server1/src/utils/constants.ts (8 sections)
- Enhanced client constants in client/src/lib/utils/constants.ts (UI_DEFAULTS added)
- Applied across 8+ files
- Organized by logical sections

---

### ⏳ 10. Automate Router Registration

**Status:** Not Started  
**Priority:** P3  
**Description:** Replace manual router registration in server with auto-discovery pattern. Scan routes directory and register automatically.

**Implementation Steps:**

1. Create router auto-discovery utility
2. Scan `server1/src/routes/` directory
3. Automatically register all \*Router.ts files
4. Add route metadata/configuration support
5. Update server.ts to use auto-discovery
6. Add logging for registered routes
7. Test all routes still work

**Files to Modify:**

- `server1/src/server.ts`
- Create `server1/src/lib/routerRegistry.ts`

---

## Priority 4 - Low / Nice to Have (4 of 11 completed)

### ✅ 11. Organize Client Components

**Status:** Completed  
**Priority:** P4  
**Description:** Restructure client/src/components/ - separate UI primitives from feature components. Create components/ui/ subdirectory.

**Completed Actions:**

- Created components/ui/ directory
- Moved 8 component categories to ui/
- Updated 60+ import statements
- Created ui/index.ts barrel export
- Created comprehensive README.md
- Organized: button, divider, icons, input, link, loading, switch

---

### ✅ 12. Consolidate Custom Hooks

**Status:** Completed  
**Priority:** P4  
**Description:** Review client/src/hooks/ for duplication. Merge similar hooks and improve reusability.

**Completed Actions:**

- Analyzed 10 custom hooks
- Created centralized hooks/index.ts
- Created comprehensive README.md
- Added TypeScript type exports (UseFormReturn, UseFormArrayReturn)
- Enhanced all hooks with JSDoc documentation
- Verified backward compatibility

---

### ✅ 13. Clean Up Unused Directory

**Status:** Completed  
**Priority:** P4  
**Description:** Review client/src/unused/ directory. Archive or delete permanently unused code.

**Completed Actions:**

- Moved client/src/unused/ → archive/unused-client-src-2025-12-27/
- Archived 14 experimental files (home screens, animations)
- Created archive/README.md with documentation
- Removed @unused path aliases from tsconfig.json and vite.config.mts
- Verified no active imports reference archived code

---

### ⏳ 14. Add JSDoc Documentation

**Status:** Not Started  
**Priority:** P4  
**Description:** Add comprehensive JSDoc comments to all public APIs, services, and utility functions in both codebases.

**Implementation Steps:**

1. Identify all public APIs without JSDoc
2. Document server services (BaseDataService, feature services)
3. Document client utilities and helpers
4. Document shared types and interfaces
5. Add @param, @returns, @throws, @example tags
6. Generate API documentation

**Target Files:**

- All service classes in server1/src/services/
- All utilities in server1/src/utils/
- All utilities in client/src/lib/utils/
- Shared package types

---

### ⏳ 15. Implement Error Boundaries

**Status:** Not Started  
**Priority:** P4  
**Description:** Add React error boundaries at strategic levels in component tree. Implement fallback UI and error reporting.

**Implementation Steps:**

1. Create reusable ErrorBoundary component
2. Add error boundaries at route level
3. Add error boundaries around major features
4. Create fallback UI components
5. Integrate with error logging service
6. Add error recovery mechanisms
7. Test error scenarios

**Files to Create:**

- `client/src/components/core/error-boundary/ErrorBoundary.tsx`
- Update route components with error boundaries

---

### ⏳ 16. Add Unit Tests for Services

**Status:** Not Started  
**Priority:** P4  
**Description:** Create unit tests for server services using vitest. Focus on BaseDataService and feature services.

**Implementation Steps:**

1. Set up vitest for server testing
2. Write tests for BaseDataService
3. Write tests for each feature service
4. Mock file system operations
5. Add test coverage reporting
6. Aim for 80%+ coverage on services
7. Add CI integration

**Files to Create:**

- `server1/src/services/**/*.test.ts`
- `server1/src/test/` setup files

---

### ⏳ 17. Implement Request Validation

**Status:** Not Started  
**Priority:** P4  
**Description:** Add consistent request validation on all server endpoints using existing project validation patterns. Replace manual validation logic.

**Implementation Steps:**

1. Create validation schemas/utilities for all request bodies using current in-repo approach
2. Create validation middleware
3. Apply to all POST/PUT/PATCH endpoints
4. Add validation error responses
5. Update error handling
6. Remove manual validation code
7. Add validation tests

**Files to Modify:**

- All route files in server1/src/routes/
- Create server1/src/middleware/validation.ts
- Create validation schemas

---

### ⏳ 18. Create ADR Documentation

**Status:** Not Started  
**Priority:** P4  
**Description:** Document architectural decisions in ADR format. Create docs/adr/ directory with key decisions.

**Implementation Steps:**

1. Create docs/adr/ directory structure
2. Document ServiceContainer pattern decision
3. Document shared types package decision
4. Document component organization decision
5. Document Snackbar vs toast library decision
6. Create ADR template
7. Add index of all ADRs

**Files to Create:**

- `docs/adr/README.md`
- `docs/adr/0001-service-container-pattern.md`
- `docs/adr/0002-shared-types-package.md`
- Additional ADRs for major decisions

---

### ⏳ 19. Optimize Bundle Size

**Status:** Not Started  
**Priority:** P4  
**Description:** Analyze webpack bundle, implement code splitting beyond lazy loading. Review and remove unused dependencies.

**Implementation Steps:**

1. Run bundle analyzer
2. Identify large dependencies
3. Implement dynamic imports for large libraries
4. Remove unused dependencies
5. Optimize imports (use named imports)
6. Add tree-shaking configuration
7. Measure and document improvements

**Tools:**

- vite-bundle-visualizer
- npm-check or depcheck

---

### ⏳ 20. Setup Pre-commit Hooks

**Status:** Not Started  
**Priority:** P4  
**Description:** Configure husky with lint-staged for pre-commit validation. Run linting, type checking, and formatting.

**Implementation Steps:**

1. Install husky and lint-staged
2. Configure pre-commit hook
3. Add linting step
4. Add type checking step
5. Add formatting step
6. Test hook with intentional errors
7. Document in README

**Files to Create/Modify:**

- `.husky/pre-commit`
- Update package.json with lint-staged config

---

### ⏳ 21. Implement CI/CD Pipeline

**Status:** Not Started  
**Priority:** P4  
**Description:** Create GitHub Actions workflow for automated testing, linting, and deployment on push/PR.

**Implementation Steps:**

1. Create .github/workflows/ directory
2. Create CI workflow (test, lint, type-check)
3. Create CD workflow (build, deploy)
4. Add branch protection rules
5. Configure deployment environments
6. Add status badges to README
7. Test workflows

**Files to Create:**

- `.github/workflows/ci.yml`
- `.github/workflows/cd.yml`

---

## Summary

### Completed (10 items)

1. ✅ ServiceFactory refactoring
2. ✅ Type duplication elimination
3. ✅ Alert() replacement with Snackbar
4. ✅ Server features reorganization
5. ✅ Circular dependencies resolution
6. ✅ Constants consolidation
7. ✅ Client components organization
8. ✅ Custom hooks consolidation
9. ✅ Unused directory cleanup
10. ✅ Centralized API client implementation

### Remaining (11 items)

**High Priority:**

- Refactor ProtectedRoute authentication (P2)
- Complete TODO endpoints (P2)
- Automate router registration (P3)

**Low Priority:**

- Add JSDoc documentation (P4)
- Implement error boundaries (P4)
- Add unit tests for services (P4)
- Implement request validation (P4)
- Create ADR documentation (P4)
- Optimize bundle size (P4)
- Setup pre-commit hooks (P4)
- Implement CI/CD pipeline (P4)

### Recommended Next Steps

1. **Refactor ProtectedRoute authentication** - Improves security architecture
2. **Complete TODO endpoints** - Closes backend functional gaps
3. **Add unit tests for services** - Increases code reliability
4. **Implement error boundaries** - Improves user experience and error handling

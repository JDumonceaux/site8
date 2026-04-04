---
name: modern-react
description: "Audit and implement modern React APIs across the client codebase. Use when asked to add React Activity, ViewTransition, use(), useOptimistic, useActionState, useDeferredValue, startTransition, or any React 19 feature. Always runs in plan mode first — scans for candidates, categorizes them by value/risk, presents a numbered plan for approval, then implements only approved changes. Trigger phrases: 'add Activity component', 'modernize React', 'React 19 features', 'add ViewTransition', 'use useOptimistic', 'update to React 19 APIs'."
argument-hint: "React API name (e.g. 'Activity', 'ViewTransition', 'useOptimistic') — required"
---

# Modern React API Adoption

Audits the client codebase for adoption opportunities for a specific React 19 API, produces a prioritized plan, and implements approved changes safely.

---

## Supported APIs

| API                                 | Primary Use Case                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| `<Activity>`                        | Preserve state/DOM of toggled UI (drawers, tabs, panels) instead of unmounting       |
| `<ViewTransition>`                  | Animate route changes and component transitions using browser View Transitions       |
| `useOptimistic`                     | Optimistic UI updates for mutations (replace local loading state patterns)           |
| `useActionState`                    | Form actions with integrated pending/error state (replace useState + handler combos) |
| `useDeferredValue`                  | Defer expensive re-renders behind high-priority updates                              |
| `startTransition` / `useTransition` | Mark state updates as non-urgent to keep UI responsive                               |
| `use(Promise)`                      | Read a Promise in render (replace useEffect data-fetch patterns)                     |

---

## Phase 1 — Research the API

If the API is unfamiliar or the user hasn't provided docs, fetch the reference:

```
https://react.dev/reference/react/<ApiName>
```

Extract:

- What problem it solves
- Props / signature
- Caveats (things that **don't** work, e.g. Activity hidden components with text-only children)
- Side-effect handling requirements (e.g. Activity needs `useLayoutEffect` cleanup for DOM side effects)

---

## Phase 2 — Audit the Client

Use a subagent (`Explore`, thorough) or parallel grep/semantic searches to find candidates. Scope: `client/src/` only unless the user specified a path.

### What to look for per API

#### `<Activity>`

Search for these patterns — each is a candidate for state preservation:

| Pattern                                    | What to grep for                                                            |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| Unmount-on-hide                            | `if (!isOpen) return null`, `!isOpen && return null`, `{isOpen && <`        |
| Conditional branch swap                    | `{flag ? <ComponentA` and `{!flag ? <ComponentB` (two views swapping)       |
| `display: none` / `visibility: hidden` CSS | `display.*none`, `visibility.*hidden` in styled components or inline styles |
| Accordion / expand                         | `isExpanded && <`, `{expanded ? <Content`                                   |
| Tab panels                                 | `activeTab === 'x' && <TabContent` patterns                                 |

For each match, read the file to understand:

1. Does it have internal state or expensive DOM worth preserving?
2. Does it have side effects that need cleanup (audio, video, timers, scroll locks)?
3. How often does the user toggle it (frequently → higher value)?

#### `<ViewTransition>`

Search for these patterns — each is a candidate for animated route/view transitions:

| Pattern                                                         | What to grep for                                                                                                |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `useNavigate` called inside `startTransition` / `useTransition` | `startTransition.*navigate\|startNavigationTransition` — highest value; transition is already marked non-urgent |
| Bare `useNavigate` calls                                        | `const navigate = useNavigate` — check if called in click handlers with no transition wrapper                   |
| Route-level `<NavLink>` / `<Link>` components                   | `import.*NavLink\|import.*Link.*react-router` — pure CSS route transitions can use `<ViewTransition>` wrapper   |
| CSS mount/unmount animations                                    | `animation.*enter\|animation.*leave\|transition.*opacity` in styled-components — confirms visual intent exists  |

For each match read the surrounding navigation call to confirm:

1. Is it a page-level route change (not just a tab/panel swap — use Activity for those)?
2. Is there already a visual animation that ViewTransition would enhance?
3. Does the call site sit inside a `startTransition` block? (upgrade path is simpler)

**Non-candidate clarification:** React Router `<Link>` / `<NavLink>` alone are not ViewTransition candidates — the browser does not trigger a View Transition for SPA client-side navigation unless you wrap the `navigate()` call or link click with `document.startViewTransition()`. React's `<ViewTransition>` component works alongside `startTransition`.

#### `useOptimistic`

- Mutation hooks using `useState` for local loading/pending states
- React Query `onMutate` + `onSettled` optimistic patterns
- List items with a local `isDeleting` / `isSaving` flag

#### `useActionState`

**Note:** This codebase has already adopted `useActionState` widely. Search for the **remaining** old-pattern forms:

| Pattern                | What to grep for                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| Legacy submit handler  | `handleSubmit.*SyntheticEvent\|onSubmit={handleSubmit}` — forms that still use event.preventDefault() |
| Manual error state     | `useState.*errors\|useState.*message.*string` paired with a submit handler (not `useActionState`)     |
| Adopted pattern (skip) | `useActionState\|formAction\|createFormAction` — already migrated, skip these                         |

The project uses a shared `createFormAction(schema, asyncFn)` helper in `features/auth/authFormHelpers.ts` that wraps Valibot validation + async mutation into a form action. New `useActionState` adoptions should follow this pattern when validation is involved.

#### `useDeferredValue`

- `useMemo` on derived filtered/sorted lists
- Search / filter inputs where the derived result lags behind typing

#### `startTransition` / `useTransition`

- State updates in event handlers that cause slow re-renders
- Tab/navigation switching that feels janky

---

## Phase 3 — Categorize Candidates

Group every finding into three tiers:

| Tier       | Criteria                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| **High**   | Direct swap, clear UX benefit, minimal risk, no side-effect concerns                                         |
| **Medium** | Requires a small refactor (e.g. convert useEffect → useLayoutEffect, extract a base component)               |
| **Low**    | Possible but marginal benefit, or requires measuring first (e.g. DOM size concerns for many-item accordions) |

**Always document non-candidates** — places that look like candidates but aren't, with the reason:

| Non-candidate type                           | Reason                                                            |
| -------------------------------------------- | ----------------------------------------------------------------- |
| Radix UI Dialog / controlled modal libraries | Library manages its own lifecycle; Activity would conflict        |
| Notifications / toasts                       | Should be fully destroyed on dismiss — no state to preserve       |
| Route-level components                       | React Router controls mounting; Activity can't span routes        |
| Text-only components inside Activity hidden  | React Activity caveat: hidden text-only components render nothing |

---

## Phase 4 — Present Plan

Show non-candidates table first (so the user sees what was considered and skipped).

Then for each candidate:

```
## Candidate [A/B/C] — ComponentName (TIER)
File: client/src/path/to/Component.tsx  Line X

CURRENT:  {isOpen && <SlideoutDialog />}   [or:  if (!isOpen) return null]
PROPOSED: <Activity mode={isOpen ? 'visible' : 'hidden'}><SlideoutDialog /></Activity>

BENEFIT:  [what UX improves — e.g. "filter selections preserved between open/close"]
RISK:     [what to watch — e.g. "body overflow Effect must use useLayoutEffect cleanup"]
```

End with:

> "Ready to apply? Reply **yes** to apply all, or list candidates to skip (e.g. 'skip C')."

---

## Phase 5 — Implement

Apply only approved candidates. Always read each target file fully before editing.

### `<Activity>` implementation rules

1. **Import**: `import { Activity } from 'react'` — no new package needed
2. **Remove the unmount guard**: delete `if (!isOpen) return null` or `{flag && <Component>}` conditional
3. **Wrap with Activity**: `<Activity mode={flag ? 'visible' : 'hidden'}>...</Activity>`
4. **Fix return type**: if the function was `JSX.Element | null`, change to `JSX.Element`
5. **Convert side-effect Effects**: any Effect that manipulates DOM (scroll lock, overflow, media pause) must use `useLayoutEffect` with a cleanup return — not `useEffect` — so cleanup fires synchronously when Activity hides the component

   ```tsx
   // Before
   useEffect(() => {
     document.body.style.overflow = isOpen ? "hidden" : "";
     return () => {
       document.body.style.overflow = "";
     };
   }, [isOpen]);

   // After (Activity-compatible)
   useLayoutEffect(() => {
     document.body.style.overflow = isOpen ? "hidden" : "";
     return () => {
       document.body.style.overflow = "";
     };
   }, [isOpen]);
   ```

6. **Known side-effect sources** that need `useLayoutEffect` cleanup: `<video>`, `<audio>`, `<iframe>`, `document.body.style.*`, scroll position locks, `setTimeout`/`setInterval` refs

### For two-branch swaps (tabs, toggles)

Wrap **both** branches — one visible, one hidden:

```tsx
// Before
{isGrouped ? <ViewA /> : <ViewB />}

// After
<Activity mode={isGrouped ? 'visible' : 'hidden'}><ViewA /></Activity>
<Activity mode={!isGrouped ? 'visible' : 'hidden'}><ViewB /></Activity>
```

---

## Phase 6 — Verify

```powershell
cd client; npm run type-check
```

If errors: fix before moving to the next candidate. Common issues:

- **`JSX.Element | null` return type** — remove `| null` after deleting the early-return guard
- **`Activity` not in React types** — check `react` version is `^19.2+`; if TS complains, ensure `@types/react` is at matching version
- **`noPropertyAccessFromIndexSignature`** — unrelated pre-existing; fix with bracket notation (`env['KEY']` not `env.KEY`)

---

## Phase 7 — Summary

Report:

1. Files changed and what was applied
2. UX improvements (what state is now preserved)
3. Any candidates skipped and why
4. Manual smoke tests the user should run

---

## Project-Specific Notes (site8)

- **React version**: `^19.x` — `Activity` is available, import from `'react'`
- **No SSR** — Vite SPA, no hydration concerns; skip the "Selective Hydration" use case
- **`SlideoutDialog`** — already migrated. Uses `useLayoutEffect` for body overflow. Used by `ImageFiltersDialog` and `TestFiltersDialog`
- **`TestsPage` isGrouped views** — already migrated. Both list views wrapped in Activity boundaries
- **Radix dialogs** (`@radix-ui/react-dialog`) — always non-candidates; Radix manages its own portal lifecycle
- **React Router routes** — always non-candidates for `<Activity>`; unmount is intended behavior for route navigation
- **`useTransition`** — already adopted in `TravelMenu.tsx` (`startNavigationTransition`), `useMenuExpansion.ts`, `SubjectMenu.tsx`
- **`useActionState`** — already adopted in all auth forms (`SigninPage`, `SignupPage`, `ForgotPasswordPage`, `DeleteAccountPage`, `ChangePasswordPage`) and `useMenuAdd.ts`. Uses shared `createFormAction` helper. Only `SignoutPage.tsx` still uses `handleSubmit` pattern.
- **`ViewTransition` prime candidate** — `TravelMenu.tsx`: calls `navigate(url)` inside `startNavigationTransition` (a `useTransition` hook); adding `<ViewTransition>` around the menu-to-page transition is the natural next step
- **`useLayoutEffect` import** — already in `'react'`; add it to the existing import declaration alongside `Activity`

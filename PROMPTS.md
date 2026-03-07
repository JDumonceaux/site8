# Code Review, Testing & Fix Prompts

A reusable reference of prompts for common code quality, review, and debugging tasks.

---

## CSS & Styles

- Read the styles from the browser. Are there any wrong styles, deprecated styles, excessive overwriting, or other issues?
- Analyze the CSS custom properties (CSS variables). Find any that are used but not defined, defined but never used, or redundant/duplicated.
- Check for `text-rendering`, `-webkit-text-size-adjust`, or other rendering properties set in multiple places that conflict or override each other.
- Review the CSS reset file. Are there any overly aggressive resets, outdated browser-specific comments, or values that hurt accessibility (e.g. `line-height: 1`)?
- Are there any CSS variables used in components that are not declared in the design token file?
- Look for CSS `@property` declarations. Are they consistent and complete, or only partially applied?
- Check for hardcoded color values that should instead reference a CSS custom property.

---

## TypeScript & Type Safety

- Review the codebase for uses of `any`. Replace with `unknown` plus type guards, or with the correct type.
- Find types or interfaces that are duplicated across files. Consolidate into a shared location.
- Check all exported functions for explicit return types. Add missing return types.
- Look for places where `||` is used for default values that should use `??` (nullish coalescing).
- Find any optional chaining (`?.`) opportunities where nested property access could throw.
- Are there discriminated unions that could replace boolean flags or string-typed state?

---

## React Components

- Review components for missing `key` props on list-rendered elements.
- Find `useEffect` hooks with missing or incorrect dependency arrays.
- Look for prop types passed as `undefined` that cause "Edit undefined" or similar display bugs. Add fallback values.
- Check for unnecessary re-renders: are callbacks passed to children memoized with `useCallback`? Are expensive computations wrapped in `useMemo`?
- Are there components that do more than one thing? Identify candidates for splitting into focused sub-components.
- Find any `StrictMode` wrappers applied more than once in the component tree.
- Check for redundant `Suspense` boundaries wrapping the same lazy-loaded content.
- Audit Radix UI dialog usage: every `Dialog` must include a `DialogTitle` and `DialogDescription` (can be visually hidden) or Radix will log accessibility warnings.
- Check for `<button>` nested inside another `<button>` (e.g. tooltip trigger wrapping a button). Fix with `asChild` on the trigger.
- When native DOM elements (`<input>`, `<select>`, `<textarea>`) receive spread props, verify that non-HTML attributes (e.g. `label`, `endAdornment`) are explicitly destructured out before spreading, to prevent React unknown-prop warnings.

---

## API & Data Flow

- Review API route handlers for missing error handling or unguarded async operations.
- Check that all routes validate their input before processing. Are there paths where bad input reaches business logic?
- Find any hardcoded strings (URLs, file paths, status codes) that should be constants.
- Are there utility functions duplicated across feature modules? Extract to a shared utility.
- Check service/factory files: are all services registered and do their dependency references match what is exported?
- For a file-matching feature, verify the match key (e.g. `fileName` + `folder`) is identical between the filesystem scan and the index file records. Check case normalization.
- When a list filters by "unmatched", confirm the server actually filters the items before returning them — not just labelling them — so matched items are never included in the response.
- Check that `src` path constants are consistent between server and client (e.g. `/images` vs `/public/images`). A mismatch silently breaks both file serving and validation.

---

## Browser Inspection

- Read the generated HTML from the browser. Are there any errors or excessive nesting?
- Open the browser console. Are there any errors, warnings, or missing resource (404) responses?
- Check the network tab for API calls that return unexpected status codes.
- Inspect computed styles on key elements. Do the applied values match the intended design tokens?
- Are there layout or overflow issues visible at different viewport sizes?
- Check for AbortError patterns on initial page load indicating race conditions or duplicate requests.

---

## Unit Tests

- Write tests for all branches of a validation function (valid input, missing required field, wrong format, edge cases).
- Add tests for utility functions that transform or map data (identity, empty input, boundary values).
- Check test coverage for error paths — are failure cases tested as well as happy paths?
- Review test names: do they describe the scenario and expected outcome clearly?
- Are external dependencies (API calls, filesystem) properly mocked in unit tests?

---

## Code Organization

- Review imports across a feature. Are there circular dependencies or imports that violate the intended layer boundaries?
- Find dead code: exported functions, types, or components that are never imported anywhere.
- Check barrel files (`index.ts`). Are they consistent — do they export everything they should and nothing they shouldn't?
- Are file names consistent with the conventions used elsewhere in the project (kebab-case, PascalCase for components)?
- Look for functions longer than ~50 lines. Are there natural split points?
- Review hook names for accuracy: a hook named `useRenameX` that also updates description, title, and folder should be called `useUpdateX` to reflect its full responsibility.
- After renaming a hook or type, search for all references (file name, exported name, call-site alias, internal type names) and update them together in one pass.

---

## Monorepo / Shared Package

- After adding a type to the shared package, verify it is exported from the package index and that consumers import it correctly.
- Check that the shared package has been rebuilt before running consumers (`npm run build` in `shared/`).
- Find any types defined identically in both `client` and `server` that should be moved to `shared`.

---

## Git & Build

- Run `npm run build` and capture any TypeScript errors. Fix in order of severity.
- Run the linter (`npm run lint`) and address any errors. Note warnings as lower-priority cleanup.
- Check for any `TODO:` or `FIXME:` comments that have been outstanding for multiple sessions.

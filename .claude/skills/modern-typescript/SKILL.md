---
name: modern-typescript
description: "Plan and apply TypeScript utility type and ES2025 runtime modernizations across the codebase. Use when asked to modernize TypeScript, find opportunities to use utility types, replace manual mapped types, review code for Partial/Required/Readonly/Pick/Omit/Record/Exclude/Extract/NonNullable/ReturnType/Parameters/Awaited/NoInfer or string manipulation types, or audit TypeScript for older patterns that modern built-ins can replace. Also detects ES2025 runtime opportunities: Iterator helpers (take/drop/Iterator.from/toArray), Set methods (union/intersection/difference/isSubsetOf/isSupersetOf/isDisjointFrom/symmetricDifference), RegExp.escape(), Promise.try(), and import attributes (with { type: 'json' }). Always runs in plan mode first — presents a full list of changes for approval before editing any files."
argument-hint: "Optional file path or feature to scope the review (default: full codebase)"
---

# Modern TypeScript & ES2025 Modernization

Scans the codebase for manual type patterns that can be replaced with TypeScript's built-in utility types, and for runtime patterns that ES2025 built-ins can replace. Presents a prioritized plan, then applies changes only after user approval.

---

## When to Use

- User asks to "modernize TypeScript", "find utility type opportunities", or "review types"
- User pastes a list of TypeScript utility types and asks for a review
- User asks about `Partial`, `Readonly`, `Pick`, `Omit`, `Record`, `ReturnType`, etc.
- Code review surfaces manual mapped types or repeated `| undefined` patterns
- User mentions ES2025, Iterator helpers, Set methods, `RegExp.escape`, `Promise.try`, or import attributes
- User asks to "update existing code" to use modern JavaScript/TypeScript features

---

## Phase 1 — Scan

Search the `client/src`, `server/src`, and `shared/src` directories for patterns that utility types can replace. Use parallel searches for efficiency.

### Pattern Catalogue

Use the table below to drive searches. Look for the "Old Pattern" column using `grep_search` or `semantic_search`.

| Utility Type        | Old Pattern to Find                                                           | Replaces With                                                      |
| ------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `Partial<T>`        | `{ [K in keyof T]?: T[K] }`                                                   | `Partial<T>`                                                       |
| `Required<T>`       | `{ [K in keyof T]-?: T[K] }`                                                  | `Required<T>`                                                      |
| `Readonly<T>`       | `{ readonly [K in keyof T]: T[K] }`                                           | `Readonly<T>`                                                      |
| `Record<K, V>`      | `{ [key: string]: V }`, `{ [K in Keys]: V }`                                  | `Record<K, V>`                                                     |
| `Pick<T, K>`        | Manual re-declaration of a subset of an interface                             | `Pick<T, K>`                                                       |
| `Omit<T, K>`        | Manual re-declaration of all-but-some fields                                  | `Omit<T, K>`                                                       |
| `Exclude<T, U>`     | Conditional type `T extends U ? never : T`                                    | `Exclude<T, U>`                                                    |
| `Extract<T, U>`     | Conditional type `T extends U ? T : never`                                    | `Extract<T, U>`                                                    |
| `NonNullable<T>`    | `T extends null \| undefined ? never : T`, or `Exclude<T, null \| undefined>` | `NonNullable<T>`                                                   |
| `ReturnType<F>`     | Manually repeating a function's return type                                   | `ReturnType<typeof fn>`                                            |
| `Parameters<F>`     | Manually repeating a function's parameter tuple                               | `Parameters<typeof fn>`                                            |
| `Awaited<T>`        | `T extends Promise<infer R> ? R : T`                                          | `Awaited<T>`                                                       |
| `NoInfer<T>`        | Type cast workarounds to suppress unwanted inference                          | `NoInfer<T>`                                                       |
| `Uppercase<S>` etc. | Manual string literal union construction                                      | `Uppercase<S>`, `Lowercase<S>`, `Capitalize<S>`, `Uncapitalize<S>` |

**Also look for:**

- Duplicate interface declarations that differ only by optionality → `Partial<Base>` or `Required<Base>`
- Response/Request pairs where one is a subset of the other → `Pick<T, K>` or `Omit<T, K>`
- `type Keys = 'a' | 'b'; type Obj = { [K in Keys]: SomeType }` → `Record<Keys, SomeType>`
- Functions whose return type annotation manually restates what `ReturnType<typeof fn>` would infer

---

### ES2025 Runtime Pattern Catalogue

Scan for these JavaScript/TypeScript runtime patterns. Use `grep_search` with the "Old Pattern" column.

#### Iterator Helpers

| ES2025 API            | Old Pattern to Find                                                       | Replaces With                                                          |
| --------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `Iterator.from(iter)` | `Array.from(someIterator)`, `[...someIterator]` when only to iterate once | `Iterator.from(someIterator)` — lazy, no array allocation              |
| `.toArray()`          | `Array.from(iter.filter(...))`, `[...iter.map(...)]`                      | `Iterator.from(iter).filter(...).toArray()`                            |
| `.take(n)`            | Manual counter loop, `arr.slice(0, n)` on a freshly-mapped array          | `.take(n)` on an Iterator chain                                        |
| `.drop(n)`            | `arr.slice(n)` on a freshly-mapped array, manual skip counter             | `.drop(n)` on an Iterator chain                                        |
| Full chain            | `Array.from(map.values()).filter(x => ...).map(x => ...)`                 | `Iterator.from(map.values()).filter(x => ...).map(x => ...).toArray()` |

**Search patterns:**

- `Array.from(` — inspect each site for iterator sources
- `.slice(0,` — check if preceded by an array created only to truncate
- `for.*of.*entries\(\)` or `for.*of.*values\(\)` — could be an Iterator chain

> **Note:** Iterator helper methods (`.filter()`, `.map()`, `.take()`, `.drop()`, `.toArray()`) are available at runtime in modern browsers/Node 22+ but TypeScript 6.0.2's `ES2024` lib does not include them yet. Add `/// <reference lib="esnext.iterator" />` at the top of the file, or cast with `(iter as any)` only as a last resort. Prefer upgrading the lib when the project allows.

---

#### Set Methods (ES2025)

| ES2025 API                 | Old Pattern to Find                                                            | Replaces With              |
| -------------------------- | ------------------------------------------------------------------------------ | -------------------------- |
| `a.union(b)`               | `new Set([...a, ...b])`                                                        | `a.union(b)`               |
| `a.intersection(b)`        | `new Set([...a].filter(x => b.has(x)))`                                        | `a.intersection(b)`        |
| `a.difference(b)`          | `new Set([...a].filter(x => !b.has(x)))`                                       | `a.difference(b)`          |
| `a.symmetricDifference(b)` | `new Set([...a].filter(x => !b.has(x)).concat([...b].filter(x => !a.has(x))))` | `a.symmetricDifference(b)` |
| `a.isSubsetOf(b)`          | `[...a].every(x => b.has(x))`                                                  | `a.isSubsetOf(b)`          |
| `a.isSupersetOf(b)`        | `[...b].every(x => a.has(x))`                                                  | `a.isSupersetOf(b)`        |
| `a.isDisjointFrom(b)`      | `![...a].some(x => b.has(x))`                                                  | `a.isDisjointFrom(b)`      |

**Search patterns:**

- `new Set\(\[\.\.\.(\w+)\]` — spread into Set constructor (union candidate)
- `\.filter\(x => (\w+)\.has\(x\)\)` — intersection/difference candidate
- `\.every\(x => (\w+)\.has\(x\)\)` — subset/superset candidate

> **Note:** Set method types are in `lib.esnext.set.d.ts`. Add `/// <reference lib="esnext.set" />` if the tsconfig lib does not include them.

---

#### RegExp.escape()

| ES2025 API           | Old Pattern to Find                                                          | Replaces With                           |
| -------------------- | ---------------------------------------------------------------------------- | --------------------------------------- |
| `RegExp.escape(str)` | Manual escape: `str.replace(/[$()*+.?[\\\]^{\|}]/g, ...)`                    | `RegExp.escape(str)`                    |
| `RegExp.escape(str)` | Utility helper function named `escapeRegex`, `escapeRegExp`, `sanitizeRegex` | Delete helper, use `RegExp.escape(str)` |

**Search patterns:**

- `escapeRegex\|escapeRegExp\|sanitizeRegex` — local escape helpers
- `\.replace\(.*\\\\` — regexp escaping via replace

> **Note:** `RegExp.escape` is Stage 4 / ES2025 but is NOT in TypeScript 6.0.2's `ES2024` lib. Add `/// <reference lib="esnext.regexp" />` or declare a module augmentation. The copilot-instructions currently document the manual escape workaround — when the project upgrades its lib target, replace workaround sites.

---

#### Promise.try()

| ES2025 API        | Old Pattern to Find                                                     | Replaces With                      |
| ----------------- | ----------------------------------------------------------------------- | ---------------------------------- |
| `Promise.try(fn)` | `new Promise(resolve => resolve(fn()))`                                 | `Promise.try(fn)`                  |
| `Promise.try(fn)` | `Promise.resolve().then(() => fn())`                                    | `Promise.try(fn)`                  |
| `Promise.try(fn)` | Immediately-invoked async IIFE: `(async () => { ... })()` at call sites | `Promise.try(async () => { ... })` |

**Search patterns:**

- `new Promise\(resolve => resolve\(` — synchronous resolve wrapper
- `Promise\.resolve\(\)\.then\(` — then-chained synchronous start
- `\(async \(\) =>` — IIFE async functions (check if they need `.catch`)

> **Note:** `Promise.try` is Stage 4 / ES2025. It is already listed as **recommended** in the project's `general-coding.instructions.md`. TypeScript 6.0.2 lib may not include it; use `/// <reference lib="esnext.promise" />` as needed.

---

#### Import Attributes (`with { type: 'json' }`)

| ES2025 API                                                   | Old Pattern to Find                                       | Replaces With                                    |
| ------------------------------------------------------------ | --------------------------------------------------------- | ------------------------------------------------ |
| `import data from './data.json' with { type: 'json' }`       | `import data from './data.json'` (no assertion/attribute) | Add `with { type: 'json' }`                      |
| `import data from './data.json' with { type: 'json' }`       | Old `assert { type: 'json' }` syntax (TC39 Phase 1 era)   | Replace `assert` → `with`                        |
| Dynamic: `import('./data.json', { with: { type: 'json' } })` | `import('./data.json')` for JSON files                    | Add second argument `{ with: { type: 'json' } }` |

**Search patterns:**

- `from '.*\.json'` — static JSON imports missing the attribute
- `assert \{ type:` — old assertion syntax to migrate to `with`
- `import\(.*\.json` — dynamic JSON imports

> **Note:** `with { type: 'json' }` is the ES2025 Import Attributes syntax (replaced the old `assert` keyword). Vite 5+ and Node 22+ support it. TypeScript 5.3+ accepts it. Always add this for JSON, CSS, and other non-JS module imports.

---

## Phase 2 — Present Plan

Group findings by file. For each finding, show:

```
FILE: client/src/features/foo/types.ts  Line 14
  BEFORE: { [K in keyof User]?: User[K] }
  AFTER:  Partial<User>
  REASON: Manual homomorphic mapped type — Partial<T> is the canonical form
  CATEGORY: Utility Type
```

```
FILE: client/src/features/foo/utils.ts  Line 42
  BEFORE: new Set([...setA].filter(x => setB.has(x)))
  AFTER:  setA.intersection(setB)
  REASON: ES2025 Set.prototype.intersection — clearer intent, no intermediate array
  CATEGORY: ES2025 Runtime
```

Organize into three priority tiers:

| Tier       | Criteria                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------- |
| **High**   | Direct mechanical replacement, zero behaviour change, improves readability                        |
| **Medium** | Requires a small refactor (e.g. extracting a base type first) or a `/// <reference lib>` addition |
| **Low**    | Possible but subjective (e.g. `ReturnType<>` where the explicit type adds documentation value)    |

Present the full plan as a numbered list. State the total count per tier. **Do not edit any files until the user approves.**

After presenting the plan, call `vscode_askQuestions` with:

```json
{
  "questions": [
    {
      "header": "Apply changes",
      "question": "Which changes would you like to apply?",
      "options": [
        { "label": "Apply all", "recommended": true },
        { "label": "Apply High-tier only" },
        { "label": "Let me pick — I'll specify numbers to skip" },
        { "label": "Cancel — plan only" }
      ]
    }
  ]
}
```

If the user picks **"Let me pick"**, follow up with a second `vscode_askQuestions` listing each numbered item as a checkbox (multiSelect) so they can deselect items to skip.

---

## Phase 3 — Apply

Apply only the approved changes using `multi_replace_string_in_file` (batch independent changes per file).

Rules:

- Apply High-tier changes automatically when approved
- For Medium-tier, apply and note any prerequisite extractions made
- Never apply Low-tier unless user explicitly included them
- After edits, run type-check to confirm no regressions:

```powershell
cd client; npm run type-check
cd server; npm run typecheck
cd shared; npm run build
```

Stop on first type error and report before continuing.

---

## Phase 4 — Summary

Report:

1. Files changed (list with line counts)
2. Utility types introduced (tally per type)
3. Lines of type code removed (net reduction)
4. Any findings skipped and why

---

## Scope Modifiers

If an argument is passed (e.g. `modern-typescript client/src/features/auth`), restrict the scan to that path. Otherwise scan all three packages.

If the user says **"plan only"** or **"plan mode"**, stop after Phase 2 and wait for explicit approval before Phase 3.

---

## Project-Specific Notes (site8)

- `shared/src/types/` — Valibot schemas co-locate with types; `v.InferOutput<typeof Schema>` already derives types correctly. Look for duplicated manual type declarations that duplicate what the schema already infers.
- **`erasableSyntaxOnly: true`** — No enums. If you see `{ [K in MyEnum]: V }` the enum is already banned; these will already be string literal unions, making `Record<K, V>` straightforward.
- **`verbatimModuleSyntax: true`** — All type imports must use `import type`. When adding new utility type imports, check they come from existing imports; `Partial`, `Record` etc. are global — no import needed.
- Avoid `any`; use `unknown` + type guards. If a utility type opportunity requires adding `any`, skip it.

### ES2025 TypeScript Lib Availability

TypeScript 6.0.2 ships `ES2024` as its highest stable lib; `ES2025` lib files do not exist in the distribution yet. For features below, add the appropriate triple-slash reference directive at the top of each modified file, or add the lib to `tsconfig.json` `"lib"` array when the whole project is ready:

| Feature                                                          | Triple-slash reference                    |
| ---------------------------------------------------------------- | ----------------------------------------- |
| Iterator helpers (`.take`, `.drop`, `.toArray`, `Iterator.from`) | `/// <reference lib="esnext.iterator" />` |
| Set methods (`.union`, `.intersection`, etc.)                    | `/// <reference lib="esnext.set" />`      |
| `RegExp.escape()`                                                | `/// <reference lib="esnext.regexp" />`   |
| `Promise.try()`                                                  | `/// <reference lib="esnext.promise" />`  |

Import attributes (`with { type: 'json' }`) are a syntax feature supported by TypeScript 5.3+ — no lib change needed.

- The `general-coding.instructions.md` already recommends `Promise.try()`, Set methods, and Iterator helpers — changes aligning code to these patterns are always **High** tier.
- `RegExp.escape`: the project's `copilot-instructions.md` currently documents a manual escape workaround. When applying `RegExp.escape`, remove the workaround site and add the `esnext.regexp` reference.
- JSON imports: the project uses Vite 5+ and Node 22+, both of which support `with { type: 'json' }`. Always add the attribute for JSON imports.

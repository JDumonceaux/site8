---
name: modern-typescript
description: "Plan and apply TypeScript utility type modernizations across the codebase. Use when asked to modernize TypeScript, find opportunities to use utility types, replace manual mapped types, review code for Partial/Required/Readonly/Pick/Omit/Record/Exclude/Extract/NonNullable/ReturnType/Parameters/Awaited/NoInfer or string manipulation types, or audit TypeScript for older patterns that modern built-ins can replace. Always runs in plan mode first — presents a full list of changes for approval before editing any files."
argument-hint: "Optional file path or feature to scope the review (default: full codebase)"
---

# Modern TypeScript Utility Type Modernization

Scans the codebase for manual type patterns that can be replaced with TypeScript's built-in utility types, presents a prioritized plan, then applies changes only after user approval.

---

## When to Use

- User asks to "modernize TypeScript", "find utility type opportunities", or "review types"
- User pastes a list of TypeScript utility types and asks for a review
- User asks about `Partial`, `Readonly`, `Pick`, `Omit`, `Record`, `ReturnType`, etc.
- Code review surfaces manual mapped types or repeated `| undefined` patterns

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

## Phase 2 — Present Plan

Group findings by file. For each finding, show:

```
FILE: client/src/features/foo/types.ts  Line 14
  BEFORE: { [K in keyof User]?: User[K] }
  AFTER:  Partial<User>
  REASON: Manual homomorphic mapped type — Partial<T> is the canonical form
```

Organize into three priority tiers:

| Tier       | Criteria                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------- |
| **High**   | Direct mechanical replacement, zero behaviour change, improves readability                     |
| **Medium** | Requires a small refactor (e.g. extracting a base type first)                                  |
| **Low**    | Possible but subjective (e.g. `ReturnType<>` where the explicit type adds documentation value) |

Present the full plan as a numbered list. State the total count per tier. **Do not edit any files until the user approves.**

End the plan with:

> "Ready to apply? Reply **yes** to apply all, or list the numbers to skip (e.g. 'skip 3, 7')."

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

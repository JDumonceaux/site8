---
name: update-packages
description: Safe, structured npm dependency update workflow for the roots monorepo. Use this skill whenever the user mentions updating packages, upgrading dependencies, bumping versions, running npm audit, fixing vulnerabilities, or checking for outdated packages — even if they say something casual like "let's update everything" or "what needs updating". Handles the three-package structure with the required sequence: edit shared/package.json → npm i → build shared → edit client/package.json → npm i → edit server/package.json → npm i.
---

# Update Packages Skill

A structured workflow for safely updating npm dependencies across the `roots` monorepo — three independent packages (`shared/`, `server/`, `client/`) with no npm workspaces and a `file:../shared` cross-reference.

The golden rule: **shared → build → client → install → server → install**, in that exact order.

---

## Phase 1: Audit and Assess

Run **one command per package** — each combines audit and outdated in a single pass. These use PowerShell syntax (`;` not `&&`):

```powershell
Write-Host "=== SHARED ==="; cd shared; npm audit; npm outdated; cd ..
Write-Host "=== SERVER ==="; cd server; npm audit; npm outdated; cd ..
Write-Host "=== CLIENT ==="; cd client; npm audit; npm outdated; cd ..
```

> **Note:** `npm outdated` exits with code **1** whenever any package is outdated — this is expected and not an error.

### Reading the output

- **Red rows** (wanted < latest) → minor/patch updates available, low risk
- **Wanted = current** → already at the range ceiling; only major bump available
- `npm audit` severities: **critical/high** → act now; **moderate/low** → schedule

### Visual Analysis & Planning (Step 1.5)

Before categorizing, compile findings into visual summary tables for clarity:

#### Vulnerabilities by Severity

Create a table mapping vulnerabilities across all three packages:

```
| Package | Severity | Count | Status | Fix Available |
|---------|----------|-------|--------|---------------|
| **shared/** | … | … | … | … |
| **server/** | … | … | … | … |
| **client/** | … | … | … | … |
```

Include notes on critical issues (e.g., **critical** vulnerabilities in transitive deps).

#### Packages with Updates Available

Create a table showing all outdated packages, their update type (patch/minor/major), and classification buckets:

```
| Package | Current | Latest | Type | Bucket | Notes |
|---------|---------|--------|------|--------|-------|
| **@foo/bar** | X.Y.Z | X.Y.Z | Patch | Safe | … |
| **baz** | X.Y.Z | X.Y.Z | Minor | Safe | … |
| **qux** | X.Y.Z | X.Y.Z | Major | **Watch** | Read changelog |
```

Include which package(s) each dependency appears in (shared/server/client, or cross-cutting).

#### Recommended Plan

Summarize the strategy in bullet points:

- Which updates are **Safe** and will proceed first
- Which updates are **Watch** and require changelog review
- Which updates are **Hold** (if any)
- Any intentional skips and reasoning

This visual analysis helps both prevent mistakes and gives the user confidence in the update plan before execution begins.

**Auto-proceed rule:** If the plan contains only **Safe** updates (no Watch or Hold items requiring a decision), proceed directly to Phase 3 without asking for confirmation — the user can interrupt if needed. Only pause for explicit user input when there are Watch/Hold packages that need a go/no-go decision.

---

## Phase 2: Categorize and Plan

Group updates into three buckets:

| Bucket    | Criteria                                           | Strategy                             |
| --------- | -------------------------------------------------- | ------------------------------------ |
| **Safe**  | Patch and minor bumps within current major         | Update freely                        |
| **Watch** | Major version bump for a well-understood package   | Read changelog, update one at a time |
| **Hold**  | Major bump for native modules or foundational deps | Discuss with user first              |

### Known high-attention packages in this repo

- **`typescript`** — currently `^6.0.2`. Any bump that changes the major is load-bearing; run `typecheck` in all three packages immediately after.
- **`better-sqlite3`** — native module. Major bumps may require `npm rebuild`. Watch for API surface changes (`Database`, `Statement` types).
- **`react` / `react-dom`** — on `^19`. Only `@types/react` and `@types/react-dom` need to track the same major.
- **`@tanstack/react-query`** — v5 API (hooks signature). Major bumps are breaking.
- **`valibot`** — used in both **client and server**; always bump both in the same round and keep versions in sync.
- **`express`** — server is on Express 5. Check `@types/express` version matches.
- **`eslint` / `@eslint/js`** — flat config format locked to v9+. Any major bump (e.g. v9→v10) is **Hold** level: the plugin API and rule names can change significantly across the whole flat-config surface spanning 14+ plugins.
- **`@typescript-eslint/eslint-plugin` / `@typescript-eslint/parser` / `typescript-eslint`** — all three appear across shared/client/server and **must stay at identical versions**. `typescript-eslint` (the unified package) is server-only but must match the others. Update all occurrences in the same edit pass.
- **`i18next` / `react-i18next`** — **Watch** on major bumps; API surface changes between majors (e.g. v25→v26 changes plugin/middleware signatures).
- **`html-react-parser`** — **Watch** on major bumps (e.g. v5→v6 changed the options API).
- **`@roots/shared`** — the `file:../shared` local dependency. Never bump this entry; it's always the local build.

### Known accepted vulnerabilities (do not attempt to auto-fix)

- **`@aws-amplify/ui-react` → lodash** (high severity, transitive): `npm audit fix --force` would downgrade `@aws-amplify/ui-react` to v2.1.9 — a breaking change. There is no safe fix available until AWS Amplify removes the lodash dependency. Skip this finding; do not run `npm audit fix` in `client/`.

---

## Phase 3: Execute Updates

### Order matters

Always follow this exact sequence — do not skip steps or reorder:

**Step 1 — Update versions in `shared/package.json`**

Edit `shared/package.json` directly — bump the version strings for all packages being updated. Then navigate into `shared/` and install once.

```powershell
cd shared
npm i --legacy-peer-deps
```

**Step 2 — Build `shared/`** (must succeed before touching consumers)

```powershell
npm run build
```

Stop here if the build fails. Fix the issue before proceeding.

**Steps 3 & 4 — Install `client/` and `server/` in parallel**

Edit both `client/package.json` and `server/package.json` (already done with the shared edits above). Then kick off both installs simultaneously using background terminals — they are independent of each other and only depend on the shared build that just completed.

- Start `client/` install as a **background terminal**: `cd client; npm i --legacy-peer-deps`
- Start `server/` install as a **background terminal**: `cd server; npm i --legacy-peer-deps`
- Wait for both to complete before proceeding to Phase 4.

> **Why edit `package.json` first?** Bumping versions in the file then running a single `npm i --legacy-peer-deps` is faster than running individual `npm i <pkg>@latest` calls — one network pass resolves the whole tree at once.

> **Why `--legacy-peer-deps`?** This repo uses TypeScript 6.x while some ESLint plugins still declare peer deps against `<6.0.0`. The flag skips strict peer validation so the install succeeds without downgrading TypeScript.

### Version string patterns

- Patch/minor: change `"^x.y.z"` → `"^x.y.latest"` (keep the `^` range prefix)
- Major: change `"^x.y.z"` → `"^newmajor.0.0"` — treat as **Watch** bucket, read changelog first

### Keeping `@typescript-eslint` in sync

Both `eslint-plugin` and `parser` must always be the same version. Update both in the same `package.json` edit before running `npm i`.

---

## Phase 4: Verify After Each Package

The `npm install` steps in Phase 3 re-link `@roots/shared` and lock in peer deps. After that, run these verification checks.

After `shared/` build (Step 2 above):

- Build output in `shared/dist/` should be fresh with no TypeScript errors

After both installs complete, verify **client and server in parallel** using background terminals:

- **client** (background): `cd client; npm run type-check; npm run build; npm run lint`
- **server** (background): `cd server; npm run typecheck; npm run build; npm run lint`

Wait for both. If either fails, stop and fix that package before reporting success.

> **Shortcut for patch-only rounds:** If every updated package is a patch bump and no `@types/*` packages changed, you can skip `npm run build` in client/server and run only `type-check` + `lint` — a full build is unlikely to catch anything new on a pure patch update.

### What to look for in errors

- **TS type errors after a `@types/*` bump** → the type surface changed; update call sites
- **ESLint config errors after an eslint/plugin bump** → flat config rules may have been renamed or removed; check the plugin's migration guide
- **Native module errors (`better-sqlite3`)** → run `npm rebuild better-sqlite3` in `server/`
- **`@roots/shared` type errors in client/server** → rebuild shared first (`cd shared && npm run build`), then re-run the consumer's typecheck

---

## Phase 5: Security Follow-up

Only re-audit packages where vulnerabilities existed or new dependencies were added. In most rounds this means just `client/` (the lodash issue) and any package with a new dependency:

```powershell
# Only run the packages that had audit findings in Phase 1
cd client; npm audit; cd ..
```

If Phase 1 found issues in shared or server, re-audit those too:

```powershell
cd shared; npm audit; cd ..
cd server; npm audit; cd ..
```

For vulnerabilities that can't be fixed by a version bump (e.g., transitive dependencies), use `npm audit fix` cautiously — prefer `--package-lock-only` first to preview changes:

```powershell
npm audit fix --package-lock-only  # preview
npm audit fix                       # apply
```

> **Reminder:** Do NOT run `npm audit fix` in `client/` — the `@aws-amplify/ui-react` lodash vulnerability is an accepted risk (see Known Accepted Vulnerabilities above). Auto-fix would introduce a breaking downgrade.

Avoid `npm audit fix --force` — it can introduce breaking major bumps silently.

---

## Completing the Update

Once all packages build and lint cleanly:

1. Summarize what was updated (package name, old version → new version)
2. Note any packages intentionally skipped and why
3. Remind the user to smoke-test the running app (`npm run start:server`, `npm run start:client`)
4. If any `package-lock.json` files changed, those should be committed alongside `package.json`

---

## Quick Reference

```powershell
# Root-level build all
npm run build:shared   # cd shared; tsc
npm run build:server   # cd server; tsc
npm run build:client   # cd client; tsc --noEmit + vite build

# Per-package type check
cd shared; npm run build
cd server; npm run typecheck
cd client; npm run type-check

# Full workspace lint
npm run lint           # runs client lint + server lint
```

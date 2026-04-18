---
name: update-packages
description: Safe, structured npm dependency update workflow for the roots monorepo. Use this skill whenever the user mentions updating packages, upgrading dependencies, bumping versions, running npm audit, fixing vulnerabilities, or checking for outdated packages — even if they say something casual like "let's update everything" or "what needs updating". Handles the three-package structure with the required sequence: edit shared/package.json → npm i → build shared → edit client/package.json → npm i → edit server/package.json → npm i.
---

# Update Packages Skill

A structured workflow for safely updating npm dependencies across the `roots` monorepo — three independent packages (`shared/`, `server/`, `client/`) with no npm workspaces and a `file:../shared` cross-reference.

The golden rule: **shared → build → client → install → server → install**, in that exact order.

---

## Phase 1: Audit and Assess

Run these three commands (all at once) to get a full picture before touching anything:

```bash
cd shared && npm audit && cd ..
cd server && npm audit && cd ..
cd client && npm audit && cd ..
```

Then check what's outdated:

```bash
cd shared && npm outdated && cd ..
cd server && npm outdated && cd ..
cd client && npm outdated && cd ..
```

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

---

## Phase 2: Categorize and Plan

Group updates into three buckets:

| Bucket          | Criteria                                           | Strategy                              |
| --------------- | -------------------------------------------------- | ------------------------------------- |
| **Safe**        | Patch and minor bumps within current major         | Update freely                         |
| **Watch**       | Major version bump for a well-understood package   | Read changelog, update one at a time  |
| **Hold**        | Major bump for native modules or foundational deps | Discuss with user first               |
| **Plugin-Safe** | eslint-plugin-\* major/minor/patch bumps           | Update freely (independent of eslint) |

> **Key rule**: ESLint plugins can be updated independently from the `eslint` core. Update plugins freely; hold `eslint` core itself unless doing a coordinated upgrade.

### Known high-attention packages in this repo

- **`typescript`** — currently `^6.0.2`. Any bump that changes the major is load-bearing; run `typecheck` in all three packages immediately after.
- **`better-sqlite3`** — native module. Major bumps may require `npm rebuild`. Watch for API surface changes (`Database`, `Statement` types).
- **`react` / `react-dom`** — on `^19`. Only `@types/react` and `@types/react-dom` need to track the same major.
- **`@tanstack/react-query`** — v5 API (hooks signature). Major bumps are breaking.
- **`valibot`** — used in both client and server; keep versions in sync across packages.
- **`express`** — server is on Express 5. Check `@types/express` version matches.
- **`eslint`** — flat config format (v9+). **Hold at current version** unless doing a coordinated ecosystem bump. Do not upgrade major versions without explicit user approval.
- **`eslint-plugin-*`** (e.g., `eslint-plugin-unicorn`, `eslint-plugin-react`) — **Can be updated freely** (major, minor, patch) independent of eslint core. These are safe to bump and often receive breaking changes that improve rule quality.
- **`@typescript-eslint/*`** — must stay in sync with each other and with `typescript` version. Can be updated together; do not intermix versions.
- **`@roots/shared`** — the `file:../shared` local dependency. Never bump this entry; it's always the local build.

---

## Phase 3: Execute Updates

### Order matters

Always follow this exact sequence — do not skip steps or reorder:

**Step 1 — Update versions in `shared/package.json`**

Edit `shared/package.json` directly — bump the version strings for all packages being updated. Then navigate into `shared/` and install once.

```bash
cd shared
npm i --legacy-peer-deps
```

**Step 2 — Build `shared/`** (must succeed before touching consumers)

```bash
npm run build
```

Stop here if the build fails. Fix the issue before proceeding.

**Step 3 — Update versions in `client/package.json`**

Edit `client/package.json` directly — bump the version strings. Then navigate into `client/` and install once.

```bash
cd ../client
npm i --legacy-peer-deps
```

**Step 4 — Install `server/`**

Edit `server/package.json` directly — bump the version strings. Then navigate into `server/` and install once.

```bash
cd ../server
npm i --legacy-peer-deps
```

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

After `client/` install (Step 4):

```bash
cd client && npm run type-check
cd client && npm run build
cd client && npm run lint
```

After `server/` install (Step 6):

```bash
cd server && npm run typecheck
cd server && npm run build
cd server && npm run lint
```

If any step fails, **stop and fix before moving on**. Do not cascade a broken state into the next package.

### What to look for in errors

- **TS type errors after a `@types/*` bump** → the type surface changed; update call sites
- **ESLint config errors after an eslint/plugin bump** → flat config rules may have been renamed or removed; check the plugin's migration guide
- **Native module errors (`better-sqlite3`)** → run `npm rebuild better-sqlite3` in `server/`
- **`@roots/shared` type errors in client/server** → rebuild shared first (`cd shared && npm run build`), then re-run the consumer's typecheck

---

## Phase 5: Security Follow-up

After all updates, re-run audit and confirm the vulnerability count dropped:

```bash
cd shared && npm audit && cd ..
cd server && npm audit && cd ..
cd client && npm audit && cd ..
```

For vulnerabilities that can't be fixed by a version bump (e.g., transitive dependencies), use `npm audit fix` cautiously — prefer `--package-lock-only` first to preview changes:

```bash
npm audit fix --package-lock-only  # preview
npm audit fix                       # apply
```

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

```bash
# Root-level build all
npm run build:shared   # cd shared && tsc
npm run build:server   # cd server && tsc
npm run build:client   # cd client && tsc --noEmit + vite build

# Per-package type check
cd shared && npm run build
cd server && npm run typecheck
cd client && npm run type-check

# Full workspace lint
npm run lint           # runs client lint + server lint
```

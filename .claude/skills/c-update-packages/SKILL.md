---
name: c-update-packages
description: Dependency bump workflow for the roots monorepo. Default mode edits package.json versions only; special mode installs TypeScript 7.1 across all packages when it becomes available.
---

# Update Packages Skill

A structured workflow for updating dependency versions across the roots monorepo.

Interpretation rule: when a user asks to "update packages" without narrowing scope, treat it as "update all dependency and devDependency package versions to current" across shared, client, and server, except where TypeScript rules below require otherwise.

The golden rule: shared -> client -> server.

---

## Scope

Default mode is limited to package manifest edits:

- Update version strings in:
  - shared/package.json
  - client/package.json
  - server/package.json
- In default "update packages" requests, update all dependency and devDependency version entries in those manifests to current versions.
- Keep the existing dependency section and ordering style.
- Do not introduce new dependencies unless the user explicitly asks.

This skill must skip all command execution:

- No npm i
- No npm audit/audit fix
- No build/typecheck/lint/test validation
- No package-lock regeneration work

Exception: TypeScript 7.1 rollout mode (see below) allows npm install steps.

## Execution Order

Always edit manifests in this order:

1. shared/package.json
2. client/package.json
3. server/package.json

Do not run install or verification steps between edits in default mode.

## Version Edit Rules

Default interpretation for "update packages":

- Update all dependency and devDependency versions in scope to current available versions.
- Preserve the existing range prefix when present (for example `^` or `~`) unless user intent says otherwise.

Version validity requirements (mandatory):

- Only write versions that are real, published versions for that package.
- Never guess versions, infer versions by incrementing numbers, or fabricate patch/minor values.
- Validate target versions against authoritative package metadata (for example npm registry metadata such as `npm view <package> version` or `npm view <package> versions --json`).
- If a target version cannot be validated as existing, do not write it; keep the current version and report it as intentionally skipped.

Additional rules:

- Never change @roots/shared from file:../shared.
- Keep @typescript-eslint/parser and @typescript-eslint/eslint-plugin on the same version.
- Keep cross-package shared dependencies aligned when required by repo conventions (for example valibot where both client and server use it).
- Keep `typescript` unchanged unless TypeScript 7.1 rollout mode is explicitly requested.

## TypeScript 7.1 Rollout Mode

When the user requests TypeScript 7.1, this mode supersedes default manifest-only behavior.

1. Check availability:

```bash
npm view typescript versions --json
```

2. If any `7.1.x` version exists, update `typescript` in all three manifests:

- shared/package.json
- client/package.json
- server/package.json

Use `^7.1.0`.

3. Install after each manifest edit to persist lockfile updates:

```bash
cd shared && npm i --legacy-peer-deps
cd ../client && npm i --legacy-peer-deps
cd ../server && npm i --legacy-peer-deps
```

3a. If npm warns that install scripts were blocked by allowScripts during these installs, review and approve the blocked package before retrying install:

```bash
npm install-scripts ls
npm install-scripts approve <pkg>
```

For the known warning shown below, approve `unrs-resolver` and retry the interrupted install:

```bash
npm install-scripts approve unrs-resolver
```

4. Keep `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` synchronized in each package. If TypeScript 7.1 compatibility requires a coordinated bump, update both together.

5. If `7.1.x` is not available, do not install TypeScript. Report that availability check failed and keep current TypeScript versions unchanged.

## Output Requirements

After edits, report:

1. A concise summary of what was updated (do not list every package change by default)
2. Which package.json files were updated
3. Any intentionally skipped packages and why
4. Whether TypeScript 7.1 rollout mode was used
5. In default mode: a note that install and validation were intentionally skipped
6. In TypeScript 7.1 rollout mode: list install commands run and resulting lockfile changes
7. Confirmation that all written versions were validated as existing (and list any packages skipped due to missing/unverifiable versions)
8. If install-scripts approvals were required, list the approved package names and approval commands run

If the user explicitly asks for a detailed changelog, include package-by-package old version -> new version details.

## Explicit Non-Goals

Do not:

- Run npm i or any package manager command
- Run audit/build/typecheck/lint/test commands
- Edit lockfiles manually
- Refactor source code to accommodate upgraded packages
- Guess or fabricate dependency versions

If the user later requests install or validation, handle that as a separate follow-up task.

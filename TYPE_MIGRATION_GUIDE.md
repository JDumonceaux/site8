# Type Duplication Elimination - Migration Guide

Date: May 9, 2026
Completed On: May 9, 2026

## Overview

This guide covers migration from local package-specific type definitions to shared exports from @site8/shared.
It reflects the current monorepo layout: client, server, and shared.

## Current Status

- Shared package setup is complete.
- Client and server both depend on @site8/shared using a local file link.
- Adoption is active and broad across both codebases.
- Validation primitives in shared are Valibot-based.

## Shared Package Reference

Package and linkage:

- Package name: @site8/shared
- Version: 1.0.0
- Link method in runtime packages: file:../shared

Primary exports:

- shared/src/index.ts exports both types and utilities.
- shared/src/types/index.ts exports shared domain types and runtime schemas.

Representative shared type modules:

- Collection
- Common
- ImageFiles
- ImageItem
- Images
- Menus
- Metadata
- PageMenu
- Pages
- Places
- Tests

Notable tests file-level exports now available from shared:

- TestFileItem
- TestFileGroup
- TestFileSection
- TestsFile
- TestFile

Representative runtime schema exports:

- ImageSchema
- MetadataSchema
- PageSchema
- ParentSchema
- PlaceSchema
- PlaceImageSchema
- PlaceUrlSchema
- TestSchema
- TestGroupSchema
- TestSectionSchema
- TestCodeSchema

## Migration Patterns

### Client Migration Pattern

Before:

```ts
import type { SomeType } from "../types/SomeType";
```

After:

```ts
import type { SomeType } from "@site8/shared";
```

### Server Migration Pattern

Before:

```ts
import type { SomeType } from "../types/SomeType.js";
```

After:

```ts
import type { SomeType } from "@site8/shared";
```

### Schema Import Pattern

Before (local schema or package-local parser):

```ts
import { SomeSchema } from "../types/SomeType.js";
```

After (shared runtime schema):

```ts
import { SomeSchema } from "@site8/shared";
```

## Recommended Migration Workflow

1. Rebuild shared first when changing shared types or schemas.
2. Update imports in small batches by feature area.
3. Run package checks after each batch.
4. Remove obsolete local duplicate type files only after imports are fully migrated.
5. Update this guide when shared exports change.

Suggested commands:

```bash
cd shared && npm run build
cd client && npm run type-check
cd server && npm run typecheck
```

Use ripgrep for discovery:

```bash
rg "from ['\"]\.\./types/|from ['\"][.]{2}/types/" client/src
rg "from ['\"]\.\./types/|from ['\"][.]{2}/types/" server/src
rg "@site8/shared" client/src server/src
```

## Current High-Value Cleanup Targets

1. Reduce legacy re-export wrappers in client/src/types and server/src/types where direct shared imports are preferable.
2. Migrate remaining cross-package domain types that are still duplicated outside shared.
3. Keep runtime schema exports in shared synchronized with usage in both client and server.

## Completed And Next Candidate Types

### Completed (May 9, 2026)

1. Tests file container and aliases

Implemented state:

- Shared now exports file-level test container and aliases in [shared/src/types/Tests.ts](shared/src/types/Tests.ts#L62).
- Shared re-exports these from [shared/src/types/index.ts](shared/src/types/index.ts#L30).
- Server test-file shim now re-exports shared types from [server/src/types/TestFile.ts](server/src/types/TestFile.ts#L1).

Result:

- Duplicated local TestFile container definitions were removed from server and replaced with shared exports.

### 1) Page text-enriched type (Medium)

Current state:

- Server defines PageText as PageMenu plus optional text in [server/src/types/PageText.ts](server/src/types/PageText.ts#L3).
- Generic service logic consumes this shape in [server/src/lib/generic/GenericService.ts](server/src/lib/generic/GenericService.ts#L1).

Recommendation:

- Add a shared type representing PageMenu with optional text content.
- Migrate server to import this type from shared.

Why this is next:

- It is a domain-level response shape built directly on existing shared types.

### 2) Image file edit extension (Medium-Low)

Current state:

- Shared defines ImageFile in [shared/src/types/ImageFiles.ts](shared/src/types/ImageFiles.ts#L3).
- Server keeps a local ImageFileEdit extension with originalFolder in [server/src/feature/images/Image.ts](server/src/feature/images/Image.ts#L12).

Recommendation:

- If this edit shape is likely to be reused, move ImageFileEdit to shared.
- Otherwise keep it server-local but avoid redefining base ImageFile in server and always import the base from shared.

Why this is next:

- Removes a local duplicate concept and clarifies the boundary between shared base models and server-only edit metadata.

## Verification Checklist

- Shared build passes.
- Client type-check passes.
- Server typecheck passes.
- No broken imports from removed local type files.
- Updated docs reference server (not server1) and Valibot (not Zod).

## Related Documentation

- [TYPE_DUPLICATION_IMPLEMENTATION.md](TYPE_DUPLICATION_IMPLEMENTATION.md)
- [shared/README.md](shared/README.md)

## Evidence Appendix

### Source Citations

- Shared package identity and version: [shared/package.json](shared/package.json#L2), [shared/package.json](shared/package.json#L3)
- Shared package uses Valibot: [shared/package.json](shared/package.json#L46), [shared/package.json](shared/package.json#L47)
- Shared root entry exports types and utils: [shared/src/index.ts](shared/src/index.ts#L5), [shared/src/index.ts](shared/src/index.ts#L6)
- Shared types and schemas export surface: [shared/src/types/index.ts](shared/src/types/index.ts#L6), [shared/src/types/index.ts](shared/src/types/index.ts#L10), [shared/src/types/index.ts](shared/src/types/index.ts#L17), [shared/src/types/index.ts](shared/src/types/index.ts#L19), [shared/src/types/index.ts](shared/src/types/index.ts#L22)
- Client depends on @site8/shared: [client/package.json](client/package.json#L32)
- Server depends on @site8/shared: [server/package.json](server/package.json#L57)

### Point-In-Time Adoption Snapshot

- @site8/shared imports in client/src: 55 matches
- @site8/shared imports in server/src: 39 matches

### Scope Note

This guide provides migration guidance and evidence-backed state references.
It does not assert fresh build/lint/type-check outcomes unless those commands are executed as part of the update.

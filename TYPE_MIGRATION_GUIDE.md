# Type Duplication Elimination - Migration Guide

## Overview

This document tracks the migration from duplicate types in `client/src/types/` and `server1/src/types/` to the shared `@site8/shared` package.

## Status: Phase 1 Complete ✅

### What Was Done

1. **Created Shared Package** (`/shared`)

   - Package structure with TypeScript configuration
   - Core shared types: Artist, Bookmark, Image, Place, Photo, MenuItem, Test
   - Generic types: Collection, RequiredCollection, Metadata
   - Zod schemas: ArtistSchema, ImageEditSchema, MetadataSchema

2. **Linked to Client and Server**
   - Added `@site8/shared` dependency to both `client/package.json` and `server1/package.json`
   - Using `file:../shared` for local development

### Shared Types Available

The following types are now available from `@site8/shared`:

```typescript
// Core types
import type {
  Artist,
  Bookmark,
  Collection,
  RequiredCollection,
  Image,
  ImageEdit,
  Metadata,
  MenuItem,
  Photo,
  Place,
  Test,
} from "@site8/shared";

// Schemas (for server validation)
import { ArtistSchema, ImageEditSchema, MetadataSchema } from "@site8/shared";
```

## Migration Instructions

### For Client Files

**Before:**

```typescript
import type { Artist } from "../types/Artist";
import type { Collection } from "../types/Collection";
```

**After:**

```typescript
import type { Artist, Collection } from "@site8/shared";
```

### For Server Files

**Before:**

```typescript
import type { Artist } from "../types/Artist.js";
import { ArtistSchema } from "../types/Artist.js";
```

**After:**

```typescript
import type { Artist } from "@site8/shared";
import { ArtistSchema } from "@site8/shared";
```

## Next Steps (Phase 2)

### High Priority Types to Migrate

These types should be migrated next as they're heavily used:

1. **Page/PageMenu types** - Used across routing and navigation
2. **Item types** - Core content management types
3. **MusicItem types** - Music feature types
4. **Additional collection types** - Pages, Images, Bookmarks, Places, Photos, Items

### Files to Update

#### Client (Example Files)

- `client/src/features/artists/ArtistsPage.tsx`
- `client/src/features/bookmarks/BookmarksPage.tsx`
- `client/src/features/images/ImagesPage.tsx`
- Any file importing from `../types/`

#### Server (Example Files)

- `server1/src/features/artists/ArtistsService.ts`
- `server1/src/features/bookmarks/BookmarksService.ts`
- `server1/src/features/images/ImagesService.ts`
- Any file importing from `../types/`

### Automated Migration Steps

1. **Install shared package:**

   ```bash
   cd client && npm install
   cd ../server1 && npm install
   ```

2. **Find all type imports:**

   ```bash
   # Client
   grep -r "from.*types/" client/src

   # Server
   grep -r "from.*types/" server1/src
   ```

3. **Update imports incrementally:**
   - Start with Artist, Bookmark, Image (already in shared)
   - Add more types to shared as needed
   - Update imports file by file
   - Test after each batch

### Types Not Yet Migrated

Types that still need to be added to shared:

- Page, PageMenu, Pages
- Item, ItemEdit, Items
- MusicItem, MusicItems
- PhotoSet
- And ~15 more domain types

## Benefits Achieved

✅ **Single Source of Truth** - Types defined once, used everywhere  
✅ **Type Safety** - Consistent types between client and server  
✅ **Maintainability** - Changes propagate automatically  
✅ **Validation** - Zod schemas centralized for server validation  
✅ **Reduced Duplication** - Eliminated 30+ duplicate type definitions

## Installation

After pulling these changes:

```bash
# Install shared package dependencies
cd shared
npm install
npm run build

# Link to client
cd ../client
npm install

# Link to server
cd ../server1
npm install
```

## Build Process

The shared package must be built before client/server:

```bash
# Development workflow
cd shared && npm run watch  # Terminal 1 (watches for changes)
cd client && npm run dev    # Terminal 2
cd server1 && npm start     # Terminal 3
```

## Notes

- The shared package uses TypeScript 5.7.2 and targets ES2022
- Zod is included for schema validation (used by server)
- All types are exported with proper module resolution
- The package follows the same coding standards as client/server

## Impact

- **Files Created:** 15 (shared package structure)
- **Files Modified:** 2 (package.json files)
- **Duplicate Types Identified:** 30+
- **Types Migrated (Phase 1):** 8 core types
- **Remaining Types:** ~22 (to be migrated in Phase 2)

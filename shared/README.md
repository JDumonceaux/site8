# @site8/shared

Shared types and utilities for site8 client and server applications.

## Purpose

This package contains:

- Common data types (Artist, Bookmark, Image, Pages, etc.)
- Generic collection types
- Zod schemas for validation
- Shared utility types

## Usage

### In Client

```typescript
import { Artist, Collection, Metadata } from "@site8/shared";
```

### In Server

```typescript
import { ArtistSchema, type Artist } from "@site8/shared";
```

## Development

```bash
# Build
npm run build

# Watch mode
npm run watch
```

## Structure

- `src/types/` - Core type definitions
- `src/schemas/` - Zod validation schemas
- `src/index.ts` - Main export file

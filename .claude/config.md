# Claude Project Configuration

## Project Overview

**Site8** is a full-stack web application built with React and Node.js, featuring a client-server architecture with AWS Amplify authentication.

### Project Structure

```
site8/
├── client/          # React TypeScript frontend
│   ├── src/
│   │   ├── app/           # App entry and setup
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Feature-based modules
│   │   ├── hooks/         # Custom React hooks
│   │   ├── providers/     # Context providers (App, Redux, Router)
│   │   ├── store/         # Redux store configuration
│   │   ├── styles/        # Global styles
│   │   └── types/         # TypeScript type definitions
│   └── public/      # Static assets
├── server1/         # Node.js Express backend
│   ├── src/
│   │   ├── features/      # Feature modules
│   │   ├── lib/           # Utilities and helpers
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API route handlers
│   │   ├── services/      # Business logic services
│   │   └── utils/         # Utility functions
│   └── data/        # JSON data files
└── .github/
    └── instructions/      # Coding standards and guidelines
```

---

## Technology Stack

### Client (Frontend)

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **State Management:** Redux Toolkit + React Query (TanStack Query)
- **Routing:** React Router v6
- **Styling:** Styled Components
- **UI Components:** Radix UI primitives
- **Auth:** AWS Amplify
- **Forms:** Custom hooks (useForm, useFormArray)

### Server (Backend)

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Data Storage:** JSON files (file-based database)
- **API:** RESTful endpoints

---

## Coding Standards

### General Rules

All code must follow the guidelines in `.github/instructions/`:

- **general-coding.instructions.md** - Universal coding standards
- **typescript-react.instructions.md** - TypeScript & React specific rules

### Key Conventions

#### Naming

- **PascalCase:** Components, interfaces, type aliases
- **camelCase:** Variables, functions, methods
- **ALL_CAPS:** Constants
- **Prefix private members:** `_privateMethod`

#### TypeScript

- Use TypeScript for all new code
- Prefer `readonly` for immutability
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Define explicit types for props and state
- Export types with `export type` for type-only exports

#### React

- Use functional components with hooks
- No conditional hook calls
- Keep components focused and single-responsibility
- Use `React.memo()` for expensive renders only
- Lazy load routes and large components

#### File Organization

- One component per file
- Co-locate related files (component + styles + tests)
- Use barrel exports (index.ts) for clean imports
- Feature-based folder structure

---

## Common Patterns

### Component Structure

```tsx
import type { JSX } from "react";
import styled from "styled-components";

type MyComponentProps = {
  readonly title: string;
  readonly onAction?: () => void;
};

export const MyComponent = ({
  title,
  onAction,
}: MyComponentProps): JSX.Element => {
  // Component logic
  return <Wrapper>{title}</Wrapper>;
};

MyComponent.displayName = "MyComponent";

const Wrapper = styled.div`
  /* styles */
`;
```

### Custom Hooks

- Prefix with `use`
- Return tuple or object based on complexity
- Keep hooks focused on single responsibility

### API Calls

- Use React Query for data fetching
- Use Redux for global app state (not server data)
- Handle loading and error states explicitly

### Type Definitions

- Define in `client/src/types/`
- Export via `types/index.ts`
- Use `readonly` for immutable properties
- Zod schemas for runtime validation

---

## Important Do's and Don'ts

### ✅ Do

- **Use existing utilities** - Check `lib/utils/` before creating new helpers
- **Follow the DRY principle** - Extract shared logic into hooks or utilities
- **Type everything** - No implicit `any` types
- **Error boundaries** - Wrap feature areas with error boundaries
- **Accessibility** - Use semantic HTML and ARIA labels
- **Performance** - Lazy load routes, memo expensive components
- **Code splitting** - Use dynamic imports for large dependencies
- **Consistent imports** - Use path aliases (`@components`, `@features`, etc.)

### ❌ Don't

- **Don't duplicate code** - Reuse existing components and utilities
- **Don't nest StrictMode** - Already wrapped at entry point
- **Don't use class components** - Use functional components with hooks
- **Don't ignore TypeScript errors** - Fix them, don't suppress with `any` or `@ts-ignore`
- **Don't commit unused code** - Remove commented code and unused imports
- **Don't hardcode values** - Use constants from `lib/utils/constants.ts`
- **Don't skip error handling** - Always handle promise rejections
- **Don't over-abstract** - Keep it simple until complexity is justified

---

## Path Aliases

```typescript
@app/*          → src/app/*
@components/*   → src/components/*
@features/*     → src/features/*
@hooks/*        → src/hooks/*
@lib/*          → src/lib/*
@providers/*    → src/providers/*
@store/*        → src/store/*
@types          → src/types/index.ts
```

---

## Common Tasks

### Adding a New Feature

1. Create folder in `client/src/features/feature-name/`
2. Create page component (e.g., `FeaturePage.tsx`)
3. Add route in `providers/RouterProvider.tsx`
4. Add types in `types/FeatureType.ts` and export in `types/index.ts`
5. Create API endpoints in `server1/src/features/feature-name/`

### Adding a New Component

1. Create in appropriate folder (`components/core/` or `components/custom/`)
2. Define TypeScript props type
3. Export via parent `index.ts`
4. Add Storybook story if reusable

### Adding a Type

1. Create file in `client/src/types/TypeName.ts`
2. Export via `types/index.ts` using `export type *`
3. For Zod schemas, also export the schema value: `export { SchemaName }`

---

## Testing & Quality

### Available Scripts (Client)

```bash
npm run dev          # Start dev server
npm run build        # Type-check and build
npm run type-check   # Run TypeScript compiler
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm test            # Run Jest tests
npm run knip        # Find unused exports
```

### Before Committing

- Run `npm run type-check` - No TypeScript errors
- Run `npm run lint` - No linting errors
- Test your changes in browser
- Remove unused imports and code

---

## Key Files Reference

### Configuration

- `client/tsconfig.json` - TypeScript configuration
- `client/vite.config.mts` - Vite build configuration
- `client/eslint.config.*.mjs` - ESLint rules (multiple files)
- `.github/instructions/*.md` - Coding standards

### Entry Points

- `client/src/main.tsx` - React app entry
- `client/src/app/App.tsx` - Root component
- `server1/src/server.ts` - Express server entry

### Core Providers

- `client/src/providers/AppProvider.tsx` - Error boundary, Query client, Redux
- `client/src/providers/RouterProvider.tsx` - React Router configuration
- `client/src/providers/ReduxProvider.tsx` - Redux store provider

---

## Notes

- **Icon components** use shared `IconProps` from `components/icons/types.ts`
- **StrictMode** is only in `main.tsx` - don't wrap again
- **Suspense boundaries** in `App.tsx` handle lazy loading
- **Type exports** use `export type *` pattern for consistency
- **Form hooks** (`useForm`, `useFormArray`) provide form state management

---

## Getting Help

1. Check existing components in `components/` for patterns
2. Review similar features in `features/` for architecture examples
3. Consult type definitions in `types/` for data structures
4. Read coding standards in `.github/instructions/`
5. Search codebase for similar implementations before creating new patterns

---

_Last Updated: December 24, 2025_

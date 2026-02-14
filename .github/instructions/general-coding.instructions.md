---
applyTo: "**"
---

# Project General Coding Standards

## Project Stack Guardrails

- Do **not** suggest or introduce **Zod**, **Axios**, or **Font Awesome** unless explicitly requested by the user.
- Prefer existing repository patterns and dependencies for validation, HTTP requests, and icons.
- If examples are needed, demonstrate solutions using current in-repo utilities/components instead of new libraries.

## React 19.24 Standards

- Target **React 19.24** capabilities for client-side patterns and recommendations.
- Prefer modern React architecture: functional components, hook composition, and focused feature boundaries.
- Use React 19 APIs where they improve UX/clarity (`useActionState`, `useOptimistic`, `startTransition`/`useTransition`, `useDeferredValue`).
- Experimental React features are allowed when supported by current tooling and when they provide clear value.

## Naming Conventions

- Use **PascalCase** for component names, classes, interfaces, type aliases, and enums
- Use **camelCase** for variables, functions, methods, and properties
- Use **kebab-case** for file names and URL paths (e.g., `user-profile.ts`, `/api/user-profile`)
- Prefix private class members with underscore (`_privateMethod`)
- Use **ALL_CAPS** for constants and environment variables (`MAX_RETRY_COUNT`, `API_BASE_URL`)
- Use descriptive names that convey intent (avoid abbreviations except common ones like `id`, `url`, `api`)

## Modern JavaScript/TypeScript Features (ES2023+)

- **TC39 Stage 2+ Proposals**: This project allows and recommends using TC39 proposals that have reached Stage 2 or higher
  - `Promise.try()` - Recommended for error handling in async operations
  - `Object.groupBy()` / `Map.groupBy()` - Recommended for array grouping operations
  - Set methods (`.union()`, `.intersection()`, `.difference()`, `.symmetricDifference()`)
  - Array methods (`.fromAsync()`, `.toSorted()`, `.toReversed()`, `.findLast()`, `.findLastIndex()`)
  - Iterator helpers (`.map()`, `.filter()`, `.take()`, `.drop()`, `.flatMap()`)
- Use **const** by default, **let** when reassignment is needed, avoid **var**
- Use **async/await** for asynchronous operations instead of raw promises
- Prefer **arrow functions** for callbacks and anonymous functions
- Use **template literals** for string interpolation instead of concatenation
- Use **destructuring** for objects and arrays to improve readability
- Use **spread operator** (`...`) for array/object copying and merging
- Use **optional chaining** (`?.`) to safely access nested properties
- Use **nullish coalescing** (`??`) instead of logical OR (`||`) for default values
- Use **array methods** (`.map()`, `.filter()`, `.reduce()`) instead of loops when appropriate

## Code Style and Structure

- **Max function length**: 50 lines (consider refactoring if longer)
- **Max cyclomatic complexity**: 4 (aim for simple, linear logic)
- **Single Responsibility Principle**: Each function should do one thing well
- **Prefer pure functions**: Functions without side effects when possible
- **Avoid magic numbers**: Use named constants for numeric literals
- **Avoid nested ternaries**: Use if/else or extract to functions for clarity
- **Minimize nesting**: Prefer early returns over deep nesting

## Error Handling

- Use **try/catch** blocks for all async operations
- Implement **error boundaries** in React components for graceful degradation
- Always **log errors with context** (user action, input values, stack trace)
- Use `Promise.try()` for consistent error handling in promise chains
- Return meaningful error messages to users (avoid exposing technical details)
- Use custom error classes for different error types when appropriate
- Validate input data early (fail fast principle)

## Type Safety (TypeScript)

- Enable **strict mode** in tsconfig.json
- Avoid using **any** type (use **unknown** with type guards if needed)
- Provide explicit **return types** for all functions
- Use **interfaces** for object shapes, **type aliases** for unions/intersections
- Use **generics** for reusable, type-safe code
- Use **readonly** for immutable data structures
- Use **const assertions** (`as const`) for literal types
- Leverage **discriminated unions** for state management and variants

## Comments and Documentation

- Write **self-documenting code** (clear names reduce need for comments)
- Use **JSDoc comments** for public APIs and complex functions
- Explain **why**, not **what** (the code shows what, comments explain reasoning)
- Keep comments **up to date** with code changes
- Use `TODO:`, `FIXME:`, `NOTE:` prefixes for specific comment types
- Document **edge cases** and **business logic** assumptions

## Import/Export Organization

- **Group imports** in this order:
  1. External libraries (React, third-party packages)
  2. Internal aliases (`@/components`, `@/lib`)
  3. Relative imports (`./../`)
- Use **named exports** for most cases (better for tree-shaking)
- Use **default exports** sparingly (only for main module export)
- Use **barrel files** (`index.ts`) to simplify imports from directories
- Keep imports sorted alphabetically within groups (use ESLint plugin)

## Performance Best Practices

- **Lazy load** routes and large components with React.lazy()
- **Memoize** expensive calculations with useMemo
- **Memoize** callbacks passed to child components with useCallback
- **Virtualize** large lists with libraries like react-window
- Avoid **premature optimization** (measure before optimizing)
- Use **code splitting** to reduce initial bundle size
- Optimize images (WebP format, lazy loading, responsive sizes)

## Security Best Practices

- **Never commit secrets** (API keys, passwords, tokens) to version control
- Use **environment variables** for sensitive configuration
- **Sanitize user input** before using in HTML/SQL/commands
- Use **HTTPS** for all API calls
- Implement **CSRF protection** for state-changing operations
- Use **Content Security Policy** headers
- Keep **dependencies updated** (run `npm audit` regularly)

## Testing Standards

- Write tests for **critical business logic**
- Aim for **80%+ test coverage**
- Use **descriptive test names** that explain the scenario
- Follow **Arrange-Act-Assert** pattern in tests
- Use **React Testing Library** for component tests (test behavior, not implementation)
- Mock external dependencies in unit tests
- Use **test data builders** for complex test objects

## Git Commit Standards

- Use **conventional commits** format: `type(scope): message`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
  - Example: `feat(auth): add social login support`
- Keep commits **atomic** (one logical change per commit)
- Write clear, descriptive commit messages (explain what and why)
- Reference issue numbers when applicable (`#123`)

## Code Review Guidelines

- Check for **code smells** (duplicated code, long methods, excessive complexity)
- Verify **type safety** (no any types, proper error handling)
- Ensure **accessibility** (ARIA labels, keyboard navigation)
- Check **performance implications** (unnecessary re-renders, large bundles)
- Validate **security** (input sanitization, no hardcoded secrets)
- Confirm **test coverage** for new features
- Ensure code follows **project conventions** consistently

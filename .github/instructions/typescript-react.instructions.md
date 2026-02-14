---
applyTo: "**/*.ts,**/*.tsx"
---

# Project coding standards for TypeScript and React

Apply the [general coding guidelines](./general-coding.instructions.md) to all code.

## Library Guardrails

- Do **not** suggest or introduce **Zod**, **Axios**, or **Font Awesome** unless explicitly requested by the user.
- Use existing project validation patterns, the fetch-based API client, and existing icon components.

## TypeScript Guidelines

- Use TypeScript for all new code
- Follow functional programming principles where possible
- Use types for data structures and type definitions
- Prefer immutable data (const, readonly)
- Use optional chaining (?.) and nullish coalescing (??) operators

## React Guidelines

- Target **React 19.24** as the default version for implementation guidance
- Use functional components with hooks
- Follow the React hooks rules (no conditional hooks)
- Use React.FC type for components with children
- Keep components small and focused
- Prefer modern React patterns: feature-level `Suspense`, composable custom hooks, and explicit state ownership
- Prefer React 19 APIs when beneficial: `useActionState`, `useOptimistic`, `startTransition`/`useTransition`, `useDeferredValue`
- Experimental features (including `use()`) are acceptable when supported by project tooling and when they improve readability or user experience

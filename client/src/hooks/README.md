# Hooks Directory

This directory contains custom React hooks organized by functionality.

## Structure

```
hooks/
├── index.ts                    # Central exports for all hooks
├── axios/                      # HTTP request hooks
│   └── useAxios.ts            # Axios-based HTTP operations
├── examples/                   # Example/reference hooks
│   ├── usePageVisibility.ts   # Document visibility detection
│   ├── useScroll.ts           # Scroll position management
│   ├── useTheme.ts            # Theme switching (dark/light)
│   └── useViewport.ts         # Responsive breakpoint detection
├── useAsyncOperation.ts       # Generic async operation handler
├── useDependencyDebugger.ts   # Development debugging utility
├── useForm.ts                 # Single-object form management
├── useFormArray.ts            # Array-based form management
├── useGetId.ts                # Stable ID generation
└── useMenuAdd.ts              # Menu addition feature hook
```

## Core Hooks

### Form Management

#### `useForm<T>`

Manages single-object form state with validation and error handling.

**Use when:** Working with a single form object (e.g., user profile, settings)

**Features:**

- Type-safe field access
- Zod schema validation
- Error state management
- Dirty/saved tracking
- Helper methods for common operations

**Example:**

```typescript
const { formValues, setFieldValue, handleChange, isFormValid } = useForm({
  name: '',
  email: '',
  age: 0,
});
```

#### `useFormArray<T>`

Manages array-based form state where each item has a unique `lineId`.

**Use when:** Managing multiple form items in a list (e.g., todo items, table rows)

**Features:**

- Index-based item management
- Type-safe field updates
- Bulk operations
- Item addition/removal

**Example:**

```typescript
const { formValues, setFieldValue, getItem, setItem } = useFormArray<TodoItem>();
```

### Async Operations

#### `useAsyncOperation<TError>`

Generic wrapper for async operations with loading and error state management.

**Use when:** Any async operation that needs loading/error tracking

**Features:**

- Automatic loading state
- Error capture and handling
- Success/error callbacks
- Error clearing

**Example:**

```typescript
const { execute, isLoading, error } = useAsyncOperation();

await execute(
  async () => {
    await saveData(formData);
  },
  {
    onSuccess: () => toast.success('Saved!'),
    onError: (err) => toast.error(err.message),
  },
);
```

#### `useAxios<T>`

HTTP request hook built on `useAsyncOperation`.

**Use when:** Making PATCH or PUT requests

**Features:**

- Built-in error handling
- Loading state tracking
- Type-safe response data
- Automatic JSON serialization

**Example:**

```typescript
const { patchData, isLoading, error } = useAxios<User>();
const result = await patchData('/api/users/1', updatedUser);
```

### Utility Hooks

#### `useGetId`

Generates stable component IDs, using provided ID or React's `useId`.

**Use when:** Components need stable IDs for accessibility

**Example:**

```typescript
const id = useGetId(props.id); // Uses props.id if provided, generates otherwise
```

#### `useDependencyDebugger`

Development-only hook for debugging dependency changes.

**Use when:** Troubleshooting unnecessary re-renders

**Example:**

```typescript
useDependencyDebugger({ user, settings, isLoading });
// Logs which dependencies changed between renders
```

## Example Hooks

The `examples/` directory contains reference implementations:

- **usePageVisibility**: Track document visibility (tab switching)
- **useScroll**: Manage scroll position and bottom detection
- **useTheme**: Dark/light theme management with localStorage
- **useViewport**: Responsive breakpoint detection (mobile/tablet/desktop)

These are kept separate as learning examples and may not be actively used.

## Best Practices

### Hook Selection

1. **Single form?** → Use `useForm`
2. **List of items?** → Use `useFormArray`
3. **Async operation?** → Use `useAsyncOperation`
4. **HTTP request?** → Use `useAxios`
5. **Need stable ID?** → Use `useGetId`

### Composition

Hooks can be composed together:

```typescript
// Combining form + async operations
const MyComponent = () => {
  const { formValues, setFieldValue } = useForm(initialValues);
  const { execute, isLoading } = useAsyncOperation();

  const handleSubmit = async () => {
    await execute(async () => {
      await api.save(formValues);
    });
  };
};
```

### Feature-Specific Hooks

When a hook becomes feature-specific (like `useMenuAdd`), consider:

1. Moving it closer to the feature (`features/menu/useMenuAdd.ts`)
2. Or keeping it here if reused across features

## Adding New Hooks

1. Create hook file: `useMyHook.ts`
2. Add JSDoc documentation
3. Export from `index.ts`
4. Update this README
5. Add unit tests if complex logic

## Migration Notes

**Consolidated in this refactor:**

- Created central `index.ts` for all exports
- Organized examples into `examples/` subdirectory
- Added comprehensive documentation
- Maintained backward compatibility with existing imports

**No breaking changes** - all existing imports continue to work.

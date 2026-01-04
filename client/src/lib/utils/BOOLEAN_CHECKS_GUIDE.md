# Boolean Checks Helper Guide

## Overview

The `boolean-checks` module provides utility functions for explicit boolean checks that comply with
the `@typescript-eslint/strict-boolean-expressions` ESLint rule.

## Why Use These Helpers?

TypeScript's `strict-boolean-expressions` rule prevents common bugs by requiring explicit checks:

### ❌ Problems with Implicit Truthy Checks

```typescript
// Bug: fails when count = 0
if (count) {
  console.log('Has items');
}

// Bug: fails when name = ""
if (name) {
  console.log('Has name');
}
```

### ✅ Solution: Explicit Checks

```typescript
// Clear intent: checking if non-zero
if (isNonZero(count)) {
  console.log('Has items');
}

// Clear intent: checking if non-empty
if (isNonEmptyString(name)) {
  console.log('Has name');
}
```

## Available Functions

### `isNonEmptyString(value)`

Checks if a string is non-empty (not `""`, `null`, or `undefined`).

```typescript
// ❌ Before
if (searchQuery) {
  performSearch(searchQuery);
}

// ✅ After
if (isNonEmptyString(searchQuery)) {
  performSearch(searchQuery);
}
```

**Type Guard:** Narrows type to `string`

### `isNonZero(value)`

Checks if a number is not zero (and not `null` or `undefined`).

```typescript
// ❌ Before
if (count) {
  // Bug: fails when count = 0
  displayCount(count);
}

// ✅ After
if (isNonZero(count)) {
  displayCount(count);
}
```

**Type Guard:** Narrows type to `number`

### `isPositive(value)`

Checks if a number is greater than zero.

```typescript
// More semantic for quantities
if (isPositive(items.length)) {
  renderItems(items);
}

// More semantic for scores/ratings
if (isPositive(rating)) {
  showRating(rating);
}
```

**Type Guard:** Narrows type to `number`

### `isDefined(value)`

Checks if a value is not `null` or `undefined`.

```typescript
// ❌ Before (less explicit)
if (user) {
  console.log(user.name);
}

// ✅ After (more explicit)
if (isDefined(user)) {
  console.log(user.name);
}
```

**Note:** With `allowNullableObject: true`, this may not be required for objects, but provides
clarity.

**Type Guard:** Narrows type to exclude `null` and `undefined`

### `hasItems(value)`

Checks if an array is non-empty.

```typescript
// ❌ Before
if (results && results.length > 0) {
  renderResults(results);
}

// ✅ After
if (hasItems(results)) {
  renderResults(results);
}
```

**Type Guard:** Narrows type to non-nullable array

### `isEmpty(value)`

Checks if a string or array is empty (or `null`/`undefined`).

```typescript
// Useful for early returns
if (isEmpty(searchQuery)) {
  return defaultResults;
}

if (isEmpty(errors)) {
  submitForm();
}
```

## Usage Patterns

### Form Validation

```typescript
const validateForm = (data: FormData) => {
  const errors: string[] = [];

  if (!isNonEmptyString(data.email)) {
    errors.push('Email is required');
  }

  if (!isNonEmptyString(data.password)) {
    errors.push('Password is required');
  }

  return hasItems(errors) ? { valid: false, errors } : { valid: true };
};
```

### Conditional Rendering

```typescript
const UserProfile = ({ user }: { user: User | null }) => {
  if (!isDefined(user)) {
    return <LoginPrompt />;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      {isNonEmptyString(user.bio) && <p>{user.bio}</p>}
      {isPositive(user.followers) && <FollowerCount count={user.followers} />}
    </div>
  );
};
```

### API Response Handling

```typescript
const processResults = (data: ApiResponse) => {
  if (!hasItems(data.items)) {
    return <EmptyState />;
  }

  return data.items.map(item => <Item key={item.id} data={item} />);
};
```

### Filter Operations

```typescript
const filteredImages = useMemo(() => {
  if (!data?.items) return data;

  let filtered = data.items;

  if (isNonEmptyString(folder)) {
    filtered = filtered.filter((img) => img.folder === folder);
  }

  if (isNonEmptyString(tag)) {
    filtered = filtered.filter((img) => img.tags?.includes(tag));
  }

  return { ...data, items: filtered };
}, [data, folder, tag]);
```

## Migration Guide

### Step 1: Import the Helper

```typescript
import { isNonEmptyString, isPositive, hasItems } from '@lib/utils/boolean-checks';
```

### Step 2: Replace Implicit Checks

**Strings:**

```typescript
// Before: if (value)
// After:  if (isNonEmptyString(value))
```

**Numbers:**

```typescript
// Before: if (count)
// After:  if (isNonZero(count)) or if (isPositive(count))
```

**Arrays:**

```typescript
// Before: if (arr && arr.length > 0)
// After:  if (hasItems(arr))
```

## ESLint Configuration

These helpers are designed to work with:

```javascript
'@typescript-eslint/strict-boolean-expressions': ['error', {
  allowNullableObject: true,    // if (obj) is allowed
  allowNumber: false,            // if (num) is NOT allowed
  allowString: false,            // if (str) is NOT allowed
}]
```

## Testing

All helpers include comprehensive test coverage. See
[boolean-checks.test.ts](./boolean-checks.test.ts).

## Benefits

1. **Prevents Bugs:** Explicit checks prevent `0`, `""`, and `false` from being treated as falsy
   when they shouldn't be
2. **Better Intent:** Code clearly communicates what condition is being checked
3. **Type Safety:** Type guards provide automatic type narrowing
4. **Consistent:** Standardized patterns across the codebase
5. **ESLint Compliant:** Satisfies strict-boolean-expressions rule
6. **Readable:** Semantic function names improve code readability

## Best Practices

1. **Choose the right helper:**
   - Use `isNonEmptyString` for strings
   - Use `isPositive` for counts/quantities (more semantic than `isNonZero`)
   - Use `hasItems` for arrays (more semantic than checking length)
   - Use `isDefined` when you need explicit null checks

2. **Combine with optional chaining:**

   ```typescript
   if (isNonEmptyString(user?.email)) {
     sendEmail(user.email);
   }
   ```

3. **Use in early returns:**

   ```typescript
   if (!hasItems(data)) {
     return <EmptyState />;
   }
   ```

4. **Prefer positive checks:**

   ```typescript
   // ✅ Good
   if (hasItems(results)) {
     return results;
   }

   // ⚠️ Less clear
   if (!isEmpty(results)) {
     return results;
   }
   ```

# Valibot Form Validation Guide

This project uses [Valibot](https://valibot.dev/) for type-safe form validation with minimal bundle
size.

## Overview

The validation system consists of:

1. **`useValibotValidation` hook** - Core validation logic and error management
2. **Common schemas** - Reusable validation schemas for standard field types
3. **Integration with Input components** - Automatic error display via `FieldWrapper`

## Quick Start

### 1. Define Your Schema

```typescript
import * as v from 'valibot';
import { requiredString, requiredEmail, optionalString } from '@lib/validation/schemas';

const userSchema = v.object({
  name: requiredString('Name is required'),
  email: requiredEmail(),
  bio: optionalString,
});

type UserFormData = v.InferOutput<typeof userSchema>;
```

### 2. Use the Validation Hook

```typescript
import useValibotValidation from '@hooks/useValibotValidation';

const MyForm = () => {
  const { errors, validate, validateField } = useValibotValidation(userSchema);
  const [name, setName] = useState('');

  const handleSubmit = () => {
    const formData: UserFormData = { name, email, bio };

    if (!validate(formData)) {
      return; // Validation failed, errors are set
    }

    // Continue with submission
  };

  return (
    <Input.Text
      errors={errors.name}
      onBlur={() => validateField('name', name, requiredString())}
      onChange={(e) => setName(e.target.value)}
      value={name}
    />
  );
};
```

## Common Validation Schemas

All schemas are exported from `@lib/validation/schemas`:

### Text Fields

```typescript
requiredString('Custom message'); // Required text
optionalString; // Optional text
minLengthString(5); // Min 5 characters
maxLengthString(100); // Max 100 characters
lengthRangeString(5, 100); // Between 5-100 chars
```

### Email

```typescript
requiredEmail(); // Required valid email
optionalEmail(); // Optional valid email
```

### URL

```typescript
requiredUrl(); // Required valid URL
optionalUrl(); // Optional valid URL
```

### Numbers

```typescript
requiredNumber(); // Required number
optionalNumber; // Optional number
minNumber(0); // Min value 0
maxNumber(100); // Max value 100
rangeNumber(0, 100); // Between 0-100
positiveNumber(); // Must be >= 0
```

### Phone/Tel

```typescript
requiredTel(); // Required phone number
optionalTel(); // Optional phone number
```

### Date

```typescript
requiredDate(); // Required ISO date
optionalDate(); // Optional ISO date
```

### Boolean

```typescript
requiredBoolean; // Required checkbox
mustBeTrue('Accept terms'); // Must be checked
```

### Select/Dropdown

```typescript
requiredSelect(); // Required selection
optionalSelect; // Optional selection
```

### Arrays

```typescript
requiredArray(v.string(), 1); // At least 1 item
optionalArray(v.string()); // Optional array
```

## Hook API

### `useValibotValidation(schema)`

Returns an object with:

#### `errors: Record<keyof T, string>`

Current validation errors keyed by field name.

```typescript
if (errors.email) {
  // Show error: errors.email
}
```

#### `validate(data: T): boolean`

Validates entire form. Returns `true` if valid, `false` otherwise. Sets all errors.

```typescript
if (validate(formData)) {
  // Form is valid, submit
}
```

#### `validateField<K>(field: K, value: T[K], schema): boolean`

Validates a single field. Returns `true` if valid.

```typescript
validateField('email', emailValue, requiredEmail());
```

#### `setError(field: keyof T, message: string): void`

Manually set an error for a field.

```typescript
setError('email', 'This email is already taken');
```

#### `clearError(field: keyof T): void`

Clear error for a specific field.

```typescript
clearError('email');
```

#### `clearErrors(): void`

Clear all errors.

```typescript
clearErrors(); // Reset form
```

#### `hasErrors: boolean`

Quick check if any errors exist.

```typescript
<Button disabled={hasErrors}>Submit</Button>
```

## Input Component Integration

All Input compound components support validation via the `errors` prop:

```typescript
<Input.Text
  errors={errors.fieldName}  // Pass error string
  isRequired                 // Visual indicator
  label="Field Name"
  value={value}
  onChange={handleChange}
  onBlur={handleBlur}        // Validate on blur
/>
```

The `errors` prop is passed through to `FieldWrapper`, which displays the error message below the
input field.

## Validation Patterns

### Pattern 1: Validate on Blur

Validate individual fields when user leaves the field:

```typescript
<Input.Text
  onBlur={() => validateField('name', name, requiredString())}
  // ... other props
/>
```

### Pattern 2: Validate on Submit

Validate entire form on submission:

```typescript
const handleSubmit = () => {
  if (!validate(formData)) {
    return; // Errors displayed automatically
  }
  // Proceed with submission
};
```

### Pattern 3: Real-time Validation

Validate as user types (use sparingly):

```typescript
const handleChange = (value: string) => {
  setName(value);
  validateField('name', value, requiredString());
};
```

### Pattern 4: Conditional Validation

```typescript
const schema = v.object({
  country: requiredSelect(),
  state: v.optional(v.string()), // Only required if US
});

// In component:
if (country === 'US') {
  validateField('state', state, requiredString('State is required'));
}
```

## Advanced Usage

### Custom Validation

```typescript
import * as v from 'valibot';

const passwordSchema = v.pipe(
  v.string(),
  v.minLength(8, 'Password must be at least 8 characters'),
  v.regex(/[A-Z]/, 'Must contain an uppercase letter'),
  v.regex(/[0-9]/, 'Must contain a number'),
);
```

### Dependent Fields

```typescript
const schema = v.pipe(
  v.object({
    password: requiredString(),
    confirmPassword: requiredString(),
  }),
  v.forward(
    v.partialCheck(
      [['password'], ['confirmPassword']],
      (input) => input.password === input.confirmPassword,
      'Passwords must match',
    ),
    ['confirmPassword'],
  ),
);
```

### Async Validation

For async validation (e.g., checking if email exists), handle separately:

```typescript
const checkEmailAvailable = async (email: string) => {
  const response = await fetch(`/api/check-email?email=${email}`);
  const data = await response.json();

  if (!data.available) {
    setError('email', 'This email is already registered');
  }
};
```

## Best Practices

1. **Define schemas outside components** - Better performance and reusability
2. **Validate on blur, not onChange** - Better UX, less intrusive
3. **Always validate on submit** - Catch any missed validations
4. **Use type inference** - `v.InferOutput<typeof schema>` for type safety
5. **Compose schemas** - Build complex schemas from simple ones
6. **Clear errors on dialog close** - Reset validation state
7. **Disable submit when errors exist** - Use `hasErrors` prop
8. **Provide clear error messages** - User-friendly, actionable

## Example: Complete Form

See `TestItemEditDialog.validation-example.tsx` for a complete working example with:

- Multiple field types
- Per-field validation on blur
- Form-level validation on submit
- Error display
- Type safety

## Migration from Existing Code

To add validation to an existing form:

1. Define schema for your form data
2. Add `useValibotValidation` hook
3. Pass `errors.fieldName` to Input components
4. Add `validateField` to `onBlur` handlers
5. Add `validate(formData)` check in submit handler
6. Add `clearErrors()` to close/cancel handlers

## Performance Notes

- Valibot has minimal bundle size (~1-2KB per schema)
- Validation is synchronous and fast
- Only re-renders when errors change
- Field-level validation avoids full form re-validation

## Resources

- [Valibot Documentation](https://valibot.dev/)
- [Valibot API Reference](https://valibot.dev/api/)
- [Example Schemas](https://valibot.dev/guides/schemas/)

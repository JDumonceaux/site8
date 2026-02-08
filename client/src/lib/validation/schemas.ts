import * as v from 'valibot';

/**
 * Common validation schemas for form fields
 * These can be composed into larger schemas or used individually
 */

// ============================================================================
// Text Field Schemas
// ============================================================================

/**
 * Required string field
 */
export const requiredString = (message = 'This field is required') =>
  v.pipe(v.string(), v.minLength(1, message));

/**
 * Optional string field
 */
export const optionalString = v.optional(v.string());

/**
 * String with minimum length
 */
export const minLengthString = (min: number, message?: string) =>
  v.pipe(
    v.string(),
    v.minLength(min, message ?? `Must be at least ${min} characters`),
  );

/**
 * String with maximum length
 */
export const maxLengthString = (max: number, message?: string) =>
  v.pipe(
    v.string(),
    v.maxLength(max, message ?? `Must be at most ${max} characters`),
  );

/**
 * String with length range
 */
export const lengthRangeString = (min: number, max: number, message?: string) =>
  v.pipe(
    v.string(),
    v.minLength(min, message ?? `Must be ${min}-${max} characters`),
    v.maxLength(max, message ?? `Must be ${min}-${max} characters`),
  );

// ============================================================================
// Email Schema
// ============================================================================

/**
 * Required email field
 */
export const requiredEmail = (message = 'Please enter a valid email address') =>
  v.pipe(v.string(), v.minLength(1, 'Email is required'), v.email(message));

/**
 * Optional email field
 */
export const optionalEmail = (message = 'Please enter a valid email address') =>
  v.optional(v.pipe(v.string(), v.email(message)));

// ============================================================================
// URL Schema
// ============================================================================

/**
 * Required URL field
 */
export const requiredUrl = (message = 'Please enter a valid URL') =>
  v.pipe(v.string(), v.minLength(1, 'URL is required'), v.url(message));

/**
 * Optional URL field
 */
export const optionalUrl = (message = 'Please enter a valid URL') =>
  v.optional(v.pipe(v.string(), v.url(message)));

// ============================================================================
// Number Schemas
// ============================================================================

/**
 * Required number field
 */
export const requiredNumber = (message = 'Please enter a valid number') =>
  v.pipe(
    v.union([v.number(), v.pipe(v.string(), v.transform(Number))]),
    v.number(message),
  );

/**
 * Optional number field
 */
export const optionalNumber = v.optional(
  v.pipe(v.union([v.number(), v.pipe(v.string(), v.transform(Number))])),
);

/**
 * Number with minimum value
 */
export const minNumber = (min: number, message?: string) =>
  v.pipe(
    v.union([v.number(), v.pipe(v.string(), v.transform(Number))]),
    v.number(),
    v.minValue(min, message ?? `Must be at least ${min}`),
  );

/**
 * Number with maximum value
 */
export const maxNumber = (max: number, message?: string) =>
  v.pipe(
    v.union([v.number(), v.pipe(v.string(), v.transform(Number))]),
    v.number(),
    v.maxValue(max, message ?? `Must be at most ${max}`),
  );

/**
 * Number within range
 */
export const rangeNumber = (min: number, max: number, message?: string) =>
  v.pipe(
    v.union([v.number(), v.pipe(v.string(), v.transform(Number))]),
    v.number(),
    v.minValue(min, message ?? `Must be between ${min} and ${max}`),
    v.maxValue(max, message ?? `Must be between ${min} and ${max}`),
  );

/**
 * Positive number
 */
export const positiveNumber = (message = 'Must be a positive number') =>
  v.pipe(
    v.union([v.number(), v.pipe(v.string(), v.transform(Number))]),
    v.number(),
    v.minValue(0, message),
  );

// ============================================================================
// Telephone Schemas
// ============================================================================

/**
 * US phone number pattern
 */
// eslint-disable-next-line unicorn/better-regex
const US_PHONE_REGEX = /^[\s\d()+-]+$/;

/**
 * Required telephone field with basic validation
 */
export const requiredTel = (message = 'Please enter a valid phone number') =>
  v.pipe(
    v.string(),
    v.minLength(1, 'Phone number is required'),
    v.regex(US_PHONE_REGEX, message),
  );

/**
 * Optional telephone field
 */
export const optionalTel = (message = 'Please enter a valid phone number') =>
  v.optional(v.pipe(v.string(), v.regex(US_PHONE_REGEX, message)));

// ============================================================================
// Date Schemas
// ============================================================================

/**
 * Required date field
 */
export const requiredDate = (message = 'Please enter a valid date') =>
  v.pipe(v.string(), v.minLength(1, 'Date is required'), v.isoDate(message));

/**
 * Optional date field
 */
export const optionalDate = (message = 'Please enter a valid date') =>
  v.optional(v.pipe(v.string(), v.isoDate(message)));

// ============================================================================
// Boolean Schemas
// ============================================================================

/**
 * Required boolean (checkbox, toggle)
 */
export const requiredBoolean = v.boolean();

/**
 * Boolean that must be true (e.g., terms acceptance)
 */
export const mustBeTrue = (message = 'You must accept to continue') =>
  v.pipe(
    v.boolean(),
    v.custom((value) => value === true, message),
  );

// ============================================================================
// Select/Dropdown Schemas
// ============================================================================

/**
 * Required select field (non-empty string)
 */
export const requiredSelect = (message = 'Please select an option') =>
  v.pipe(v.string(), v.minLength(1, message));

/**
 * Optional select field
 */
export const optionalSelect = v.optional(v.string());

// ============================================================================
// Array Schemas
// ============================================================================

/**
 * Required array with minimum length
 */
export const requiredArray = <T>(
  itemSchema: v.BaseSchema<T, T, v.BaseIssue<unknown>>,
  minLength = 1,
  message = 'At least one item is required',
) => v.pipe(v.array(itemSchema), v.minLength(minLength, message));

/**
 * Optional array
 */
export const optionalArray = <T>(
  itemSchema: v.BaseSchema<T, T, v.BaseIssue<unknown>>,
) => v.optional(v.array(itemSchema));

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Create a conditional schema based on another field's value
 */
export const conditionalSchema = <T>(
  condition: boolean,
  schema: v.BaseSchema<T, T, v.BaseIssue<unknown>>,
  fallbackSchema: v.BaseSchema<T, T, v.BaseIssue<unknown>>,
) => (condition ? schema : fallbackSchema);

/**
 * Combine multiple validation messages
 */
export const composeMessage = (
  fieldName: string,
  validationType: string,
): string => `${fieldName} ${validationType}`;

import * as v from 'valibot';
import {
  optionalEmail,
  optionalNumber,
  optionalString,
  optionalTel,
  optionalUrl,
  requiredEmail,
  requiredNumber,
  requiredString,
  requiredTel,
  requiredUrl,
} from './schemas';

/**
 * Utility to get appropriate Valibot schema based on input type and attributes
 *
 * @param type - HTML input type (text, email, tel, number, etc.)
 * @param isRequired - Whether the field is required
 * @param customMessage - Optional custom error message
 * @returns Valibot schema for the field
 *
 * @example
 * ```ts
 * const schema = getSchemaForInputType('email', true);
 * // Returns: requiredEmail()
 * ```
 */
export const getSchemaForInputType = (
  type: string,
  isRequired = false,
  customMessage?: string,
): v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>> => {
  switch (type) {
    case 'email': {
      return isRequired ? requiredEmail(customMessage) : optionalEmail();
    }
    case 'number': {
      return isRequired ? requiredNumber(customMessage) : optionalNumber;
    }
    case 'tel': {
      return isRequired ? requiredTel(customMessage) : optionalTel();
    }
    case 'url': {
      return isRequired ? requiredUrl(customMessage) : optionalUrl();
    }
    default: {
      // 'text', 'password', 'search', and other text-like inputs
      return isRequired ? requiredString(customMessage) : optionalString;
    }
  }
};

/**
 * Validate a single value based on input type
 *
 * @param value - Value to validate
 * @param type - HTML input type
 * @param isRequired - Whether field is required
 * @returns Validation result with success status and optional error message
 *
 * @example
 * ```ts
 * const result = validateByType('test@example.com', 'email', true);
 * if (!result.success) {
 *   console.error(result.error);
 * }
 * ```
 */
export const validateByType = (
  value: unknown,
  type: string,
  isRequired = false,
): { error?: string; success: boolean } => {
  const schema = getSchemaForInputType(type, isRequired);
  const result = v.safeParse(schema, value);

  if (result.success) {
    return { success: true };
  }

  return {
    error: result.issues[0].message,
    success: false,
  };
};

/**
 * Create a schema for an object with multiple fields based on field definitions
 *
 * @param fields - Object mapping field names to their type and requirements
 * @returns Valibot object schema
 *
 * @example
 * ```ts
 * const schema = createSchemaFromFields({
 *   name: { type: 'text', isRequired: true },
 *   email: { type: 'email', isRequired: true },
 *   phone: { type: 'tel', isRequired: false },
 * });
 * ```
 */
export const createSchemaFromFields = (
  fields: Record<
    string,
    { customMessage?: string; isRequired?: boolean; type: string }
  >,
): v.ObjectSchema<
  Record<string, v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>,
  undefined
> => {
  const schemaShape: Record<
    string,
    v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>
  > = {};

  for (const [fieldName, fieldDefinition] of Object.entries(fields)) {
    schemaShape[fieldName] = getSchemaForInputType(
      fieldDefinition.type,
      fieldDefinition.isRequired ?? false,
      fieldDefinition.customMessage,
    );
  }

  return v.object(schemaShape);
};

/**
 * Format validation error for display
 *
 * @param error - Valibot issue or error message
 * @returns Formatted error message
 */
export const formatValidationError = (
  error: string | undefined | v.BaseIssue<unknown>,
): string | undefined => {
  if (!error) return undefined;
  if (typeof error === 'string') return error;
  return error.message;
};

/**
 * Check if a value is empty (for required field validation)
 *
 * @param value - Value to check
 * @returns True if value is considered empty
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Debounce validation to avoid excessive validation calls
 *
 * @param fn - Validation function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced validation function
 */
export const debounceValidation = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay = 300,
): ((...args: T) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: T) => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

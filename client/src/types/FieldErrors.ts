import type { FieldError } from './FieldError';

/**
 * Container for multiple field errors.
 * Typically used to collect all validation errors for a single form field.
 */
export type FieldErrors = {
  /** Array of validation errors for the field */
  errors?: FieldError[];
};

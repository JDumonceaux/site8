/**
 * Represents a validation error for a form field.
 * Used with Zod validation to provide detailed error information.
 */
export type FieldError = {
  /** Error code identifying the type of validation error */
  code?: string;
  /** Whether the validation must be exact */
  exact?: boolean;
  /** Whether the bound is inclusive (for range validations) */
  inclusive?: boolean;
  /** Maximum allowed value (for numeric/length validations) */
  maximum?: number;
  /** Human-readable error message */
  message?: string;
  /** Minimum required value (for numeric/length validations) */
  minimum?: number;
  /** Whether the field is required */
  required?: boolean;
  /** The type of validation that failed */
  type?: string;
};

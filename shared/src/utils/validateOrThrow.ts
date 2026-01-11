import {
  type BaseSchema,
  type BaseIssue,
  safeParse,
  safeParseAsync,
} from "valibot";

/**
 * Custom error class for validation failures
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly valibotIssues: BaseIssue<unknown>[]
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Validates data against a Valibot schema and throws a ValidationError if invalid
 * Eliminates duplication of safeParse + error handling pattern
 *
 * @param schema - Valibot schema to validate against
 * @param data - Data to validate
 * @param errorMessage - Custom error message (optional)
 * @returns Validated and typed data
 * @throws ValidationError if validation fails
 *
 * @example
 * ```ts
 * const user = validateOrThrow(userSchema, rawData, 'Invalid user data');
 * // user is now typed according to userSchema
 * ```
 */
export const validateOrThrow = <T>(
  schema: BaseSchema<unknown, T, BaseIssue<unknown>>,
  data: unknown,
  errorMessage?: string
): T => {
  const result = safeParse(schema, data);

  if (!result.success) {
    const message = errorMessage || "Validation failed";
    throw new ValidationError(message, result.issues);
  }

  return result.output;
};

/**
 * Async version of validateOrThrow for schemas with async validations
 *
 * @param schema - Valibot schema to validate against
 * @param data - Data to validate
 * @param errorMessage - Custom error message (optional)
 * @returns Promise of validated and typed data
 * @throws ValidationError if validation fails
 */
export const validateOrThrowAsync = async <T>(
  schema: BaseSchema<unknown, T, BaseIssue<unknown>>,
  data: unknown,
  errorMessage?: string
): Promise<T> => {
  const result = await safeParseAsync(schema, data);

  if (!result.success) {
    const message = errorMessage || "Validation failed";
    throw new ValidationError(message, result.issues);
  }

  return result.output;
};

/**
 * Returns a validated value or undefined if validation fails
 * Useful for optional validation without throwing
 *
 * @param schema - Valibot schema to validate against
 * @param data - Data to validate
 * @returns Validated data or undefined if validation fails
 */
export const validateOrUndefined = <T>(
  schema: BaseSchema<unknown, T, BaseIssue<unknown>>,
  data: unknown
): T | undefined => {
  const result = safeParse(schema, data);
  return result.success ? result.output : undefined;
};

/**
 * Returns a validated value or a default value if validation fails
 *
 * @param schema - Valibot schema to validate against
 * @param data - Data to validate
 * @param defaultValue - Default value to return if validation fails
 * @returns Validated data or default value
 */
export const validateOrDefault = <T>(
  schema: BaseSchema<unknown, T, BaseIssue<unknown>>,
  data: unknown,
  defaultValue: T
): T => {
  const result = safeParse(schema, data);
  return result.success ? result.output : defaultValue;
};

import { type ZodSchema, type ZodError } from "zod";

/**
 * Custom error class for validation failures
 */
export class ValidationError extends Error {
  constructor(message: string, public readonly zodError: ZodError) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Validates data against a Zod schema and throws a ValidationError if invalid
 * Eliminates duplication of safeParse + error handling pattern
 *
 * @param schema - Zod schema to validate against
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
  schema: ZodSchema<T>,
  data: unknown,
  errorMessage?: string
): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const message = errorMessage || "Validation failed";
    throw new ValidationError(message, result.error);
  }

  return result.data;
};

/**
 * Async version of validateOrThrow for schemas with async refinements
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @param errorMessage - Custom error message (optional)
 * @returns Promise of validated and typed data
 * @throws ValidationError if validation fails
 */
export const validateOrThrowAsync = async <T>(
  schema: ZodSchema<T>,
  data: unknown,
  errorMessage?: string
): Promise<T> => {
  const result = await schema.safeParseAsync(data);

  if (!result.success) {
    const message = errorMessage || "Validation failed";
    throw new ValidationError(message, result.error);
  }

  return result.data;
};

/**
 * Returns a validated value or undefined if validation fails
 * Useful for optional validation without throwing
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validated data or undefined if validation fails
 */
export const validateOrUndefined = <T>(
  schema: ZodSchema<T>,
  data: unknown
): T | undefined => {
  const result = schema.safeParse(data);
  return result.success ? result.data : undefined;
};

/**
 * Returns a validated value or a default value if validation fails
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @param defaultValue - Default value to return if validation fails
 * @returns Validated data or default value
 */
export const validateOrDefault = <T>(
  schema: ZodSchema<T>,
  data: unknown,
  defaultValue: T
): T => {
  const result = schema.safeParse(data);
  return result.success ? result.data : defaultValue;
};

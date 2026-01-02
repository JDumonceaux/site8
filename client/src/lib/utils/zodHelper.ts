import type { ZodError, ZodFormattedError, ZodType } from 'zod';

export type SafeParseProps<T> = {
  data: null | T;
  error: null | ZodError<T>;
  formattedError: null | ZodFormattedError<T>;
  success: boolean;
};

/**
 * Safely parses input data using the provided zod schema.
 *
 * @template T - The type inferred from the schema.
 * @param schema - The zod schema used for validation.
 * @param inputData - The input data to validate.
 * @returns An object containing the parsed data, any validation error, and a success flag.
 */
export const safeParse = <T>(
  schema: ZodType,
  inputData: unknown,
): SafeParseProps<T> => {
  const result = schema.safeParse(inputData);
  if (result.success) {
    return {
      data: result.data as T,
      error: null,
      formattedError: null,
      success: true,
    };
  }
  return {
    data: null,
    error: result.error as ZodError<T>,
    formattedError: result.error.format() as ZodFormattedError<T>,
    success: false,
  };
};

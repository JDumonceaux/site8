import { Schema, z } from 'zod';

type SafeParseProps<T> = {
  success: boolean;
  data: T | null;
  error: z.ZodError<T> | null;
  formattedError: z.ZodFormattedError<T> | null;
};

/**
 * Safely parses the input data using the provided schema.
 *
 * @template T - The type of the schema.
 * @param {Schema<T>} schema - The schema to use for parsing.
 * @param {Partial<T>} inputData - The input data to be parsed.
 * @returns {SafeParseProps<T>} - An object containing the parsing result.
 */
export const safeParse = <T>(
  schema: Schema<T>,
  inputData: Partial<T>,
): SafeParseProps<T> => {
  const parsedResult = schema.safeParse(inputData);
  const { success, data, error } = parsedResult;

  return {
    success,
    data: success ? data : null,
    error: success ? null : error,
    formattedError: success ? null : error?.format() || null,
  };
};

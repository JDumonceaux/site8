import type { Schema, z } from 'zod';

type SafeParseProps<T> = {
  data: null | T;
  error: null | z.ZodError<T>;
  formattedError: null | z.ZodFormattedError<T>;
  success: boolean;
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
  const { data, error, success } = parsedResult;

  return {
    data: success ? data : null,
    error: success ? null : error,
    formattedError: success ? null : error.format(),
    success,
  };
};

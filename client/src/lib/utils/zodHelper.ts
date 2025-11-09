import { z } from 'zod';

export type SafeParseProps<T> = {
  data: null | T;
  error: null | z.ZodError<T>;
  formattedError: null | z.core.$ZodFormattedError<T>;
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
  schema: z.ZodType<T>,
  inputData: unknown,
): SafeParseProps<T> => {
  const result = schema.safeParse(inputData);
  if (result.success) {
    return {
      data: result.data,
      error: null,
      formattedError: null,
      success: true,
    };
  }
  return {
    data: null,
    error: result.error,
    formattedError: z.treeifyError(
      result.error,
    ) as z.core.$ZodFormattedError<T>,
    success: false,
  };
};

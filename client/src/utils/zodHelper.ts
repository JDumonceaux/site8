import { z, Schema } from 'zod';

interface ParseResult<T> {
  success: boolean;
  data: T | null;
  error: z.ZodError<T> | null;
  errorFormatted: z.ZodFormattedError<T> | null;
}

export const safeParse = <T>(
  schema: Schema<T>,
  inputData: Partial<T>,
): ParseResult<T> => {
  const result: ParseResult<T> = {
    success: false,
    data: null,
    error: null,
    errorFormatted: null,
  };
  const parsedData = schema.safeParse(inputData);
  result.success = parsedData.success;

  if (parsedData.success === false) {
    result.error = parsedData.error;
    result.errorFormatted = parsedData.error.format();
  } else {
    result.data = parsedData.data;
  }

  return result;
};

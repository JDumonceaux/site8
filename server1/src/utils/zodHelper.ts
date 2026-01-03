import type { Schema, ZodError, ZodFormattedError } from 'zod';

export type ParseResult<T> = {
  readonly data: T | null;
  readonly error: ZodError<T> | null;
  readonly errorFormatted: ZodFormattedError<T> | null;
  readonly success: boolean;
};

export const safeParse = <T>(
  schema: Schema<T>,
  inputData: Partial<T>,
): ParseResult<T> => {
  const parsedData = schema.safeParse(inputData);

  if (!parsedData.success) {
    return {
      data: null,
      error: parsedData.error,
      errorFormatted: parsedData.error.format(),
      success: false,
    };
  }

  return {
    data: parsedData.data,
    error: null,
    errorFormatted: null,
    success: true,
  };
};

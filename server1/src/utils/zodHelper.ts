import type { z, Schema } from 'zod';

export type ParseResult<T> = {
  readonly success: boolean;
  readonly data: T | null;
  readonly error: z.ZodError<T> | null;
  readonly errorFormatted: z.ZodFormattedError<T> | null;
};

export const safeParse = <T>(
  schema: Schema<T>,
  inputData: Partial<T>,
): ParseResult<T> => {
  const parsedData = schema.safeParse(inputData);

  if (!parsedData.success) {
    return {
      success: false,
      data: null,
      error: parsedData.error,
      errorFormatted: parsedData.error.format(),
    };
  }

  return {
    success: true,
    data: parsedData.data,
    error: null,
    errorFormatted: null,
  };
};

import type { ZodError, ZodType } from 'zod';

export type ParseResult<T> = {
  readonly data: T | null;
  readonly error: ZodError<T> | null;
  readonly errorFormatted: string | null;
  readonly success: boolean;
};

export const safeParse = <T>(
  schema: ZodType<T>,
  inputData: Partial<T>,
): ParseResult<T> => {
  const parsedData = schema.safeParse(inputData);

  if (!parsedData.success) {
    return {
      data: null,
      error: parsedData.error,
      errorFormatted: JSON.stringify(parsedData.error.errors),
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

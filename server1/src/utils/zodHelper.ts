import type { BaseIssue, BaseSchema } from 'valibot';
import { safeParse as valibotSafeParse } from 'valibot';

export type ParseResult<T> = {
  readonly data: T | null;
  readonly error: BaseIssue<unknown>[] | null;
  readonly errorFormatted: string | null;
  readonly success: boolean;
};

export const safeParse = <T>(
  schema: BaseSchema<unknown, T, BaseIssue<unknown>>,
  inputData: Partial<T>,
): ParseResult<T> => {
  const parsedData = valibotSafeParse(schema, inputData);

  if (!parsedData.success) {
    return {
      data: null,
      error: parsedData.issues,
      errorFormatted: JSON.stringify(parsedData.issues),
      success: false,
    };
  }

  return {
    data: parsedData.output,
    error: null,
    errorFormatted: null,
    success: true,
  };
};

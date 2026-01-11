import type { BaseIssue, BaseSchema } from 'valibot';
import { flatten, safeParse as valibotSafeParse } from 'valibot';

export type SafeParseProps<T> = {
  data: null | T;
  error: BaseIssue<unknown>[] | null;
  formattedError: null | Record<string, string[]>;
  success: boolean;
};

/**
 * Safely parses input data using the provided valibot schema.
 *
 * @template T - The type inferred from the schema.
 * @param schema - The valibot schema used for validation.
 * @param inputData - The input data to validate.
 * @returns An object containing the parsed data, any validation error, and a success flag.
 */
export const safeParse = <T>(
  schema: BaseSchema<unknown, T, BaseIssue<unknown>>,
  inputData: unknown,
): SafeParseProps<T> => {
  const result = valibotSafeParse(schema, inputData);
  if (result.success) {
    return {
      data: result.output,
      error: null,
      formattedError: null,
      success: true,
    };
  }

  let formatted: Record<string, string[]> = {};
  if (result.issues.length > 0) {
    const flattened = flatten<BaseSchema<unknown, T, BaseIssue<unknown>>>(
      result.issues,
    );
    formatted = Object.entries(flattened.nested ?? {}).reduce<
      Record<string, string[]>
    >((accumulator, [key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        accumulator[key] = value;
      }
      return accumulator;
    }, {});
  }

  return {
    data: null,
    error: result.issues,
    formattedError: formatted,
    success: false,
  };
};

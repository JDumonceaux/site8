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
      if (value && Array.isArray(value)) {
        accumulator[key] = value as string[];
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

/**
 * Extracts error messages for a specific field from a Valibot issues array.
 *
 * @param errors - The array of `BaseIssue` from a failed `safeParse`, or null
 * @param fieldName - The field key to filter errors for
 * @returns null if no errors, a single string if one error, or an array of strings
 */
export const getFieldErrors = (
  errors: BaseIssue<unknown>[] | null,
  fieldName: string,
): null | string | string[] => {
  if (errors == null) return null;
  const messages = errors
    .filter((issue) => {
      const first = issue.path?.[0];
      return (
        typeof first === 'object' && 'key' in first && first.key === fieldName
      );
    })
    .map((issue) => issue.message);
  if (messages.length === 0) return null;
  return messages.length === 1 ? (messages[0] ?? null) : messages;
};

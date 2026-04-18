import { safeParse } from '@lib/utils/schemaHelper';
import type { BaseIssue, BaseSchema } from 'valibot';
import { flatten } from 'valibot';

export type SimpleFormState = {
  errors?: Record<string, string>;
  message?: string;
};

export const formatValidationErrors = (
  issues: BaseIssue<unknown>[],
): Record<string, string> => {
  if (issues.length === 0) return {};

  const flattened = flatten(
    issues as [BaseIssue<unknown>, ...BaseIssue<unknown>[]],
  );
  return Object.entries(flattened.nested ?? {}).reduce<Record<string, string>>(
    (accumulator, [key, value]) => {
      if (value && value.length > 0) {
        const [firstError] = value;
        accumulator[key] = firstError;
      }
      return accumulator;
    },
    {},
  );
};

export const createFormAction = <TInput, TOutput>(
  schema: BaseSchema<TInput, TOutput, BaseIssue<unknown>>,
  authFn: (data: TOutput) => Promise<void>,
  successMessage = 'Success',
) => {
  return async (
    _prevState: unknown,
    formData: FormData,
  ): Promise<SimpleFormState> => {
    const data = Object.fromEntries(formData.entries());

    const result = safeParse<TOutput>(schema, data);
    if (!result.success || !result.data) {
      return {
        errors: result.error ? formatValidationErrors(result.error) : {},
        message: 'Validation failed',
      };
    }

    try {
      await authFn(result.data);
      return {
        message: successMessage,
      };
    } catch (error) {
      return {
        message: error instanceof Error ? error.message : 'Operation failed',
      };
    }
  };
};

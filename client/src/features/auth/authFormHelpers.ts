import { safeParse } from '@lib/utils/zodHelper';
import type { z } from 'zod';

export type SimpleFormState = {
  errors?: Record<string, string>;
  message?: string;
};

export const formatValidationErrors = (
  error: z.ZodError,
): Record<string, string> => {
  return Object.fromEntries(
    error.issues.map((issue) => [issue.path[0], issue.message]),
  );
};

export const createFormAction = <T extends z.ZodType>(
  schema: T,
  authFn: (data: z.infer<T>) => Promise<void>,
  successMessage = 'Success',
) => {
  return async (
    _prevState: unknown,
    formData: FormData,
  ): Promise<SimpleFormState> => {
    const data = Object.fromEntries(formData.entries());

    const result = safeParse<z.infer<T>>(schema, data);
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

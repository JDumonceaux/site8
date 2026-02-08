import { useCallback, useState } from 'react';

import type { BaseIssue, BaseSchema, InferOutput } from 'valibot';
import { safeParse } from 'valibot';

type ValidationErrors<T> = Partial<Record<keyof T, string>>;

type UseValibotValidationReturn<T> = {
  clearError: (field: keyof T) => void;
  clearErrors: () => void;
  errors: ValidationErrors<T>;
  hasErrors: boolean;
  setError: (field: keyof T, message: string) => void;
  validate: (data: T) => boolean;
  validateField: <K extends keyof T>(
    field: K,
    value: T[K],
    fieldSchema: BaseSchema<T[K], T[K], BaseIssue<unknown>>,
  ) => boolean;
};

/**
 * Custom hook for Valibot schema validation with per-field error tracking
 *
 * @template TSchema - The Valibot schema type
 * @param schema - Valibot schema for validation
 * @returns Validation utilities and error state
 *
 * @example
 * ```tsx
 * const schema = v.object({
 *   name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
 *   email: v.pipe(v.string(), v.email('Invalid email')),
 * });
 *
 * const { errors, validate, validateField } = useValibotValidation(schema);
 * ```
 */
export const useValibotValidation = <
  TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
  schema: TSchema,
): UseValibotValidationReturn<InferOutput<TSchema>> => {
  type OutputType = InferOutput<TSchema>;
  const [errors, setErrors] = useState<ValidationErrors<OutputType>>({});

  /**
   * Validate entire form data against schema
   */
  const validate = useCallback(
    (data: OutputType): boolean => {
      const result = safeParse(schema, data);

      if (result.success) {
        setErrors({});
        return true;
      }

      // Convert Valibot issues to field-level errors
      const fieldErrors: ValidationErrors<OutputType> = {};
      for (const issue of result.issues) {
        const path = issue.path?.[0];
        if (path && typeof path.key === 'string') {
          const fieldName = path.key as keyof OutputType;
          // Take first error message for each field
          if (!fieldErrors[fieldName]) {
            fieldErrors[fieldName] = issue.message;
          }
        }
      }

      setErrors(fieldErrors);
      return false;
    },
    [schema],
  );

  /**
   * Validate a single field
   */
  const validateField = useCallback(
    <K extends keyof OutputType>(
      field: K,
      value: OutputType[K],
      fieldSchema: BaseSchema<OutputType[K], OutputType[K], BaseIssue<unknown>>,
    ): boolean => {
      const result = safeParse(fieldSchema, value);

      if (result.success) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete newErrors[field];
          return newErrors;
        });
        return true;
      }

      const errorMessage = result.issues[0].message;
      setErrors((prev) => ({
        ...prev,
        [field]: errorMessage,
      }));
      return false;
    },
    [],
  );

  /**
   * Manually set an error for a field
   */
  const setError = useCallback((field: keyof OutputType, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  }, []);

  /**
   * Clear error for a specific field
   */
  const clearError = useCallback((field: keyof OutputType) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  /**
   * Clear all errors
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    clearError,
    clearErrors,
    errors,
    hasErrors,
    setError,
    validate,
    validateField,
  };
};

export default useValibotValidation;

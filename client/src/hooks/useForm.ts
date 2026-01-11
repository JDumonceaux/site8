import { useState } from 'react';

import type { BaseIssue } from 'valibot';

type FormKeys<T> = keyof T;
type FieldValue = boolean | null | number | string;

/**
 * Return type for useForm hook
 */
export type UseFormReturn<T> = {
  /** Current errors from validation */
  errors: BaseIssue<unknown>[] | null;
  /** Current form values */
  formValues: T;
  /** Get default props for an input field (id, value, onChange) */
  getDefaultProps: (fieldName: FormKeys<T>) => {
    'data-id': FormKeys<T>;
    'data-line': number;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    value: string;
  };
  /** Get errors for a specific field */
  getFieldErrors: (fieldName: FormKeys<T>) => null | string | string[];
  /** Get field value as string */
  getFieldValue: (fieldName: FormKeys<T>) => string;
  /** Get field value as boolean */
  getFieldValueBoolean: (fieldName: FormKeys<T>) => boolean;
  /** Get field value as number */
  getFieldValueNumber: (fieldName: FormKeys<T>) => number;
  /** Handle input change events */
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  /** Clear all form values */
  handleClearAll: () => void;
  /** Clear a specific field */
  handleClearField: (fieldName: FormKeys<T>) => void;
  /** Reset form to initial values */
  handleReset: () => void;
  /** Check if a field has errors */
  hasError: (fieldName: FormKeys<T>) => boolean;
  /** Check if form is valid (no errors) */
  isFormValid: () => boolean;
  /** Whether form has been saved (not dirty) */
  isSaved: boolean;
  /** Set validation errors */
  setErrors: (errors: BaseIssue<unknown>[] | null) => void;
  /** Set a single field value */
  setFieldValue: (fieldName: FormKeys<T>, value: FieldValue) => void;
  /** Set entire form values */
  setFormValues: (values: T) => void;
  /** Set saved state */
  setIsSaved: (value: boolean) => void;
};

/**
 * Custom hook for managing single-object form state
 *
 * Provides comprehensive form management including:
 * - Type-safe field access
 * - Validation error handling
 * - Dirty state tracking
 * - Common form operations
 *
 * @template T - The form data type
 * @param initialValues - Initial form values
 * @returns Form state and handlers
 *
 * @example
 * ```typescript
 * const { formValues, setFieldValue, handleSubmit } = useForm({
 *   name: '',
 *   email: ''
 * });
 * ```
 */
const useForm = <T>(initialValues: T): UseFormReturn<T> => {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<BaseIssue<unknown>[] | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  const setFieldValue = (fieldName: FormKeys<T>, value: FieldValue) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const getFieldValue = (fieldName: FormKeys<T>): string => {
    const val = formValues[fieldName];
    return typeof val === 'string' ? val : '';
  };

  const getFieldValueBoolean = (fieldName: FormKeys<T>): boolean => {
    const val = formValues[fieldName];
    return typeof val === 'boolean' ? val : false;
  };

  const getFieldValueNumber = (fieldName: FormKeys<T>): number => {
    const val = formValues[fieldName];
    return typeof val === 'number' ? val : 0;
  };

  const getFieldErrors = (fieldName: FormKeys<T>): null | string | string[] => {
    if (errors == null) return null;
    const filteredErrors = errors.filter((issue) => {
      if (!issue.path || issue.path.length === 0) return false;
      const firstPath = issue.path[0];
      if (typeof firstPath === 'object' && 'key' in firstPath) {
        return firstPath.key === fieldName;
      }
      return false;
    });
    return filteredErrors.length > 0
      ? filteredErrors.map((issue) => issue.message)
      : null;
  };

  const getDefaultProps = (fieldName: FormKeys<T>) => ({
    'data-id': fieldName,
    'data-line': 0,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setFieldValue(fieldName, e.target.value);
    },
    value: getFieldValue(fieldName),
  });

  const hasError = (fieldName: FormKeys<T>): boolean =>
    getFieldErrors(fieldName) != null;

  const isFormValid = (): boolean => {
    return errors == null || errors.length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    if (id === '') {
      // Skip elements without id attribute
      return;
    }
    setFieldValue(id as FormKeys<T>, value);
  };

  const handleClearField = (fieldName: FormKeys<T>) => {
    setFieldValue(fieldName, '');
  };

  const handleClearAll = () => {
    setFormValues({} as T);
    setErrors(null);
  };

  const handleReset = () => {
    setFormValues(initialValues);
    setErrors(null);
  };

  return {
    errors,
    formValues,
    getDefaultProps,
    getFieldErrors,
    getFieldValue,
    getFieldValueBoolean,
    getFieldValueNumber,
    handleChange,
    handleClearAll,
    handleClearField,
    handleReset,
    hasError,
    isFormValid,
    isSaved,
    setErrors,
    setFieldValue,
    setFormValues,
    setIsSaved,
  };
};

export default useForm;

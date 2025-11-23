import type { FieldErrors } from './FieldErrors';

export type FormState<T> = {
  fieldData: T;
  fields?: Record<string, FieldErrors>;
  message?: string;
};

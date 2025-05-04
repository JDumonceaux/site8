import type { FieldErrors } from './FieldErrors';
import type { PageEdit } from './PageEditSchema';

export type FormState = {
  errors?: Record<string, FieldErrors>;
  fieldData: PageEdit;
  message?: string;
};

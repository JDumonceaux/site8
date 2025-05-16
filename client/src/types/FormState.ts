import type { FieldErrors } from './FieldErrors';
import type { PageEdit } from './PageEditSchema';

export type FormState = {
  fieldData: PageEdit;
  fields?: Record<string, FieldErrors>;
  message?: string;
};

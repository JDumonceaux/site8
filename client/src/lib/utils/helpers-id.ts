import { parseId } from '@site8/shared';

/**
 * Returns a string representation of a numeric id if valid, otherwise undefined.
 * @deprecated Use parseId from @site8/shared directly
 */
export const getParamIdAsString = (id?: string): string | undefined => {
  const result = parseId(id);
  return result.isValid ? result.id?.toString() : undefined;
};

// Re-export shared object utilities
export {
  cleanUpData,
  getDefaultObject,
  getNextId,
  getNextIdFromPos,
  removeEmptyAttributes,
  sortObjectKeys,
  trimAttributes,
} from '@site8/shared';
export type { IdType } from '@site8/shared';

/**
 * Recursively compares two objects for deep equality.
 */
export const isDeepEqual = (
  object1: Record<string, unknown>,
  object2: Record<string, unknown>,
): boolean => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    if (
      value1 !== null &&
      value2 !== null &&
      typeof value1 === 'object' &&
      typeof value2 === 'object'
    ) {
      if (
        !isDeepEqual(
          value1 as Record<string, unknown>,
          value2 as Record<string, unknown>,
        )
      ) {
        return false;
      }
    } else if (value1 !== value2) {
      return false;
    }
  }
  return true;
};

/**
 * Removes empty attributes from each object in an array.
 * Returns null if the input array is empty or not an array.
 */
export const removeEmptyAttributesArray = <T extends Record<string, unknown>>(
  array: T[],
): null | Partial<T>[] => {
  if (!Array.isArray(array) || array.length === 0) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return array.map((item) => removeEmptyAttributes(item));
};

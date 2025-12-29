/**
 * Checks if a value is a non-empty array
 * @param arr - Value to check
 * @returns true if arr is an array with at least one element
 */
export const isValidArray = (arr: Iterable<unknown> | undefined): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

/**
 * Removes an item from an array
 * @param arr - Source array
 * @param value - Value to remove
 * @returns New array without the specified value
 */
export const removeItem = <const T>(
  arr: readonly T[],
  value: T
): readonly T[] => {
  return arr.filter((item) => item !== value);
};

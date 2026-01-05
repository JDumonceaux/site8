/**
 * Boolean check utilities for strict-boolean-expressions ESLint rule compliance.
 * These helpers make code more explicit and prevent common truthy/falsy bugs.
 */

/**
 * Checks if a string is non-empty.
 * Use this instead of `if (str)` to satisfy strict-boolean-expressions.
 *
 * @param value - The string to check
 * @returns true if string is non-empty, false otherwise
 *
 * @example
 * ```ts
 * if (isNonEmptyString(name)) {
 *   console.log(name);
 * }
 * ```
 */
export const isNonEmptyString = (
  value: null | string | undefined,
): value is string => {
  return value !== null && value !== undefined && value !== '';
};

/**
 * Checks if a number is non-zero.
 * Use this instead of `if (num)` to satisfy strict-boolean-expressions.
 *
 * @param value - The number to check
 * @returns true if number is non-zero, false otherwise
 *
 * @example
 * ```ts
 * if (isNonZero(count)) {
 *   console.log(`Count: ${count}`);
 * }
 * ```
 */
export const isNonZero = (
  value: null | number | undefined,
): value is number => {
  return value !== null && value !== undefined && value !== 0;
};

/**
 * Checks if a number is positive (greater than zero).
 * More semantic than isNonZero for quantities and counts.
 *
 * @param value - The number to check
 * @returns true if number is positive, false otherwise
 *
 * @example
 * ```ts
 * if (isPositive(items.length)) {
 *   console.log('Has items');
 * }
 * ```
 */
export const isPositive = (
  value: null | number | undefined,
): value is number => {
  return value !== null && value !== undefined && value > 0;
};

/**
 * Checks if a value is defined (not null or undefined).
 * Use this for nullable objects when you want explicit checks.
 *
 * @param value - The value to check
 * @returns true if value is not null or undefined
 *
 * @example
 * ```ts
 * if (isDefined(user)) {
 *   console.log(user.name);
 * }
 * ```
 */
export const isDefined = <T>(value: null | T | undefined): value is T => {
  return value !== null && value !== undefined;
};

/**
 * Checks if an array is non-empty.
 * More semantic than checking length > 0.
 *
 * @param value - The array to check
 * @returns true if array exists and has items, false otherwise
 *
 * @example
 * ```ts
 * if (hasItems(results)) {
 *   results.map(item => ...);
 * }
 * ```
 */
export const hasItems = <T>(value: null | T[] | undefined): value is T[] => {
  return value !== null && value !== undefined && value.length > 0;
};

/**
 * Checks if a string or array is empty.
 * More semantic than checking length === 0.
 *
 * @param value - The string or array to check
 * @returns true if value is empty or undefined/null
 *
 * @example
 * ```ts
 * if (isEmpty(searchQuery)) {
 *   return defaultResults;
 * }
 * ```
 */
export const isEmpty = (
  value: null | string | undefined | unknown[],
): boolean => {
  return value === null || value === undefined || value.length === 0;
};

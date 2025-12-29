/**
 * Result of ID parsing validation
 */
export type ParseIdResult = {
  readonly isValid: boolean;
  readonly id: number | undefined;
};

/**
 * Parses and validates a string ID value
 * @param value - String value to parse as ID
 * @returns ParseIdResult with validation status and parsed ID if valid
 */
export const parseId = (value: string | undefined): ParseIdResult => {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return { isValid: false, id: undefined };
  }

  const id = Number(trimmedValue);
  const isValid = !Number.isNaN(id) && id > 0 && Number.isInteger(id);

  return { isValid, id: isValid ? id : undefined };
};

/**
 * Checks if a value is a non-empty array
 * @param arr - Value to check
 * @returns true if arr is an array with at least one element
 */
export const isValidArray = (arr: Iterable<unknown> | undefined): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

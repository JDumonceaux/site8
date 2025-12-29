/**
 * Creates a default object with zero/empty values for each property type
 * @param obj - Object to create default values for
 * @returns Object with default values based on property types
 */
export const getDefaultObject = (
  obj: Record<string, unknown>
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (typeof value === "string") {
        result[key] = "";
      } else if (typeof value === "number") {
        result[key] = 0;
      } else if (typeof value === "boolean") {
        result[key] = false;
      } else if (Array.isArray(value)) {
        result[key] = [];
      } else if (typeof value === "object") {
        result[key] = {};
      } else {
        result[key] = null;
      }
    }
  }

  return result;
};

/**
 * Removes null, undefined, empty strings, and empty arrays from an object
 * @param obj - Object to filter
 * @returns New object with empty attributes removed
 */
export const removeEmptyAttributes = <const T extends Record<string, unknown>>(
  obj: T
): Partial<T> => {
  const filtered = Object.entries(obj)
    .filter(([_, value]) => value != null)
    .filter(([_, value]) => {
      if (typeof value === "string") return value.trim() !== "";
      if (Array.isArray(value)) return value.length > 0;
      return true;
    });

  return Object.fromEntries(filtered) as Partial<T>;
};

/**
 * Trims all string values in an object
 * @param obj - Object to trim
 * @returns New object with trimmed string values
 */
export const trimAttributes = <T extends Record<string, unknown>>(
  obj: T
): T => {
  const entries = Object.entries(obj).map(([key, value]) => [
    key,
    typeof value === "string" ? value.trim() : value,
  ]);

  return Object.fromEntries(entries) as T;
};

/**
 * Sorts object keys alphabetically
 * @param obj - Object to sort
 * @returns New object with keys in alphabetical order
 */
export const sortObjectKeys = <T extends Record<string, unknown>>(
  obj: T
): T => {
  const sortedKeys = Object.keys(obj).toSorted();
  const entries = sortedKeys.map((key) => [key, obj[key]]);

  return Object.fromEntries(entries) as T;
};

/**
 * Type for objects with an id property
 */
export type IdType = {
  readonly id: number;
};

/**
 * Cleans up an object by removing empty attributes, sorting keys, and trimming strings.
 * If the object has an id property, it will be moved to the first position.
 * @param data - Object to clean up
 * @returns Cleaned object
 */
export const cleanUpData = <T extends Record<string, unknown>>(data: T): T => {
  const cleaned = removeEmptyAttributes(data) as T;
  const sorted = sortObjectKeys(cleaned);
  const trimmed = trimAttributes(sorted);

  if ("id" in trimmed && typeof trimmed["id"] === "number") {
    const { id, ...rest } = trimmed;
    return { id, ...rest } as unknown as T;
  }

  return trimmed;
};

/**
 * Finds the next available ID in a collection by checking for gaps
 * @param items - Array of items with id property
 * @returns Next available ID or undefined if items is empty
 */
export const getNextId = (
  items: readonly IdType[] | undefined
): number | undefined => {
  if (!items?.length) {
    return undefined;
  }

  const sorted = items.toSorted((a, b) => a.id - b.id);
  const firstId = sorted[0]?.id;

  if (firstId === undefined) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/prefer-for-of -- Need index iteration for ID finding
  for (let i = 0; i < sorted.length; i++) {
    const nextId = firstId + i;
    if (!sorted.find((x) => x.id === nextId)) {
      return nextId;
    }
  }

  return firstId + sorted.length;
};

/**
 * Finds the next available ID starting from a specific position
 * @param items - Array of items with id property
 * @param start - Starting position to search from
 * @returns Object with index and value of next available ID, or undefined if items is empty
 */
export const getNextIdFromPos = (
  items: readonly IdType[] | undefined,
  start: number
): { readonly index: number; readonly value: number } | undefined => {
  if (!items?.length) {
    return undefined;
  }

  const sorted = items.toSorted((a, b) => a.id - b.id);
  const startId = (sorted.length > start ? sorted[start]?.id : 1) ?? 1;

  for (let i = start; i < sorted.length; i++) {
    const nextId = startId + (i - start);
    if (!sorted.find((x) => x.id === nextId)) {
      return { index: i, value: nextId };
    }
  }

  return { index: 0, value: startId + (sorted.length - start) };
};

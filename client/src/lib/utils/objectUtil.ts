/**
 * Returns a new object with the same keys as the provided object,
 * where each value is replaced by a default based on its type.
 * For example, string values become '', numbers become 0, booleans become false, etc.
 */
export const getDefaultObject = <T extends Record<string, any>>(
  obj: T,
): Partial<T> => {
  const defaultObj: Partial<T> = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const value = obj[key];
      if (typeof value === 'string') {
        defaultObj[key] = '' as any;
      } else if (typeof value === 'number') {
        defaultObj[key] = 0 as any;
      } else if (typeof value === 'boolean') {
        defaultObj[key] = false as any;
      } else if (Array.isArray(value)) {
        defaultObj[key] = [] as any;
      } else if (value !== null && typeof value === 'object') {
        defaultObj[key] = {} as any;
      } else {
        defaultObj[key] = null as any;
      }
    }
  }
  return defaultObj;
};

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

    const areBothObjects =
      value1 !== null &&
      value2 !== null &&
      typeof value1 === 'object' &&
      typeof value2 === 'object';

    if (areBothObjects) {
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
export const removeEmptyAttributesArray = <T>(
  arr: T[],
): null | Partial<T>[] => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }
  return arr.map(removeEmptyAttributes);
};

/**
 * Removes attributes from an object if they are:
 * - null or undefined
 * - an empty string (after trimming)
 * - an empty array
 */
export const removeEmptyAttributes = <T>(obj: T): Partial<T> => {
  return Object.entries(obj as Record<string, unknown>).reduce<Partial<T>>(
    (acc, [key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        !(typeof value === 'string' && value.trim() === '') &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        (acc as Record<string, unknown>)[key] = value;
      }
      return acc;
    },
    {},
  );
};

/**
 * Returns a new object with all string attributes trimmed.
 */
export const trimAttributes = <T>(obj: T): T => {
  const trimmedObj: Record<string, unknown> =
    typeof obj === 'object' && obj !== null ? { ...obj } : {};
  for (const key of Object.keys(trimmedObj)) {
    if (typeof trimmedObj[key] === 'string') {
      trimmedObj[key] = trimmedObj[key].trim();
    }
  }
  return trimmedObj as T;
};

/**
 * Returns a new object with keys sorted in alphabetical order.
 */
export const sortObjectKeys = <T>(obj: T): T => {
  return Object.keys(obj as Record<string, unknown>)
    .sort()
    .reduce((acc, key) => {
      (acc as Record<string, unknown>)[key] = (obj as Record<string, unknown>)[
        key
      ];
      return acc;
    }, {} as T);
};

/**
 * Type representing an object with a numeric "id" property.
 */
export type IdType = {
  readonly id: number;
};

/**
 * Cleans up an object by:
 * - Removing empty attributes
 * - Sorting object keys
 * - Trimming string values
 * Returns a new object with these modifications.
 */
export const cleanUpData = <T extends IdType>(data: T): T => {
  const cleanedData = removeEmptyAttributes(data) as T;
  const sortedData = sortObjectKeys(cleanedData);
  const trimmedData = trimAttributes(sortedData);
  const { id, ...rest } = trimmedData;
  return { id, ...rest } as T;
};

/**
 * Finds the next available id in an array of objects with an "id" property.
 * Assumes the array is unsorted; it sorts the array first.
 */
export const getNextId = (
  items: readonly IdType[] | undefined,
): number | undefined => {
  if (!items || items.length === 0) {
    return undefined;
  }
  const sortedArray = items.toSorted((a, b) => a.id - b.id);
  let expectedId = sortedArray[0].id;
  for (const item of sortedArray) {
    if (item.id !== expectedId) {
      return expectedId;
    }
    expectedId++;
  }
  return expectedId;
};

/**
 * Returns the next available id starting from a given position in the sorted array,
 * along with the index where this gap occurs.
 */
export const getNextIdFromPos = (
  items: readonly IdType[] | undefined,
  start: number,
): undefined | { index: number; value: number } => {
  if (!items || items.length === 0) return undefined;
  const sortedArray = items.toSorted((a, b) => a.id - b.id);
  const startingItem = sortedArray[start];
  let expectedId = startingItem.id || 1;

  for (let i = start; i < sortedArray.length; i++) {
    if (sortedArray[i].id !== expectedId) {
      return { index: i, value: expectedId };
    }
    expectedId++;
  }
  return { index: 0, value: expectedId };
};

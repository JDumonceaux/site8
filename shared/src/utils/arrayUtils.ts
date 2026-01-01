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

/**
 * Finds an item in an array by ID property
 * @param arr - Array to search
 * @param id - ID to find
 * @returns Found item or undefined
 */
export const findById = <T extends { id: number | string }>(
  arr: readonly T[],
  id: number | string
): T | undefined => {
  return arr.find((item) => item.id === id);
};

/**
 * Excludes an item from an array by ID
 * @param arr - Source array
 * @param id - ID to exclude
 * @returns New array without the item with specified ID
 */
export const excludeById = <T extends { id: number | string }>(
  arr: readonly T[],
  id: number | string
): readonly T[] => {
  return arr.filter((item) => item.id !== id);
};

/**
 * Extracts IDs from an array of objects
 * @param arr - Array of objects with id property
 * @returns Array of IDs
 */
export const getIds = <T extends { id: number | string }>(
  arr: readonly T[]
): (number | string)[] => {
  return arr.map((item) => item.id);
};

/**
 * Maps and filters an array in one pass (more efficient than map().filter())
 * @param arr - Source array
 * @param callback - Function that returns mapped value or null/undefined to filter out
 * @returns New array with mapped and filtered values
 */
export const mapAndFilter = <T, U>(
  arr: readonly T[],
  callback: (
    item: T,
    index: number,
    array: readonly T[]
  ) => U | null | undefined
): U[] => {
  const result: U[] = [];
  for (let i = 0; i < arr.length; i++) {
    const mapped = callback(arr[i], i, arr);
    if (mapped !== null && mapped !== undefined) {
      result.push(mapped);
    }
  }
  return result;
};

/**
 * Groups array items by a key function
 * @param arr - Source array
 * @param keyFn - Function to extract the grouping key
 * @returns Map of key to array of items
 */
export const groupBy = <T, K extends PropertyKey>(
  arr: readonly T[],
  keyFn: (item: T) => K
): Record<K, T[]> => {
  return arr.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
};

/**
 * Creates a map from array using a key function
 * @param arr - Source array
 * @param keyFn - Function to extract the key
 * @returns Map of key to item
 */
export const keyBy = <T, K extends PropertyKey>(
  arr: readonly T[],
  keyFn: (item: T) => K
): Record<K, T> => {
  return arr.reduce((map, item) => {
    map[keyFn(item)] = item;
    return map;
  }, {} as Record<K, T>);
};

/**
 * Returns unique items from an array
 * @param arr - Source array
 * @param keyFn - Optional function to extract comparison key
 * @returns Array with duplicates removed
 */
export const unique = <T>(
  arr: readonly T[],
  keyFn?: (item: T) => unknown
): T[] => {
  if (!keyFn) {
    return [...new Set(arr)];
  }

  const seen = new Set<unknown>();
  return arr.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

/**
 * Partitions array into two arrays based on predicate
 * @param arr - Source array
 * @param predicate - Function that returns true for items in first partition
 * @returns Tuple of [matching items, non-matching items]
 */
export const partition = <T>(
  arr: readonly T[],
  predicate: (item: T, index: number, array: readonly T[]) => boolean
): [T[], T[]] => {
  const truthy: T[] = [];
  const falsy: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      truthy.push(arr[i]);
    } else {
      falsy.push(arr[i]);
    }
  }

  return [truthy, falsy];
};

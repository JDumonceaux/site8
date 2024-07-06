/**
 * Removes empty attributes from an object.
 *
 * @param obj - The object from which to remove empty attributes.
 * @returns The object with empty attributes removed.
 */
export function removeEmptyAttributes<T>(obj: T | any): T | any {
  // Remove null and undefined attributes
  const temp = Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null)
      .filter(([_, v]) => v !== undefined),
  );
  for (const k in temp) {
    const x = temp[k];
    // Remove empty strings
    if (typeof x === 'string' && x.trim() === '') {
      delete temp[k];
    }
    // Remove empty arrays
    if (Array.isArray(x) && x.length === 0) {
      delete temp[k];
    }
  }
  return temp;
}

/**
 * Trims the string values of an object.
 * @param obj - The object to trim.
 * @returns The object with trimmed string values.
 */
export function trimAttributes<T>(obj: T | any): T | any {
  const trimmedObj = { ...obj };
  Object.keys(trimmedObj).forEach((key: string) => {
    if (typeof trimmedObj[key] === 'string') {
      trimmedObj[key] = trimmedObj[key].trim();
    }
  });
  return trimmedObj;
}

/**
 * Sorts the keys of an object in alphabetical order.
 *
 * @param obj - The object whose keys need to be sorted.
 * @returns A new object with the keys sorted in alphabetical order.
 */
export function sortObjectKeys<T>(obj: T | any): T | any {
  const sortedKeys: string[] = Object.keys(obj).sort();
  return sortedKeys.reduce((acc: Record<string, number>, key: string) => {
    return {
      ...acc,
      [key]: obj[key],
    };
  }, {});
}

/**
 * Represents a CleanupType object.
 * CleanupType objects must have an id attribute.
 */
export type CleanupType = {
  readonly id: number;
};

/**
 * Cleans up the provided data by removing empty attributes, sorting object keys,
 * and trimming attribute values.
 *
 * @template T - The type of the data to clean up.
 * @param {T} data - The data to clean up.
 * @returns {T} - The cleaned up data.
 */
export function cleanUpData<T extends CleanupType>(data: T): T {
  const cleanedData: T = removeEmptyAttributes<T>(data);
  const sortedData: T = sortObjectKeys<T>(cleanedData);
  const trimmedData: T = trimAttributes<T>(sortedData);
  const { id, ...rest } = trimmedData;
  return { id, ...rest } as T;
}

/**
 * Returns the next available ID for a given array of items.
 *
 * @param items - The array of items to search for the next ID.
 * @returns The next available ID or undefined if the array is empty.
 */
export function getNextId<T extends CleanupType>(
  items: ReadonlyArray<T> | undefined,
): number | undefined {
  if (!items) {
    return undefined;
  }
  const sortedArray = items.toSorted((a, b) => a.id - b.id);
  // Start with the first id in the sorted array
  let nextId = sortedArray[0].id;
  // Iterate through the array to find the missing id
  for (let i = 0; i < sortedArray.length; i++) {
    const y = sortedArray.find((x) => x.id === nextId);
    if (!y) {
      return nextId;
    }
    nextId++; // Move to the next expected id
  }
  // If no gaps were found, the next free id is one greater than the last object's id
  return nextId;
}

/**
 * Returns the next available ID from a given position in an array of objects.
 * The objects in the array must have an `id` property.
 *
 * @template T - The type of objects in the array.
 * @param items - The array of objects.
 * @param start - The starting position to search for the next ID.
 * @returns The next available ID or `undefined` if no IDs are available.
 */
export function getNextIdFromPos<T extends CleanupType>(
  items: ReadonlyArray<T> | undefined,
  start: number,
): { value: number; index: number } | undefined {
  if (!items) {
    return undefined;
  }
  const sortedArray = items.toSorted((a, b) => a.id - b.id);
  // Start with the first id in the sorted array
  let nextId = sortedArray.length > start ? sortedArray[start].id : 1;
  // Iterate through the array to find the missing id
  for (let i = start; i < sortedArray.length; i++) {
    const y = sortedArray.find((x) => x.id === nextId);
    if (!y) {
      return { value: nextId, index: i };
    }
    nextId++; // Move to the next expected id
  }
  // If no gaps were found, the next free id is one greater than the last object's id
  return { value: nextId, index: 0 };
}

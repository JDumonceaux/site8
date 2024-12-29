export const getDefaultObject = (): unknown => {
  const ret: Record<string, unknown> = {};
  const obj = {} as unknown;
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        const value = (obj as Record<string, unknown>)[key];
        if (typeof value === 'string') {
          ret[key] = '';
        } else if (typeof value === 'number') {
          ret[key] = 0;
        } else if (typeof value === 'boolean') {
          ret[key] = false;
        } else if (Array.isArray(value)) {
          ret[key] = [];
        } else if (typeof value === 'object') {
          ret[key] = {};
        } else {
          ret[key] = null;
        }
      }
    }
  }
  return ret as unknown;
};

export const isDeepEqual = (
  object1: Record<string, unknown>,
  object2: Record<string, unknown>,
) => {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (const key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = typeof value1 === 'object' && typeof value2 === 'object';

    if (
      (isObjects &&
        value1 !== null &&
        !isDeepEqual(
          value1 as Record<string, unknown>,
          value2 as Record<string, unknown>,
        )) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }
  return true;
};

export const removeEmptyAttributesArray = <T>(
  obj: T[],
): null | Partial<T>[] => {
  if (!Array.isArray(obj) || obj.length === 0) {
    return null;
  }

  return obj.map((x) => removeEmptyAttributes<T>(x));
};

export const removeEmptyAttributes = <T>(obj: T): Partial<T> => {
  // Remove null and undefined attributes
  const temp = Object.fromEntries(
    Object.entries(obj as Record<string, unknown>)
      .filter(([_, v]) => v !== null)
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
};

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

export const sortObjectKeys = <T>(obj: T): T => {
  const sortedKeys: string[] = Object.keys(
    obj as Record<string, unknown>,
  ).sort();
  const result: Record<string, unknown> = {};
  for (const key of sortedKeys) {
    result[key] = (obj as Record<string, unknown>)[key];
  }
  return result as T;
};

export type IdType = {
  readonly id: number;
};

export const cleanUpData = <T extends IdType>(data: T): T => {
  const cleanedData = removeEmptyAttributes<T>(data) as T;
  const sortedData = sortObjectKeys<T>(cleanedData);
  const trimmedData = trimAttributes<T>(sortedData);
  const { id, ...rest } = trimmedData;
  return { id, ...rest } as T;
};

export const getNextId = <T extends IdType>(
  items: readonly T[] | undefined,
): number | undefined => {
  if (!items) {
    return undefined;
  }
  if (items.length > 0) {
    const sortedArray = items.toSorted((a, b) => a.id - b.id);
    // Iterate through the array to find the missing id
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sortedArray.length; i++) {
      const nextId = sortedArray[0].id + i;
      const y = sortedArray.find((x) => x.id === nextId);
      if (!y) {
        return nextId;
      }
    }
    // If no gaps were found, the next free id is one greater than the last object's id
    return sortedArray ? sortedArray.at(-1).id + 1 : undefined;
  }
  return undefined;
};

/**
 * Returns the next available ID from a given position in an array of objects.
 * The objects in the array must have an `id` property.
 *
 * @template T - The type of objects in the array.
 * @param items - The array of objects.
 * @param start - The starting position to search for the next ID.
 * @returns The next available ID or `undefined` if no IDs are available.
 */
export const getNextIdFromPos = <T extends IdType>(
  items: readonly T[] | undefined,
  start: number,
): undefined | { index: number; value: number } => {
  if (!items) {
    return undefined;
  }
  const sortedArray = items.toSorted((a, b) => a.id - b.id);
  // Start with the first id in the sorted array
  let nextId = sortedArray.length > start ? sortedArray[start].id : 1;
  // Iterate through the array to find the missing id
  // eslint-disable-next-line no-plusplus
  for (let i = start; i < sortedArray.length; i++) {
    const y = sortedArray.find((x) => x.id === nextId);
    if (!y) {
      return { index: i, value: nextId };
    }
    nextId++; // Move to the next expected id
  }
  // If no gaps were found, the next free id is one greater than the last object's id
  return { index: 0, value: nextId };
};

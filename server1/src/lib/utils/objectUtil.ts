export function getDefaultObject<T>(obj: T | unknown): T | unknown {
  const ret: Record<string, unknown> = {};
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
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
  return ret;
}

export function removeEmptyAttributes<T>(obj: T | unknown): T | unknown {
  // Remove null and undefined attributes
  const temp = Object.fromEntries(
    Object.entries(obj as Record<string, unknown>)
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

export function trimAttributes<T>(obj: T | unknown): T | unknown {
  const trimmedObj: Record<string, unknown> =
    typeof obj === 'object' && obj !== null ? { ...obj } : {};
  Object.keys(trimmedObj).forEach((key: string) => {
    if (typeof trimmedObj[key] === 'string') {
      trimmedObj[key] = (trimmedObj[key] as string).trim();
    }
  });
  return trimmedObj;
}

export function sortObjectKeys<T>(obj: T | unknown): T | unknown {
  const sortedKeys: string[] = Object.keys(
    obj as Record<string, unknown>,
  ).sort();
  return sortedKeys.reduce((acc: Record<string, unknown>, key: string) => {
    return {
      ...acc,
      [key]: (obj as Record<string, unknown>)[key],
    };
  }, {});
}

export type IdType = {
  readonly id: number;
};

export function cleanUpData<T>(data: T): T {
  const cleanedData = removeEmptyAttributes<T>(data) as T;
  const sortedData = sortObjectKeys<T>(cleanedData) as T;
  const trimmedData = trimAttributes<T>(sortedData) as T;
  if ((trimmedData as Partial<IdType>).id !== undefined) {
    const { id } = trimmedData as IdType;
    return { id, ...trimmedData } as T;
  }
  return { ...trimmedData } as T;
}

export function getNextId<T extends IdType>(
  items: ReadonlyArray<T> | undefined,
): number | undefined {
  if (!items) {
    return undefined;
  }
  if (items.length > 0) {
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
  return undefined;
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
export function getNextIdFromPos<T extends IdType>(
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

// Remove empty attributes from an object
export function removeEmptyAttributes<T>(obj: T | any): T | any {
  const temp = Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null)
      .filter(([_, v]) => v !== undefined),
    // .map(([k, v]) => [k, v === Object(v) ? removeEmptyAttributes(v) : v]),
  );
  for (const k in temp) {
    const x = temp[k];
    if (typeof x === 'string' && x.trim() === '') {
      delete temp[k];
    }
    if (Array.isArray(x) && x.length === 0) {
      delete temp[k];
    }
  }
  return temp;
}

// Create a new object with sorted keys
export function sortObjectKeys<T>(obj: T | any): T | any {
  const sortedKeys: string[] = Object.keys(obj).sort();

  return sortedKeys.reduce((acc: Record<string, number>, key: string) => {
    acc[key] = obj[key];
    return acc;
  }, {});
}

export type CleanupType = {
  readonly id: number;
};

export function cleanUpData<T extends CleanupType>(data: T): T {
  const cleanedData: T = removeEmptyAttributes<T>(data);
  const sortedData: T = sortObjectKeys<T>(cleanedData);
  const { id, ...rest } = sortedData;
  return { id, ...rest } as T;
}

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

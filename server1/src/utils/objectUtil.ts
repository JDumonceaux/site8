// Remove empty attributes from an object
export function removeEmptyAttributes<T>(obj: T | any): T | any {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null)
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => [k, v === Object(v) ? removeEmptyAttributes(v) : v]),
  );
}

// Create a new object with sorted keys
export function sorteObjectKeys<T>(obj: T | any): T | any {
  const sortedKeys: string[] = Object.keys(obj).sort();

  const sortedObject: Record<string, number> = sortedKeys.reduce(
    (acc: Record<string, number>, key: string) => {
      acc[key] = obj[key];
      return acc;
    },
    {},
  );

  return sortedObject;
}

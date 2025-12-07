export const getDefaultObject = (
  obj: Record<string, unknown>,
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (typeof value === 'string') {
        result[key] = '';
      } else if (typeof value === 'number') {
        result[key] = 0;
      } else if (typeof value === 'boolean') {
        result[key] = false;
      } else if (Array.isArray(value)) {
        result[key] = [];
      } else if (typeof value === 'object') {
        result[key] = {};
      } else {
        result[key] = null;
      }
    }
  }

  return result;
};

export const removeEmptyAttributes = <T extends Record<string, unknown>>(
  obj: T,
): Partial<T> => {
  const filtered = Object.entries(obj)
    .filter(([_, value]) => value != null)
    .filter(([_, value]) => {
      if (typeof value === 'string') return value.trim() !== '';
      if (Array.isArray(value)) return value.length > 0;
      return true;
    });

  return Object.fromEntries(filtered) as Partial<T>;
};

export const trimAttributes = <T extends Record<string, unknown>>(
  obj: T,
): T => {
  const entries = Object.entries(obj).map(([key, value]) => [
    key,
    typeof value === 'string' ? value.trim() : value,
  ]);

  return Object.fromEntries(entries) as T;
};

export const sortObjectKeys = <T extends Record<string, unknown>>(
  obj: T,
): T => {
  const sortedKeys = Object.keys(obj).sort();
  const entries = sortedKeys.map((key) => [key, obj[key]]);

  return Object.fromEntries(entries) as T;
};

export type IdType = {
  readonly id: number;
};

export const cleanUpData = <T extends Record<string, unknown>>(data: T): T => {
  const cleaned = removeEmptyAttributes(data) as T;
  const sorted = sortObjectKeys(cleaned);
  const trimmed = trimAttributes(sorted);

  if ('id' in trimmed && typeof trimmed['id'] === 'number') {
    const { id, ...rest } = trimmed;
    return { id, ...rest } as unknown as T;
  }

  return trimmed;
};

export const getNextId = (
  items: readonly IdType[] | undefined,
): number | undefined => {
  if (!items?.length) {
    return undefined;
  }

  const sorted = [...items].sort((a, b) => a.id - b.id);
  let nextId = sorted[0]?.id;

  if (nextId === undefined) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/prefer-for-of -- Need index iteration for ID finding
  for (let i = 0; i < sorted.length; i++) {
    if (!sorted.find((x) => x.id === nextId)) {
      return nextId;
    }
    nextId++;
  }

  return nextId;
};

export const getNextIdFromPos = (
  items: readonly IdType[] | undefined,
  start: number,
): { readonly index: number; readonly value: number } | undefined => {
  if (!items?.length) {
    return undefined;
  }

  const sorted = [...items].sort((a, b) => a.id - b.id);
  let nextId = sorted.length > start ? sorted[start]?.id : 1;

  nextId ??= 1;

  for (let i = start; i < sorted.length; i++) {
    if (!sorted.find((x) => x.id === nextId)) {
      return { index: i, value: nextId };
    }
    nextId++;
  }

  return { index: 0, value: nextId };
};

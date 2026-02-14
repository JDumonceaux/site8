/**
 * Combines an array of parent items (each with id and seq) into a comma-separated string.
 * Returns an empty string if items is undefined.
 * If items is an empty array, returns "0,0".
 */
export const combineParent = (
  items?: { id?: number; seq?: number }[],
): string => {
  if (items == null) return '';
  const values = items.flatMap((item) =>
    [item.id, item.seq].filter((v) => v !== undefined).map(String),
  );
  return values.length > 0 ? values.join(',') : '0,0';
};

/**
 * Splits a comma-separated string into an array of parent items with id and seq.
 * Returns undefined if the input is invalid or the number of values is not even.
 */
export const splitParent = (
  value?: string,
): undefined | { id: number; seq: number }[] => {
  if (value == null || value.trim() === '') return undefined;
  const parts = value.trim().split(',');
  if (parts.length % 2 !== 0) return undefined;

  const result: { id: number; seq: number }[] = [];
  for (let index = 0; index < parts.length; index += 2) {
    const id = Number.parseInt(parts[index], 10);
    const seq = Number.parseInt(parts[index + 1], 10);
    if (!Number.isNaN(id) && !Number.isNaN(seq)) {
      result.push({ id, seq });
    }
  }
  return result.length > 0 ? result : undefined;
};

import { IMAGE_BASE } from './constants';

/**
 * Returns a string representation of a numeric id if valid, otherwise undefined.
 */
export const getParamIdAsString = (id?: string): string | undefined => {
  if (!id?.trim()) return undefined;
  const parsedId = Number.parseInt(id, 10);
  return !Number.isNaN(parsedId) && parsedId > 0
    ? parsedId.toString()
    : undefined;
};

/**
 * Splits a URL path by '/' and returns all segments after the leading slash.
 */
export const getURLPath = (url: string): string[] | undefined => {
  return url ? url.split('/').slice(1) : undefined;
};

/**
 * Combines an array of parent items (each with id and seq) into a comma-separated string.
 * Returns an empty string if items is undefined.
 * If items is an empty array, returns "0,0".
 */
export const combineParent = (
  items?: { id?: number; seq?: number }[],
): string => {
  if (!items) return '';
  const values = items.flatMap((item) =>
    [item.id, item.seq].filter((v): v is number => v !== undefined).map(String),
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
  if (!value) return undefined;
  const parts = value.trim().split(',');
  if (parts.length % 2 !== 0) return undefined;

  const result: { id: number; seq: number }[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    const id = Number.parseInt(parts[i], 10);
    const seq = Number.parseInt(parts[i + 1], 10);
    if (!Number.isNaN(id) && !Number.isNaN(seq)) {
      result.push({ id, seq });
    }
  }
  return result.length > 0 ? result : undefined;
};

/**
 * Checks if the given array is valid (not null/undefined and contains at least one element).
 */
export const isValidArray = (array: null | undefined | unknown[]): boolean =>
  Array.isArray(array) && array.length > 0;

/**
 * Constructs a source URL for an image, using an optional folder and fileName.
 */
export const getSRC = (
  folder?: string,
  fileName?: string,
): string | undefined => {
  if (!fileName?.trim()) return undefined;
  const trimmedFolder = folder?.trim();
  const folderPath = trimmedFolder ? `/${trimmedFolder}` : '';
  return `${IMAGE_BASE}${folderPath}/${fileName.trim()}`;
};

import { IMAGE_BASE } from './constants';

/**
 * Converts the given ID to a string if it is a valid positive integer.
 * @param id - The ID to convert.
 * @returns The ID as a string if it is a valid positive integer, otherwise undefined.
 */
export const getParamIdAsString = (id?: string): string | undefined => {
  if (!id || id.trim().length === 0) return undefined;
  const tempId = parseInt(id ?? '');
  if (!isNaN(tempId) && tempId > 0) {
    return tempId.toString();
  }
  return undefined;
};

/**
 * Splits the given URL into an array of path segments.
 *
 * @param url - The URL to split.
 * @returns An array of path segments or undefined if the URL is empty.
 */
export const getURLPath = (url: string): string[] | undefined => {
  return url ? url.split('/').slice(1) : undefined;
};

/**
 * Combines the `id` and `seq` properties of an array of objects into a comma-separated string.
 * If the input array is empty or undefined, the function returns '0,0'.
 *
 * @param items - An optional array of objects with `id` and `seq` properties.
 * @returns A string representing the combined `id` and `seq` values, separated by commas.
 */
export const combineParent = (
  items?: { id?: number; seq?: number }[],
): string => {
  if (!items) return '';
  const ret: string[] = items.flatMap((x) =>
    [x.id, x.seq].filter((v) => v != undefined).map(String),
  );
  return ret.length ? ret.join(',') : '0,0';
};

/**
 * Splits a string value into an array of objects with `id` and `seq` properties.
 * The input string should be in the format "id1,seq1,id2,seq2,...".
 * Returns an array of objects if the input is valid, otherwise returns undefined.
 *
 * @param value - The string value to be split.
 * @returns An array of objects with `id` and `seq` properties, or undefined if the input is invalid.
 */
export const splitParent = (
  value?: string,
): { id: number; seq: number }[] | undefined => {
  if (!value) return undefined;
  const items = value.trim().split(',');
  if (items.length % 2 !== 0) return undefined;

  const result: { id: number; seq: number }[] = [];
  for (let i = 0; i < items.length; i += 2) {
    const id = parseInt(items[i]);
    const seq = parseInt(items[i + 1]);
    if (!isNaN(id) && !isNaN(seq)) {
      result.push({ id, seq });
    }
  }
  return result.length ? result : undefined;
};

/**
 * Checks if an array is valid (not empty and of type unknown[]).
 *
 * @param arr - The array to be checked.
 * @returns A boolean indicating whether the array is valid or not.
 */
// Array.isValidArray(), checks whether its argument is an array.
// This weeds out values like null,
// undefined and anything else that is not an array.
// arr.length condition checks whether the
// variable's length property evaluates to a truthy value.
export const isValidArray = (arr: unknown[] | undefined | null): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

/**
 * Returns the source URL for an image file based on the provided folder and file name.
 * @param folder - The folder where the image file is located (optional).
 * @param fileName - The name of the image file.
 * @returns The source URL of the image file.
 */
export const getSRC = (
  folder?: string,
  fileName?: string,
): string | undefined => {
  if (!fileName || !fileName.trim().length) return undefined;
  const tempFolder = folder?.trim() ? `/${folder.trim()}` : '';
  return `${IMAGE_BASE}${tempFolder}/${fileName.trim()}`;
};

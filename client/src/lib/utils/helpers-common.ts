import { IMAGE_BASE } from './constants';

/**
 * Checks if the given array is valid (not null/undefined and contains at least one element).
 */
export const isValidArray = (
  array: Iterable<unknown> | null | undefined,
): boolean => Array.isArray(array) && array.length > 0;

/**
 * Constructs a source URL for an image, using an optional folder and fileName.
 */
export const getSRC = (
  folder?: string,
  fileName?: string,
): string | undefined => {
  if (fileName == null || fileName.trim() === '') return undefined;
  const trimmedFolder = folder?.trim();
  const folderPath =
    trimmedFolder != null && trimmedFolder.length > 0
      ? `/${trimmedFolder}`
      : '';
  return `${IMAGE_BASE}${folderPath}/${fileName.trim()}`;
};

/**
 * Splits a URL path by '/' and returns all segments after the leading slash.
 */
export const getURLPath = (url: string): string[] | undefined => {
  if (url.trim() === '') return undefined;
  return url.split('/').slice(1);
};

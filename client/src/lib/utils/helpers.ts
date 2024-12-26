import { IMAGE_BASE } from './constants';

export const getParamIdAsString = (id?: string): string | undefined => {
  if (!id || id.trim().length === 0) return undefined;
  const temporaryId = Number.parseInt(id, 10);
  if (!Number.isNaN(temporaryId) && temporaryId > 0) {
    return temporaryId.toString();
  }
  return undefined;
};

export const getURLPath = (url: string): string[] | undefined => {
  return url ? url.split('/').slice(1) : undefined;
};

export const combineParent = (
  items?: { id?: number; seq?: number }[],
): string => {
  if (!items) return '';
  const returnValue: string[] = items.flatMap((x) =>
    [x.id, x.seq].filter((v) => v !== undefined).map(String),
  );
  return returnValue.length > 0 ? returnValue.join(',') : '0,0';
};

export const splitParent = (
  value?: string,
): undefined | { id: number; seq: number }[] => {
  if (!value) return undefined;
  const items = value.trim().split(',');
  if (items.length % 2 !== 0) return undefined;

  const result: { id: number; seq: number }[] = [];
  for (let index = 0; index < items.length; index += 2) {
    const id = Number.parseInt(items[index], 10);
    const seq = Number.parseInt(items[index + 1], 10);
    if (!Number.isNaN(id) && !Number.isNaN(seq)) {
      result.push({ id, seq });
    }
  }
  return result.length > 0 ? result : undefined;
};

export const isValidArray = (array: null | undefined | unknown[]): boolean => {
  return Array.isArray(array) && array.length > 0;
};

export const getSRC = (
  folder?: string,
  fileName?: string,
): string | undefined => {
  if (!fileName || fileName.trim().length === 0) return undefined;
  const temporaryFolder = folder?.trim() ? `/${folder.trim()}` : '';
  return `${IMAGE_BASE}${temporaryFolder}/${fileName.trim()}`;
};

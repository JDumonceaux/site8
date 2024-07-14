import { IMAGE_BASE } from './constants';

export const getURLPath = (url: string) => {
  if (!url) {
    return undefined;
  }
  return url.split('/').slice(1);
};

// Convert the parent array to a string
export const combineParent = (
  items: { id?: number; seq?: number }[] | undefined,
): string => {
  if (!items) {
    return '';
  }
  const ret: string[] = [];
  if (!Array.isArray(items)) {
    return '0,0';
  }
  items.forEach((x) => {
    if (x.id != undefined) {
      ret.push(x.id.toString());
    }
    if (x.seq != undefined) {
      ret.push(x.seq.toString());
    }
  });
  return ret.join(',');
};

export const splitParent = (
  value: string | undefined,
): { id: number; seq: number }[] | undefined => {
  if (!value) {
    return undefined;
  }
  const x = value.trim().length > 0 ? value.trim().split(',') : undefined;
  if (!x) {
    return undefined;
  }
  return x
    .map((item, index) => {
      if (index % 2 === 0) {
        const id = parseInt(item);
        const itemExists = !(typeof x[index + 1] === 'undefined');
        const seq = itemExists ? parseInt(x[index + 1]) : 0;
        if (!isNaN(id) && !isNaN(seq)) {
          return { id, seq };
        }
      }
      return undefined;
    })
    .filter(Boolean) as { id: number; seq: number }[];
};

// Array.isArray(), checks whether its argument is an array.
// This weeds out values like null,
// undefined and anything else that is not an array.
// arr.length condition checks whether the
// variable's length property evaluates to a truthy value.
export const isValidArray = (arr: unknown[] | undefined | null) => {
  if (!Array.isArray(arr) || !arr.length) {
    return false;
  }
  return true;
};

export const getSRC = (
  folder: string | undefined,
  fileName: string | undefined,
): string | undefined => {
  if (!fileName || fileName.trim().length === 0) {
    return undefined;
  }
  const tempFolder =
    folder && folder.trim().length > 0 ? '/' + folder.trim() : '';

  return IMAGE_BASE + tempFolder + '/' + fileName.trim();
};

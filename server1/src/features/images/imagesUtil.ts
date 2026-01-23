import type { ImageFile } from './types.js';
import type { Image } from '@site8/shared';

import { FOLDERS_TO_IGNORE } from '../../utils/constants.js';
import { cleanUpData, getNextIdFromPos } from '../../utils/objectUtil.js';

/**
 * Filters and processes new image items by removing duplicates and ignored folders
 * @param prevItems - Existing image items to check for duplicates
 * @param newItems - New image items to process
 * @returns Filtered and sorted array of new unique images, or undefined if newItems is undefined
 */
export const getNewItems = (
  prevItems: ImageFile[] | undefined,
  newItems: ImageFile[] | undefined,
): ImageFile[] | undefined => {
  if (!newItems) return undefined;

  const uniqueItems = newItems.filter((item) => {
    // Exclude items already present in prevItems
    const exists = prevItems?.some(
      (prev) => prev.fileName === item.fileName && prev.folder === item.folder,
    );
    return !exists;
  });

  const filteredItems = uniqueItems.filter((item) => {
    // Exclude items in ignored folders and with an empty fileName
    const isIgnored = FOLDERS_TO_IGNORE.some((ignore) =>
      item.folder ? item.folder.startsWith(ignore) : true,
    );
    return !isIgnored && item.fileName !== '';
  });

  const newItemsWithFlag = filteredItems.map((item) =>
    cleanUpData<ImageFile>({ ...item }),
  );

  return newItemsWithFlag.toSorted((a, b) =>
    (a.fileName ?? '').localeCompare(b.fileName ?? ''),
  );
};

/**
 * Assigns new IDs to image items that don't have valid IDs (id <= 0)
 * @param items - Array of image items to process
 * @returns Array with newly assigned sequential IDs, or undefined if items is undefined
 */
export const getNewIds = (items: Image[] | undefined): Image[] | undefined => {
  if (!items) return undefined;

  let startPos = 0;
  return items.map((item) => {
    if (item.id > 0) {
      return item;
    }
    const nextIdObj = getNextIdFromPos(items, startPos) ?? {
      index: 0,
      value: 0,
    };
    startPos = nextIdObj.index;
    return { ...item, id: nextIdObj.value };
  });
};

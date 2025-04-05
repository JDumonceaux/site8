import { Image } from '../../types/Image.js';
import { FOLDERS_TO_IGNORE } from '../../lib/utils/constants.js';
import { cleanUpData, getNextIdFromPos } from '../../lib/utils/objectUtil.js';

export function getNewItems(
  prevItems: Image[] | undefined,
  newItems: Image[] | undefined,
): Image[] | undefined {
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
    cleanUpData<Image>({ ...item }),
  );

  return newItemsWithFlag.sort((a, b) => a.fileName.localeCompare(b.fileName));
}

export function getNewIds(items: Image[] | undefined): Image[] | undefined {
  if (!items) return undefined;

  let startPos = 0;
  return items.map((item) => {
    if (item.id > 0) {
      return item;
    }
    const nextIdObj = getNextIdFromPos<Image>(items, startPos) || {
      value: 0,
      index: 0,
    };
    startPos = nextIdObj.index;
    return { ...item, id: nextIdObj.value };
  });
}

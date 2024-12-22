import { Image } from '../../types/Image.js';
import { FOLDERS_TO_IGNORE } from '../../lib/utils/constants.js';
import { cleanUpData, getNextIdFromPos } from '../../lib/utils/objectUtil.js';

export function getNewItems(
  prevItems: Image[] | undefined,
  newItems: Image[] | undefined,
): Image[] | undefined {
  // Get the items not already in the list
  // Exempt site and yatch folders
  // Exempt where fileName is missing
  // Add isNewItem property
  const ret = newItems
    ?.filter(
      (x) =>
        !prevItems?.find(
          (y) => y.fileName === x.fileName && y.folder === x.folder,
        ),
    )
    .filter(
      (x) =>
        !FOLDERS_TO_IGNORE.some((y) =>
          x.folder ? x.folder.startsWith(y) : true,
        ),
    )
    .filter((x) => x.fileName !== '')
    .map((x) =>
      cleanUpData<Image>({
        ...x,
        isNewItem: true,
      }),
    )
    .sort((a, b) => a.fileName.localeCompare(b.fileName));
  return ret;
}

export function getNewIds(items: Image[] | undefined): Image[] | undefined {
  let startPos = 0;
  const ret: Image[] | undefined = items?.map((item) => {
    if (item.id > 0) {
      return item;
    } else {
      const nextId = getNextIdFromPos<Image>(items, startPos++) || {
        value: 0,
        index: 0,
      };
      startPos = nextId.index;
      return {
        ...item,
        id: nextId.value,
      };
    }
  });
  return ret;
}

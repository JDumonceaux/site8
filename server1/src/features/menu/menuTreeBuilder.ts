import type { MenuItem, PageMenu, Parent } from '@site8/shared';

import { Logger } from '../../utils/logger.js';

import { mapPageMenuToMenuItem } from './mapPageMenuToMenuItem.js';
import {
  buildOrphans,
  buildRootItems,
  constructUrl,
  getSortBy,
  mapChildrenByParent,
  segmentItemsByType,
  sortChildren,
  type SegmentedItems,
} from './menuTreeHelpers.js';

const mapChildMenu = (
  menu: PageMenu,
  parent: Parent,
  parentItem: PageMenu | undefined,
  segmented: SegmentedItems,
  allItems: readonly PageMenu[],
): MenuItem => {
  const url = constructUrl(menu, parentItem);
  const menuItem = mapPageMenuToMenuItem(menu, parent, url);
  const children = buildChildren(menu.id, segmented, allItems);
  return children ? { ...menuItem, items: children } : menuItem;
};

const buildChildren = (
  parentId: number,
  segmented: SegmentedItems,
  allItems: readonly PageMenu[],
): MenuItem[] | undefined => {
  try {
    const parentItem = allItems.find((item) => item.id === parentId);

    const childMenus = mapChildrenByParent(
      parentId,
      segmented.menus,
      (menu, parent) =>
        mapChildMenu(menu, parent, parentItem, segmented, allItems),
    );

    const childPages = mapChildrenByParent(
      parentId,
      segmented.pages,
      (page, parent) => {
        const url = constructUrl(page, parentItem);
        return mapPageMenuToMenuItem(page, parent, url);
      },
    );

    const allChildren = [...childMenus, ...childPages];
    if (allChildren.length === 0) {
      return undefined;
    }

    return sortChildren(allChildren, getSortBy(parentId, allItems));
  } catch (error) {
    Logger.error(`menuTreeBuilder: buildChildren -> ${String(error)}`);
    return undefined;
  }
};

export const buildRecursiveMenuTree = (
  items?: readonly PageMenu[],
): MenuItem[] | undefined => {
  try {
    if (!items) {
      return undefined;
    }

    const segmented = segmentItemsByType(items);
    const rootMenuItems = buildRootItems(segmented.rootMenus);

    const menuTree = rootMenuItems.map((rootItem) => {
      const children = buildChildren(rootItem.id, segmented, items);
      return children ? { ...rootItem, items: children } : rootItem;
    });

    const result = [
      ...menuTree,
      ...buildOrphans(segmented.menus),
      ...buildOrphans(segmented.pages),
    ];

    return result.length > 0 ? result : undefined;
  } catch (error) {
    Logger.error(`menuTreeBuilder: buildRecursiveMenuTree -> ${String(error)}`);
    return undefined;
  }
};

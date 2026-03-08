import type { MenuItem, PageMenu, Parent } from '@site8/shared';

import { mapPageMenuToMenuItem } from './mapPageMenuToMenuItem.js';

export type SegmentedItems = {
  readonly menus: readonly PageMenu[];
  readonly pages: readonly PageMenu[];
  readonly rootMenus: readonly PageMenu[];
};

export const DEFAULT_PARENT: Parent = {
  id: 0,
  seq: 0,
  sortBy: 'name',
};

const toSlug = (value: string): string =>
  value.toLowerCase().replace(/\s+/g, '-');

export const getSortBy = (
  parentId: number,
  allItems: readonly PageMenu[],
): 'name' | 'seq' => {
  const parent = allItems.find((item) => item.id === parentId);
  const sortBy = parent?.parentItems?.[0]?.sortBy;
  return sortBy === 'seq' ? 'seq' : 'name';
};

export const sortChildren = (
  children: readonly MenuItem[],
  sortBy: 'name' | 'seq',
): MenuItem[] => {
  if (sortBy === 'seq') {
    return children.toSorted(
      (a, b) => (a.parentItem?.seq ?? 0) - (b.parentItem?.seq ?? 0),
    );
  }

  return children.toSorted((a, b) =>
    (a.title ?? '').localeCompare(b.title ?? ''),
  );
};

export const constructUrl = (
  item: PageMenu,
  parentItem?: PageMenu,
): string | undefined => {
  if (item.type === 'root') {
    return `/${toSlug(item.title)}`;
  }

  if (item.type === 'page' && parentItem) {
    return `/${toSlug(parentItem.title)}/${toSlug(item.title)}`;
  }

  return item.url;
};

export const mapChildrenByParent = (
  parentId: number,
  candidates: readonly PageMenu[],
  mapFn: (item: PageMenu, parent: Parent) => MenuItem,
): MenuItem[] => {
  return candidates.flatMap(
    (item) =>
      item.parentItems
        ?.filter((parent) => parent.id === parentId)
        .map((parent) => mapFn(item, parent)) ?? [],
  );
};

export const segmentItemsByType = (
  items: readonly PageMenu[],
): SegmentedItems => {
  const grouped = Object.groupBy(items, (item) => item.type);

  return {
    menus: grouped.menu ?? [],
    pages: grouped.page ?? [],
    rootMenus: grouped.root ?? [],
  };
};

export const buildRootItems = (rootMenus: readonly PageMenu[]): MenuItem[] => {
  return rootMenus
    .map((item) => {
      const url = constructUrl(item);
      return mapPageMenuToMenuItem(
        item,
        item.parentItems?.[0] ?? DEFAULT_PARENT,
        url,
      );
    })
    .toSorted((a, b) => (a.title ?? '').localeCompare(b.title ?? ''));
};

export const buildOrphans = (items: readonly PageMenu[]): MenuItem[] => {
  return items
    .filter((item) => !item.parentItems || item.parentItems.length === 0)
    .map((item) => mapPageMenuToMenuItem(item, DEFAULT_PARENT, undefined));
};

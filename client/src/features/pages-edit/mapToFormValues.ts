import type { MenuItem } from '@shared/types/MenuItem';

export const mapToFormValues = (items: MenuItem[]) =>
  items.map(({ id, lineId, name, parentItem, type }) => ({
    id,
    lineId,
    name,
    parentId:
      typeof parentItem.id === 'string'
        ? Number.parseInt(parentItem.id, 10)
        : parentItem.id,
    parentSeq: String(parentItem.seq),
    parentSortby: parentItem.sortby ?? '',
    type,
  }));

import type { MenuItem } from '@types';

export const mapToFormValues = (items: Iterable<MenuItem>) =>
  Array.from(items).map(({ id, lineId, name, parentItem, type }) => ({
    id,
    lineId: lineId ?? 0,
    name,
    parentId:
      parentItem && typeof parentItem.id === 'string'
        ? Number.parseInt(parentItem.id, 10)
        : (parentItem?.id ?? 0),
    parentSeq: String(parentItem?.seq ?? 0),
    parentSortby: parentItem?.sortBy ?? '',
    type,
  }));

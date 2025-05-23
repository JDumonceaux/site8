import type { MenuItem } from 'types/MenuItem';

export const mapToFormValues = (items: MenuItem[]) =>
  items.map(({ id, lineId, name, parentItem, type }) => ({
    id,
    lineId,
    name,
    parentId: parentItem.id.toString(),
    parentSeq: parentItem.seq.toString(),
    parentSortby: parentItem.sortby ?? '',
    type,
  }));

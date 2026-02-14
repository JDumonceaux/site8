type ItemWithId = {
  readonly id: number;
};

export const getItemsArray = <TItem>(data: unknown): TItem[] => {
  const maybeItems = (data as { items?: TItem[] }).items;
  return Array.isArray(maybeItems) ? maybeItems : [];
};

export const getNextIdFromItems = (items: readonly ItemWithId[]): number => {
  if (items.length === 0) {
    return 1;
  }

  const maxId = Math.max(...items.map((item) => item.id));
  return maxId + 1;
};

export const findDuplicateIds = (items: readonly ItemWithId[]): string[] => {
  const allIds = items.map((item) => item.id.toString());
  const duplicates = allIds.filter(
    (id, index, arr) => arr.indexOf(id) !== index,
  );

  return [...new Set(duplicates)].filter((id) => id !== '');
};

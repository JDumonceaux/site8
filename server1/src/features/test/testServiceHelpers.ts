import type { Test, TestFile } from '../../types/TestFile.js';

const getLastUpdated = (): string => {
  return new Date().toISOString().split('T')[0] ?? '';
};

export const hasGroupsAndItems = (testFile: TestFile): boolean => {
  return Boolean(testFile.items && testFile.groups);
};

export const hasItems = (testFile: TestFile): boolean => {
  return Boolean(testFile.items);
};

export const groupExists = (testFile: TestFile, groupId: number): boolean => {
  return Boolean(testFile.groups?.some((group) => group.id === groupId));
};

export const getNewItemId = (testFile: TestFile): number => {
  const items = testFile.items ?? [];
  let maxId = 0;
  for (const item of items) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  }
  return maxId + 1;
};

export const withUpdatedMetadata = (testFile: TestFile): TestFile => {
  return {
    ...testFile,
    metadata: {
      ...testFile.metadata,
      lastUpdated: getLastUpdated(),
    },
  };
};

export const addItemToFile = (
  testFile: TestFile,
  itemData: Omit<Test, 'id'>,
  groupId: number,
): { file: TestFile; newId: number } => {
  const newId = getNewItemId(testFile);

  const newItem: Test = {
    ...itemData,
    groupId,
    id: newId,
  };

  const file = withUpdatedMetadata({
    ...testFile,
    items: [...(testFile.items ?? []), newItem],
  });

  return { file, newId };
};

export const removeItemFromFile = (
  testFile: TestFile,
  itemId: number,
): null | TestFile => {
  const items = testFile.items ?? [];
  const itemIndex = items.findIndex((item) => item.id === itemId);
  if (itemIndex === -1) {
    return null;
  }

  const updatedItems = [
    ...items.slice(0, itemIndex),
    ...items.slice(itemIndex + 1),
  ];
  return withUpdatedMetadata({
    ...testFile,
    items: updatedItems,
  });
};

export const findItemIndex = (testFile: TestFile, itemId: number): number => {
  const items = testFile.items ?? [];
  return items.findIndex((item) => item.id === itemId);
};

export const buildUpdatedItem = (
  existingItem: Test,
  updatedData: Partial<Test>,
  newGroupId: number,
): Test => {
  return {
    ...existingItem,
    comments: updatedData.comments ?? existingItem.comments,
    groupId: newGroupId,
    name: updatedData.name ?? existingItem.name,
    tags: updatedData.tags ?? existingItem.tags,
  };
};

export const updateItemInFile = (
  testFile: TestFile,
  itemIndex: number,
  updatedItem: Test,
): TestFile => {
  const items = [...(testFile.items ?? [])];
  items[itemIndex] = updatedItem;

  return withUpdatedMetadata({
    ...testFile,
    items,
  });
};

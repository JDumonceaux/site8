import type {
  Test as TestFileItem,
  TestGroup as TestFileGroup,
  TestSection as TestFileSection,
} from '../../types/TestFile.js';
import type { Test, TestGroup, TestSection } from '@site8/shared';

export const buildPopulatedGroups = (
  fileItems: readonly TestFileItem[],
  groupsWithUnknown: readonly TestFileGroup[],
  items: readonly Test[],
  itemGroupIds: Map<number, number>,
): TestGroup[] => {
  const itemsMap = new Map<number, Test>();
  for (const item of items) {
    itemsMap.set(item.id, item);
  }

  const populatedGroups: TestGroup[] = [];

  for (const group of groupsWithUnknown) {
    const groupItems: Test[] = [];

    for (const fileItem of fileItems) {
      const groupItem = itemsMap.get(fileItem.id);
      if (groupItem && itemGroupIds.get(fileItem.id) === group.id) {
        groupItems.push(groupItem);
      }
    }

    if (groupItems.length === 0) {
      continue;
    }

    populatedGroups.push({
      comments: group.comments,
      id: group.id,
      items: groupItems,
      name: group.name,
      tags: group.tags ? [...group.tags] : undefined,
    });
  }

  return populatedGroups;
};

export const buildSections = (
  sectionsWithUnknown: readonly TestFileSection[],
  groupsWithUnknown: readonly TestFileGroup[],
  populatedGroups: readonly TestGroup[],
): TestSection[] => {
  const groupSectionMap = new Map<number, number>();
  for (const group of groupsWithUnknown) {
    if (typeof group.sectionId === 'number') {
      groupSectionMap.set(group.id, group.sectionId);
    }
  }

  const sections: TestSection[] = [];

  for (const section of sectionsWithUnknown) {
    const groupsForSection: TestGroup[] = [];

    for (const group of populatedGroups) {
      if (groupSectionMap.get(group.id) === section.id) {
        groupsForSection.push({ ...group });
      }
    }

    if (groupsForSection.length === 0) {
      continue;
    }

    sections.push({
      description: section.description,
      groups: groupsForSection,
      id: section.id,
      name: section.name,
    });
  }

  return sections;
};

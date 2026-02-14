import type {
  Test as TestFileItem,
  TestFile,
  TestGroup as TestFileGroup,
  TestSection as TestFileSection,
} from '../../types/TestFile.js';
import type { Test } from '@site8/shared';

export const mapTests = (fileItems: readonly TestFileItem[]): Test[] => {
  return fileItems.map((item) => ({
    code: item.code,
    comments: item.comments,
    id: item.id,
    name: item.name,
    tags: item.tags ? [...item.tags] : undefined,
  }));
};

export const ensureUnknownGroupAndSection = (
  testFile: TestFile,
): {
  groupsWithUnknown: TestFileGroup[];
  sectionsWithUnknown: TestFileSection[];
  unknownGroupId: number;
} => {
  const sectionsWithUnknown = [...testFile.sections];
  const groupsWithUnknown = [...testFile.groups];

  const unknownSection = sectionsWithUnknown.find(
    (section) => (section.name ?? '').toLowerCase() === 'unknown',
  );

  const unknownSectionId = unknownSection
    ? unknownSection.id
    : Math.max(0, ...sectionsWithUnknown.map((section) => section.id)) + 1;

  if (!unknownSection) {
    sectionsWithUnknown.push({
      id: unknownSectionId,
      name: 'Unknown',
    });
  }

  const unknownGroup = groupsWithUnknown.find(
    (group) => (group.name ?? '').toLowerCase() === 'unknown',
  );

  const unknownGroupId = unknownGroup
    ? unknownGroup.id
    : Math.max(0, ...groupsWithUnknown.map((group) => group.id)) + 1;

  if (!unknownGroup) {
    groupsWithUnknown.push({
      id: unknownGroupId,
      name: 'Unknown',
      sectionId: unknownSectionId,
    });
  }

  return {
    groupsWithUnknown,
    sectionsWithUnknown,
    unknownGroupId,
  };
};

export const mapItemGroupIds = (
  fileItems: readonly TestFileItem[],
  groupsWithUnknown: readonly TestFileGroup[],
  unknownGroupId: number,
): Map<number, number> => {
  const groupIds = new Set<number>(groupsWithUnknown.map((group) => group.id));
  const itemGroupIds = new Map<number, number>();

  for (const fileItem of fileItems) {
    const groupId = groupIds.has(fileItem.groupId)
      ? fileItem.groupId
      : unknownGroupId;
    itemGroupIds.set(fileItem.id, groupId);
  }

  return itemGroupIds;
};

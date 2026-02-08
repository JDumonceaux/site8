import type { TestFile } from '../../types/TestFile.js';
import type {
  Collection,
  Test,
  TestGroup,
  Tests,
  TestSection,
} from '@site8/shared';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import { getFileService } from '../../utils/ServiceFactory.js';

const FILTER_TAG = 'code';

export class TestsService extends BaseDataService<TestFile> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('tests.json'),
    });
  }

  public async getCollection(): Promise<Collection<Test>> {
    const data = await this.readFile();
    return {
      items: [...data.items] as Test[],
      metadata: data.metadata,
    };
  }

  public async getTests(): Promise<Collection<Test>> {
    try {
      const data = await this.readFile();
      const items = data.items
        .map((item) => ({
          code: item.code,
          comments: item.comments,
          id: item.id,
          name: item.name,
          tags: item.tags ? [...item.tags] : undefined,
        }))
        .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));

      return {
        items,
        metadata: data.metadata,
      };
    } catch (error) {
      Logger.error(`TestsService: getTests --> Error: ${String(error)}`);
      throw error;
    }
  }

  public async getTestsData(): Promise<Tests> {
    try {
      const rawData = await this.readFile();

      // Return Tests structure with sections (empty for now since we don't have section mapping)
      return {
        metadata: rawData.metadata,
        sections: [],
      };
    } catch (error) {
      Logger.error(`TestsService: getTestsData --> Error: ${String(error)}`);
      throw error;
    }
  }

  /**
   * Get tests grouped and sorted alphabetically
   */
  public async getTestsSorted(): Promise<Tests> {
    try {
      const fileService = getFileService();
      const testFile: TestFile = await fileService.readFile<TestFile>(
        FilePath.getDataDir('tests.json'),
      );

      if (!testFile.items || !testFile.groups || !testFile.sections) {
        return {
          metadata: {
            title: testFile.metadata?.title ?? '',
          },
          sections: [],
        };
      }

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

      // Map all items to Test type
      const items: Test[] = testFile.items.map(
        (item: (typeof testFile.items)[number]) => ({
          code: item.code,
          comments: item.comments,
          id: item.id,
          name: item.name,
          tags: item.tags ? [...item.tags] : undefined,
        }),
      );

      const groupIds = new Set<number>(
        groupsWithUnknown.map((group) => group.id),
      );
      const itemGroupIds = new Map<number, number>();
      for (const fileItem of testFile.items) {
        const groupId = groupIds.has(fileItem.groupId)
          ? fileItem.groupId
          : unknownGroupId;
        itemGroupIds.set(fileItem.id, groupId);
      }

      if (items.length === 0) {
        return {
          metadata: {
            title: testFile.metadata?.title ?? FILTER_TAG,
            totalItems: 0,
          },
          sections: [],
        };
      }

      // Create a map of item id to Test for quick lookup
      const itemsMap = new Map<number, Test>();
      for (const item of items) {
        itemsMap.set(item.id, item);
      }

      // Build groups with items from the flat structure
      const populatedGroups: TestGroup[] = [];

      for (const group of groupsWithUnknown) {
        // Find all items that belong to this group
        const groupItems: Test[] = [];

        for (const fileItem of testFile.items) {
          // Check if this item is in our items and belongs to this group
          const groupItem = itemsMap.get(fileItem.id);
          if (groupItem && itemGroupIds.get(fileItem.id) === group.id) {
            groupItems.push(groupItem);
          }
        }

        // Only include groups that have items
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

      // Build sections with groups
      const sections: TestSection[] = [];

      for (const section of sectionsWithUnknown) {
        const groupsForSection: TestGroup[] = [];

        // Find groups that reference this section
        for (const group of populatedGroups) {
          const fileGroup = groupsWithUnknown.find(
            (g: (typeof groupsWithUnknown)[number]) => g.id === group.id,
          );
          if (!fileGroup) continue;

          if (fileGroup.sectionId === section.id) {
            groupsForSection.push({
              ...group,
            });
          }
        }

        if (groupsForSection.length === 0) {
          continue;
        }

        // Sort groups by name
        groupsForSection.sort((a, b) =>
          (a.name ?? '').localeCompare(b.name ?? ''),
        );

        sections.push({
          description: section.description,
          groups: groupsForSection,
          id: section.id,
          name: section.name,
        });
      }

      // Sort sections by name
      sections.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));

      // Sort groups within each section by name
      for (const section of sections) {
        if (section.groups) {
          section.groups.sort((a, b) => {
            return (a.name ?? '').localeCompare(b.name ?? '');
          });

          // Sort items within each group by name
          for (const group of section.groups) {
            if (group.items) {
              group.items.sort((a, b) =>
                (a.name ?? '').localeCompare(b.name ?? ''),
              );
            }
          }
        }
      }

      return {
        metadata: {
          title: testFile.metadata?.title ?? FILTER_TAG,
          totalItems: items.length,
        },
        sections,
      };
    } catch (error) {
      Logger.error(`TestsService: getTestsSorted --> Error: ${String(error)}`);
      throw error;
    }
  }
}

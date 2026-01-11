import type { TestFile } from '../../types/TestFile.js';
import type { Test, TestGroup, Tests, TestSection } from '@site8/shared';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import { getFileService } from '../../utils/ServiceFactory.js';

const FILTER_TAG = 'code';

/**
 * Service for retrieving AI-tagged tests grouped and sorted alphabetically
 */
export class TestsAiService extends BaseDataService<Tests> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('tests.json'),
    });
  }

  public override async getItems(): Promise<Tests> {
    try {
      const fileService = getFileService();
      const testFile: TestFile = await fileService.readFile<TestFile>(
        FilePath.getDataDir('tests.json'),
      );

      if (!testFile.items || !testFile.groups || !testFile.sections) {
        return {
          metadata: {
            title: testFile.metadata?.title ?? FILTER_TAG,
          },
          sections: [],
        };
      }

      // Filter items with 'code' tag and map to Test type
      const aiItems: Test[] = testFile.items
        .filter((item) => {
          const { tags } = item;
          return Array.isArray(tags) && tags.includes(FILTER_TAG);
        })
        .map((item) => ({
          code: item.code,
          comments: undefined,
          id: item.id,
          name: item.name,
          seq: item.seq,
          tags: item.tags ? [...item.tags] : undefined,
        }));

      if (aiItems.length === 0) {
        return {
          metadata: {
            title: testFile.metadata?.title ?? FILTER_TAG,
            totalGroups: 0,
            totalItems: 0,
          },
          sections: [],
        };
      }

      // Create a map of item id to Test for quick lookup
      const itemsMap = new Map<number, Test>();
      for (const item of aiItems) {
        itemsMap.set(item.id, item);
      }

      // Build groups with items from the flat structure
      const populatedGroups: TestGroup[] = [];

      for (const group of testFile.groups) {
        // Find all AI items that belong to this group
        const groupItems: Test[] = [];

        for (const fileItem of testFile.items) {
          // Check if this item is in our AI items and belongs to this group
          const aiItem = itemsMap.get(fileItem.id);
          if (aiItem && fileItem.groupIds) {
            const groupRef = fileItem.groupIds.find(
              (ref) => ref.id === group.id,
            );
            if (groupRef) {
              groupItems.push({
                ...aiItem,
                seq: groupRef.seq,
              });
            }
          }
        }

        // Only include groups that have AI items
        if (groupItems.length === 0) {
          continue;
        }

        // Sort items by seq
        groupItems.sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0));

        populatedGroups.push({
          comments: group.comments,
          id: group.id,
          items: groupItems,
          name: group.name,
          seq: undefined,
          tags: group.tags ? [...group.tags] : undefined,
        });
      }

      // Build sections with groups
      const sections: TestSection[] = [];

      for (const section of testFile.sections) {
        const groupsForSection: TestGroup[] = [];

        // Find groups that reference this section
        for (const group of populatedGroups) {
          const fileGroup = testFile.groups.find((g) => g.id === group.id);
          if (!fileGroup) continue;

          const sectionRef = fileGroup.sectionIds.find(
            (ref) => ref.id === section.id,
          );
          if (sectionRef) {
            groupsForSection.push({
              ...group,
              seq: sectionRef.seq,
            });
          }
        }

        if (groupsForSection.length === 0) {
          continue;
        }

        // Sort groups by seq
        groupsForSection.sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0));

        sections.push({
          description: section.description,
          groups: groupsForSection,
          id: section.id,
          name: section.name,
        });
      }

      return {
        metadata: {
          title: testFile.metadata?.title ?? FILTER_TAG,
          totalGroups: sections.length,
          totalItems: aiItems.length,
        },
        sections,
      };
    } catch (error) {
      Logger.error(`TestsAiService: getItems --> Error: ${String(error)}`);
      throw error;
    }
  }
}

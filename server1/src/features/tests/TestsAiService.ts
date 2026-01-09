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
          items: [],
          metadata: {
            title: testFile.metadata?.title ?? FILTER_TAG,
          },
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
          items: [],
          metadata: {
            title: testFile.metadata?.title ?? FILTER_TAG,
            totalGroups: 0,
            totalItems: 0,
          },
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
        // Skip groups without 'code' tag
        if (!group.tags?.includes(FILTER_TAG)) {
          continue;
        }

        // Find all items that belong to this group
        // Based on the file structure, we need to determine group membership differently
        // For now, we'll collect all AI items and distribute them to groups later

        populatedGroups.push({
          comments: group.comments,
          id: group.id,
          items: undefined, // Will be populated based on section relationships
          name: group.name,
          seq: undefined,
          tags: group.tags ? [...group.tags] : undefined,
        });
      }

      // Build sections with groups
      const sections: TestSection[] = [];

      for (const section of testFile.sections) {
        const groupsForSection: { item: TestGroup; seq: number }[] = [];

        // Find groups that reference this section
        for (const group of populatedGroups) {
          const fileGroup = testFile.groups.find((g) => g.id === group.id);
          if (!fileGroup) continue;

          const sectionRef = fileGroup.sectionIds.find(
            (ref) => ref.id === section.id,
          );
          if (sectionRef) {
            groupsForSection.push({
              item: group,
              seq: sectionRef.seq,
            });
          }
        }

        if (groupsForSection.length === 0) {
          continue;
        }

        // Sort groups by seq
        groupsForSection.sort((a, b) => a.seq - b.seq);

        sections.push({
          description: section.description,
          groups: groupsForSection,
          id: section.id,
          name: section.name,
        });
      }

      return {
        items: sections,
        metadata: {
          title: testFile.metadata?.title ?? FILTER_TAG,
          totalGroups: sections.length,
          totalItems: aiItems.length,
        },
      };
    } catch (error) {
      Logger.error(`TestsAiService: getItems --> Error: ${String(error)}`);
      throw error;
    }
  }
}

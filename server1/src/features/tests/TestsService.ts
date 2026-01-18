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

  /**
   * Get AI-tagged tests grouped and sorted alphabetically
   */
  public async getAiTests(): Promise<Tests> {
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

      // Map all items to Test type
      const aiItems: Test[] = testFile.items.map(
        (item: (typeof testFile.items)[number]) => ({
          code: item.code,
          comments: item.comments,
          id: item.id,
          name: item.name,
          seq: item.seq,
          tags: item.tags ? [...item.tags] : undefined,
        }),
      );

      if (aiItems.length === 0) {
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
              (ref: (typeof fileItem.groupIds)[number]) => ref.id === group.id,
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
          const fileGroup = testFile.groups.find(
            (g: (typeof testFile.groups)[number]) => g.id === group.id,
          );
          if (!fileGroup) continue;

          const sectionRef = fileGroup.sectionIds.find(
            (ref: (typeof fileGroup.sectionIds)[number]) =>
              ref.id === section.id,
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

      // Sort sections by seq, then name
      sections.sort((a, b) => {
        const seqDiff = (a.seq ?? 0) - (b.seq ?? 0);
        if (seqDiff !== 0) return seqDiff;
        return (a.name ?? '').localeCompare(b.name ?? '');
      });

      // Sort groups within each section by seq, then name
      for (const section of sections) {
        if (section.groups) {
          section.groups.sort((a, b) => {
            const seqDiff = (a.seq ?? 0) - (b.seq ?? 0);
            if (seqDiff !== 0) return seqDiff;
            return (a.name ?? '').localeCompare(b.name ?? '');
          });

          // Sort items within each group by seq, then name
          for (const group of section.groups) {
            if (group.items) {
              group.items.sort((a, b) => {
                const seqDiff = (a.seq ?? 0) - (b.seq ?? 0);
                if (seqDiff !== 0) return seqDiff;
                return (a.name ?? '').localeCompare(b.name ?? '');
              });
            }
          }
        }
      }

      return {
        metadata: {
          title: testFile.metadata?.title ?? FILTER_TAG,
          totalItems: aiItems.length,
        },
        sections,
      };
    } catch (error) {
      Logger.error(`TestsService: getAiTests --> Error: ${String(error)}`);
      throw error;
    }
  }

  public async getCollection(): Promise<Collection<Test>> {
    const data = await this.readFile();
    return {
      items: [...data.items] as Test[],
      metadata: data.metadata,
    };
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
}

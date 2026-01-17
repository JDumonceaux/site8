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
            title: testFile.metadata?.title ?? '',
          },
          sections: [],
        };
      }

      // Map all items to Test type
      const aiItems: Test[] = testFile.items.map((item) => ({
        code: item.code,
        comments: item.comments,
        id: item.id,
        name: item.name,
        seq: item.seq,
        tags: item.tags ? [...item.tags] : undefined,
      }));

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
      Logger.error(`TestsAiService: getItems --> Error: ${String(error)}`);
      throw error;
    }
  }

  /**
   * Updates AI-tagged test items with new data
   * Updates names, comments, tags, and reorders items based on seq values
   * IDs remain immutable
   *
   * @param updatedData - The updated Tests data structure
   * @returns Promise<boolean> - true if successful, false otherwise
   */
  public async updateItems(updatedData: Tests): Promise<boolean> {
    try {
      Logger.info('TestsAiService: updateItems: Starting update process');

      const fileService = getFileService();
      const testFile: TestFile = await fileService.readFile<TestFile>(
        FilePath.getDataDir('tests.json'),
      );

      if (!testFile.items || !testFile.groups || !testFile.sections) {
        Logger.error('TestsAiService: updateItems: Invalid file structure');
        return false;
      }

      // Create a mutable copy of the test file
      const updatedGroups = testFile.groups.map((g) => ({ ...g }));
      const updatedItems = testFile.items.map((i) => ({ ...i }));
      const updatedSections = testFile.sections.map((s) => ({ ...s }));

      // Process each section
      for (const section of updatedData.sections ?? []) {
        // Process each group in the section
        for (const group of section.groups ?? []) {
          // Update group properties (name, comments)
          const groupIndex = updatedGroups.findIndex((g) => g.id === group.id);
          if (groupIndex !== -1) {
            const existingGroup = updatedGroups[groupIndex];
            if (existingGroup) {
              updatedGroups[groupIndex] = {
                ...existingGroup,
                comments: group.comments,
                name: group.name,
              };
            }
          }

          // Process each item in the group
          for (const item of group.items ?? []) {
            const itemIndex = updatedItems.findIndex((i) => i.id === item.id);

            if (itemIndex !== -1) {
              const existingItem = updatedItems[itemIndex];
              if (!existingItem) continue;

              // Update item properties (name, tags, comments)
              const updatedItem = {
                ...existingItem,
                comments: item.comments,
                name: item.name,
                tags: item.tags ? [...item.tags] : existingItem.tags,
              };

              // Update groupIds to reflect new sequence order
              if (existingItem.groupIds) {
                updatedItem.groupIds = existingItem.groupIds.map((groupRef) => {
                  if (groupRef.id === group.id) {
                    return {
                      id: groupRef.id,
                      seq: item.seq ?? groupRef.seq,
                    };
                  }
                  return groupRef;
                });
              }

              updatedItems[itemIndex] = updatedItem;
            }
          }
        }
      }

      // Create updated test file with mutable arrays
      const updatedTestFile: TestFile = {
        groups: updatedGroups,
        items: updatedItems,
        metadata: {
          ...testFile.metadata,
          lastUpdated: new Date().toISOString().split('T')[0],
        },
        sections: updatedSections,
      };

      // Write the updated file back
      await fileService.writeFile(
        updatedTestFile,
        FilePath.getDataDir('tests.json'),
      );

      // Invalidate cache
      this.invalidateCache();

      Logger.info('TestsAiService: updateItems: Successfully updated items');
      return true;
    } catch (error) {
      Logger.error(`TestsAiService: updateItems --> Error: ${String(error)}`);
      return false;
    }
  }
}

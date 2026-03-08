import type { TestFile } from '../../types/TestFile.js';
import type {
  Collection,
  TestsSection,
  TestsSectionGroup,
} from '@site8/shared';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import { getFileService } from '../../utils/ServiceFactory.js';

/**
 * Service for retrieving all test sections with groups and item counts
 */
export class TestsSectionsService extends BaseDataService<
  Collection<TestsSection>
> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('tests.json'),
    });
  }

  public override async getItems(): Promise<Collection<TestsSection>> {
    try {
      const fileService = getFileService();
      const testFile: TestFile = await fileService.readFile<TestFile>(
        FilePath.getDataDir('tests.json'),
      );

      if (!testFile.sections) {
        return {
          items: [],
          metadata: testFile.metadata,
        };
      }

      // Create a map of group IDs to item counts
      const groupItemCounts = new Map<number, number>();
      if (testFile.items) {
        for (const item of testFile.items) {
          if (item.groupId !== undefined) {
            const currentCount = groupItemCounts.get(item.groupId) ?? 0;
            groupItemCounts.set(item.groupId, currentCount + 1);
          }
        }
      }

      // Create a map of section IDs to section data
      const sectionMap = new Map<
        number,
        {
          description?: string;
          groups: TestsSectionGroup[];
          id: number;
          name: string;
        }
      >();
      for (const section of testFile.sections) {
        sectionMap.set(section.id, {
          description: section.description,
          groups: [],
          id: section.id,
          name: section.name,
        });
      }

      // Track orphaned groups (groups without a valid section)
      const orphanedGroups: TestsSectionGroup[] = [];

      // Map groups to sections with item counts
      if (testFile.groups) {
        for (const group of testFile.groups) {
          const itemCount = groupItemCounts.get(group.id) ?? 0;

          const sectionGroup: TestsSectionGroup = {
            comments: group.comments,
            id: group.id,
            itemCount,
            name: group.name,
            sectionId: group.sectionId,
            sectionName: undefined,
            tags: group.tags ? [...group.tags] : undefined,
          };

          // Try to add to existing section
          if (group.sectionId !== undefined) {
            const section = sectionMap.get(group.sectionId);
            if (section !== undefined) {
              section.groups.push(sectionGroup);
            } else {
              // Section ID exists but no matching section found
              orphanedGroups.push(sectionGroup);
            }
          } else {
            // No section ID defined
            orphanedGroups.push(sectionGroup);
          }
        }
      }

      // Convert map to array and sort sections by name
      const sections: TestsSection[] = Array.from(sectionMap.values()).sort(
        (a, b): number => a.name.localeCompare(b.name),
      );

      // Sort groups within each section by name
      for (const section of sections) {
        section.groups.sort(
          (a: TestsSectionGroup, b: TestsSectionGroup): number =>
            a.name.localeCompare(b.name),
        );
      }

      // If there are orphaned groups, create an "Unknown" section at the end
      if (orphanedGroups.length > 0) {
        orphanedGroups.sort((a, b): number => a.name.localeCompare(b.name));
        sections.push({
          description: 'Groups without a valid section',
          groups: orphanedGroups,
          id: -1,
          name: 'Unknown',
        });
      }

      return {
        items: sections,
        metadata: testFile.metadata,
      };
    } catch (error) {
      Logger.error(
        `TestsSectionsService: getItems --> Error: ${String(error)}`,
      );
      throw error;
    }
  }
}

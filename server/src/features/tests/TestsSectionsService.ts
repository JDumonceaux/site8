import type { Test, TestFile, TestGroup } from '../../types/TestFile.js';
import type {
  Collection,
  TestsSection,
  TestsSectionGroup,
} from '@site8/shared';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import { getFileService } from '../../utils/ServiceFactory.js';

type SectionEntry = {
  description?: string;
  groups: TestsSectionGroup[];
  id: number;
  name: string;
};

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

      const groupItemCounts = this.buildGroupItemCounts(testFile.items);

      // Create a map of section IDs to section data
      const sectionMap = new Map<number, SectionEntry>();
      for (const section of testFile.sections) {
        sectionMap.set(section.id, {
          description: section.description,
          groups: [],
          id: section.id,
          name: section.name,
        });
      }

      const orphanedGroups = this.mapGroupsToSections(
        testFile.groups,
        groupItemCounts,
        sectionMap,
      );

      // Convert map to array and sort sections by name
      const sections: TestsSection[] = [...sectionMap.values()].toSorted(
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

  private buildGroupItemCounts(items: readonly Test[]): Map<number, number> {
    const counts = new Map<number, number>();
    for (const item of items) {
      if (item.groupId !== undefined) {
        counts.set(item.groupId, (counts.get(item.groupId) ?? 0) + 1);
      }
    }
    return counts;
  }

  private mapGroupsToSections(
    groups: readonly TestGroup[],
    groupItemCounts: Map<number, number>,
    sectionMap: Map<number, SectionEntry>,
  ): TestsSectionGroup[] {
    const orphanedGroups: TestsSectionGroup[] = [];
    for (const group of groups) {
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

      const section = sectionMap.get(group.sectionId);
      if (section === undefined) {
        orphanedGroups.push(sectionGroup);
      } else {
        section.groups.push(sectionGroup);
      }
    }
    return orphanedGroups;
  }
}

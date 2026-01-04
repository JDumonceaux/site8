import type { Test, Tests } from '@site8/shared';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';

type GroupedTest = Test & {
  readonly groupName?: string;
};

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
      const rawData = await this.readFile();

      if (!rawData.items) {
        return rawData;
      }

      // Filter items with 'ai' tag
      const aiItems = rawData.items.filter(
        (item): item is Test =>
          Array.isArray(item.tags) && item.tags.includes('ai'),
      );

      if (aiItems.length === 0) {
        return { ...rawData, items: [] };
      }

      // Create a map of group IDs to group names
      const groupMap = new Map<number, string>();
      if (rawData.groups) {
        for (const group of rawData.groups) {
          groupMap.set(group.id, group.name);
        }
      }

      // Add group names to items
      const itemsWithGroups: GroupedTest[] = aiItems.map((item) => {
        const groupId =
          Array.isArray(item.groupIds) && item.groupIds.length > 0
            ? item.groupIds[0]
            : undefined;
        const groupName =
          typeof groupId === 'number' ? groupMap.get(groupId) : undefined;
        return { ...item, groupName };
      });

      // Sort items: first by group name, then alphabetically by name within groups
      const sortedItems = itemsWithGroups.toSorted((a, b) => {
        // Compare group names first (undefined groups go last)
        const groupA = a.groupName ?? '';
        const groupB = b.groupName ?? '';
        const groupComparison = groupA.localeCompare(groupB);

        if (groupComparison !== 0) {
          return groupComparison;
        }

        // Within same group, sort alphabetically by name
        const nameA = a.name;
        const nameB = b.name;
        return nameA.localeCompare(nameB);
      });

      return {
        ...rawData,
        items: sortedItems as Test[],
      };
    } catch (error) {
      Logger.error(`TestsAiService: getItems --> Error: ${String(error)}`);
      throw error;
    }
  }
}

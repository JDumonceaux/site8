import type { TestFile } from '../../types/TestFile.js';
import type { TestGroup } from '@site8/shared';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import { getFileService } from '../../utils/ServiceFactory.js';

type TestGroupsResponse = {
  readonly groups: TestGroup[];
};

/**
 * Service for retrieving all test groups
 */
export class TestsGroupsService extends BaseDataService<TestGroupsResponse> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('tests.json'),
    });
  }

  public override async getItems(): Promise<TestGroupsResponse> {
    try {
      const fileService = getFileService();
      const testFile: TestFile = await fileService.readFile<TestFile>(
        FilePath.getDataDir('tests.json'),
      );

      if (!testFile.groups) {
        return {
          groups: [],
        };
      }

      // Create a map of section IDs to section names for quick lookup
      const sectionMap = new Map<number, string>();
      if (testFile.sections) {
        for (const section of testFile.sections) {
          sectionMap.set(section.id, section.name);
        }
      }

      // Map groups to TestGroup type with section information and sort by section name, then group name
      const groups: TestGroup[] = testFile.groups
        .map((group) => {
          const sectionName = sectionMap.get(group.sectionId) ?? 'Unknown';

          return {
            comments: group.comments,
            id: group.id,
            name: group.name,
            sectionId: group.sectionId,
            sectionName,
            tags: group.tags ? [...group.tags] : undefined,
          };
        })
        .sort((a, b) => {
          // Sort by section name first (Unknown sections go to the end)
          const sectionA = a.sectionName;
          const sectionB = b.sectionName;

          // Put "Unknown" sections at the end
          if (sectionA === 'Unknown' && sectionB !== 'Unknown') {
            return 1;
          }
          if (sectionA !== 'Unknown' && sectionB === 'Unknown') {
            return -1;
          }

          const sectionCompare = sectionA.localeCompare(sectionB);

          // If sections are the same, sort by group name
          if (sectionCompare === 0) {
            return a.name.localeCompare(b.name);
          }

          return sectionCompare;
        });

      return {
        groups,
      };
    } catch (error) {
      Logger.error(`TestsGroupsService: getItems --> Error: ${String(error)}`);
      throw error;
    }
  }
}

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

      // Map groups to TestGroup type and sort by name
      const groups: TestGroup[] = testFile.groups
        .map((group) => ({
          comments: group.comments,
          id: group.id,
          name: group.name,
          tags: group.tags ? [...group.tags] : undefined,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      return {
        groups,
      };
    } catch (error) {
      Logger.error(`TestsGroupsService: getItems --> Error: ${String(error)}`);
      throw error;
    }
  }
}

import type { TestFile } from '../../types/TestFile.js';
import type { Collection, Test, Tests } from '@site8/shared';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import { getFileService } from '../../utils/ServiceFactory.js';

import {
  buildPopulatedGroups,
  buildSections,
  ensureUnknownGroupAndSection,
  mapItemGroupIds,
  mapTests,
  sortSectionsAndGroups,
} from './testsSortBuilders.js';

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

      const { groupsWithUnknown, unknownGroupId, sectionsWithUnknown } =
        ensureUnknownGroupAndSection(testFile);

      const items = mapTests(testFile.items);
      const itemGroupIds = mapItemGroupIds(
        testFile.items,
        groupsWithUnknown,
        unknownGroupId,
      );

      if (items.length === 0) {
        return {
          metadata: {
            title: testFile.metadata?.title ?? FILTER_TAG,
            totalItems: 0,
          },
          sections: [],
        };
      }

      const populatedGroups = buildPopulatedGroups(
        testFile.items,
        groupsWithUnknown,
        items,
        itemGroupIds,
      );

      const sections = buildSections(
        sectionsWithUnknown,
        groupsWithUnknown,
        populatedGroups,
      );

      sortSectionsAndGroups(sections);

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

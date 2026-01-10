import type { Collection, Test, Tests } from '@site8/shared';
import type { TestFile } from '../../types/TestFile.js';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';

type ExpandedTest = Test & {
  readonly parentId: number;
  readonly parentSeq: number;
};

export class TestsService extends BaseDataService<TestFile> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('tests.json'),
    });
  }

  public async getTestsData(): Promise<Tests> {
    try {
      const rawData = await this.readFile();

      const expanded: ExpandedTest[] =
        rawData.items?.map((item) => ({
          ...item,
          tags: item.tags ? [...item.tags] : undefined,
          parentId: 0,
          parentSeq: 0,
        })) ?? [];

      const items = this.sortItems(expanded);

      // Cast back to Test[] for return type compatibility
      return { ...rawData, items: items as unknown as Test[] };
    } catch (error) {
      Logger.error(`TestsService: getTestsData --> Error: ${String(error)}`);
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

  private sortItems(items: readonly ExpandedTest[]): readonly ExpandedTest[] {
    if (!items.length) {
      return [];
    }

    return items.toSorted((a, b) => {
      const parentDiff = a.parentId - b.parentId;
      return parentDiff !== 0 ? parentDiff : a.parentSeq - b.parentSeq;
    });
  }
}

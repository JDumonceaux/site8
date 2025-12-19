import type { Test } from '../../types/Test.js';
import type { Tests } from '../../types/Tests.js';

// eslint-disable-next-line import/no-cycle
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import FilePath from '../files/FilePath.js';

type ExpandedTest = Test & {
  readonly parentId: number;
  readonly parentSeq: number;
};

export class TestsService extends BaseDataService<Tests> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('tests.json'),
      serviceName: 'TestsService',
    });
  }

  public async getItems(): Promise<Tests | undefined> {
    try {
      const rawData = await this.readFile();

      const expanded: ExpandedTest[] =
        rawData.items?.flatMap((item) => {
          if (item.parentItems) {
            return item.parentItems.map((parent) => ({
              ...item,
              parentId: parent.id,
              parentSeq: parent.seq,
            }));
          }
          return [{ ...item, parentId: 0, parentSeq: 0 }];
        }) ?? [];

      const items = this.sortItems(expanded);

      return { ...rawData, items: [...items] };
    } catch (error) {
      Logger.error(`TestsService: getItems --> Error: ${String(error)}`);
      return undefined;
    }
  }

  private sortItems(items: readonly ExpandedTest[]): readonly ExpandedTest[] {
    if (!items.length) {
      return [];
    }

    return [...items].sort((a, b) => {
      const parentDiff = a.parentId - b.parentId;
      return parentDiff !== 0 ? parentDiff : a.parentSeq - b.parentSeq;
    });
  }
}

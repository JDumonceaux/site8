import type { Test, Tests } from '@site8/shared';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';

type ExpandedTest = Omit<Test, 'parentId'> & {
  readonly parentId: number;
  readonly parentSeq: number;
};

export class TestsService extends BaseDataService<Tests> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('tests.json'),
    });
  }

  public override async getItems(): Promise<Tests> {
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

      // Cast back to Test[] for return type compatibility
      return { ...rawData, items: items as unknown as Test[] };
    } catch (error) {
      Logger.error(`TestsService: getItems --> Error: ${String(error)}`);
      throw error;
    }
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

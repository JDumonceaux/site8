import { readFile } from 'fs/promises';
import FilePath from '../files/FilePath.js';
import { Logger } from '../../lib/utils/logger.js';
import { Test } from '../../types/Test.js';
import { Tests } from '../../types/Tests.js';

export class TestsService {
  private sortItems(items: readonly Test[]): readonly Test[] {
    if (!items?.length) {
      return [];
    }

    return [...items].sort((a, b) => {
      const parentDiff = a.parentId - b.parentId;
      return parentDiff !== 0 ? parentDiff : a.parentSeq - b.parentSeq;
    });
  }

  public async getItems(): Promise<Tests | undefined> {
    try {
      const fileName = 'tests.json';
      const filePath = FilePath.getDataDir(fileName);

      const data = await readFile(filePath, { encoding: 'utf8' });
      const rawData = JSON.parse(data) as Tests;

      const expanded: Test[] =
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

      return { ...rawData, items };
    } catch (error) {
      Logger.error(`TestsService: getItems --> Error: ${error}`);
      return undefined;
    }
  }
}

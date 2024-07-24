import { readFile } from 'fs/promises';
import { getFilePath } from '../lib/utils/getFilePath.js';
import { Logger } from '../lib/utils/logger.js';
import { Test } from '../types/Test.js';
import { Tests } from '../types/Tests.js';

export class TestsService {
  private async sortItems(items: Test[]) {
    try {
      if (!items) {
        return undefined;
      }

      // const sorted = items.sort(function (a, b) {
      //   return a.parentId - b.parentId || a.parentSeq - b.parentSeq;
      // });
      // return sorted;
      return items;
    } catch (error) {
      Logger.error(`TestsService: sortItems:  --> Error: ${error}`);
      return undefined;
    }
  }

  public async getItems(): Promise<Tests | undefined> {
    try {
      const fileName = 'tests.json';
      const filePath = getFilePath(fileName);

      const data = await readFile(filePath, { encoding: 'utf8' });

      const rawData = JSON.parse(data) as Tests;

      const expanded: Test[] =
        rawData.items?.flatMap((item) => {
          if (item.parentItems) {
            return item?.parentItems?.map((parent) => ({
              ...item,
              parentId: parent.id,
              parentSeq: parent.seq,
            }));
          } else {
            return [{ ...item, parentId: 0, parentSeq: 0 }];
          }
        }) || [];

      const items = await this.sortItems(expanded);
      return { ...rawData, items };
    } catch (error) {
      Logger.error(`TestsService: getItems:  --> Error: ${error}`);
      return undefined;
    }
  }
}

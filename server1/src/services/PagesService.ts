import { readFile, writeFile } from 'fs/promises';

import { Logger } from '../utils/Logger.js';
import { getFilePath } from '../utils/getFilePath.js';

import { Pages } from '../types/Pages.js';
import { Page } from '../types/Page.js';
import { getNextId } from '../utils/objectUtil.js';

export class PagesService {
  private fileName = 'pagesIndex.json';
  private filePath = '';

  constructor() {
    this.filePath = getFilePath(this.fileName);
  }

  // Get all data
  public async getItems(): Promise<Pages | undefined> {
    Logger.info(`PagesService: getItems ->`);

    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as Pages;
    } catch (error) {
      Logger.error(`PagesService: getItems -> ${error}`);
      return undefined;
    }
  }

  public async getNextId(): Promise<number | undefined> {
    try {
      const data = await this.getItems();
      return getNextId<Page>(data?.items);
    } catch (error) {
      Logger.error(`PagesService: getNextId -> ${error}`);
      return undefined;
    }
  }

  protected async writeFile(data: Pages): Promise<boolean> {
    Logger.info(`PagesService: writeFile -> `);

    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesService: writeFile -> ${error}`);
      return Promise.reject(new Error(`Write file failed. Error: ${error}`));
    }
  }

  public async listDuplicates(): Promise<any> {
    Logger.info(`PagesService: listDuplicates -> `);

    try {
      const item = await this.getItems();

      const ret: string[] = [];

      item?.menuItems?.forEach((x) => {
        if (x.id) {
          ret.push(x.id.toString());
        } else {
          ret.push(x.name);
        }
      });

      const ret2: string[] = [];
      item?.items?.forEach((x) => {
        if (x.id) {
          ret2.push(x.id.toString());
        } else {
          ret.push(x.name);
        }
      });

      const duplicates = ret
        ?.map((x) => x)
        .filter((x, i, a) => a.indexOf(x) !== i);
      // Filter out null
      const filtered = duplicates?.filter((x) => x);

      const duplicates2 = ret2
        ?.map((x) => x)
        .filter((x, i, a) => a.indexOf(x) !== i);
      // Filter out null
      const filtered2 = duplicates2?.filter((x) => x);
      // Convert to string

      return { menu: filtered, items: filtered2 };
    } catch (error) {
      Logger.error(`PagesService: listDuplicates -> ${error}`);
      return Promise.reject(new Error(`List Duplicates. Error: ${error}`));
    }
  }
}

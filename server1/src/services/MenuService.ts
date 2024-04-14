import { readFile } from 'fs/promises';

import { Logger } from '../utils/Logger.js';
import { Pages } from '../types/Pages.js';
import { Menu } from '../types/Menu.js';
import { getFilePath } from '../utils/getFilePath.js';
import { Page } from '../types/Page.js';

export class MenuService {
  private fileName = 'pagesIndex.json';
  private filePath = '';

  constructor() {
    this.filePath = getFilePath(this.fileName);
  }

  // Get all data
  private async getItems(): Promise<Pages | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as Pages;
    } catch (error) {
      Logger.error(`MenuService: getItems -> ${error}`);
      return undefined;
    }
  }

  private getModifiedMenu(level?: Menu[], level2?: Menu[] | Page[]) {
    try {
      if (!level) {
        return undefined;
      }

      return level
        ?.map((item) => {
          const filteredItems = level2?.filter((x) => x.parentId === item.id);
          return {
            ...item,
            childCount: filteredItems?.length,
          };
        })
        ?.toSorted();
    } catch (error) {
      Logger.error(`MenuService: getModifiedMenu -> ${error}`);
      return undefined;
    }
  }

  public async getMenus(): Promise<Pages | undefined> {
    Logger.info(`MenuService: getMenus -> `);
    try {
      // Get all the data from pagesIndex.json
      const data: Pages | undefined = await this.getItems();

      if (!data || !data.level1) {
        return undefined;
      }

      const x = this.getModifiedMenu(data.level1, data.level2);
      console.log('x', x);

      return {
        metadata: data.metadata,
        level1: this.getModifiedMenu(data.level1, data.level2),
        level2: this.getModifiedMenu(data.level2, data.pages),
        pages: data.pages?.toSorted(),
      };
    } catch (error) {
      Logger.error(`MenuService: getMenus --> Error: ${error}`);
      throw error;
    }
  }
}

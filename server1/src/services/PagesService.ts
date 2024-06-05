import { readFile, writeFile } from 'fs/promises';
import { Logger } from '../utils/Logger.js';
import { getFilePath } from '../utils/getFilePath.js';
import { Pages } from '../types/Pages.js';
import { Page } from '../types/Page.js';
import { cleanUpData, getNextId } from '../utils/objectUtil.js';
import { MenuEdit } from '../types/MenuEntryUpdate.js';

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
      const duplicates = item?.items
        ?.map((x) => x.id?.toString() || x.name)
        .filter((x, i, a) => a.indexOf(x) !== i);
      // Filter out null
      const filtered = duplicates?.filter((x) => x);
      // Convert to string
      return { items: filtered };
    } catch (error) {
      Logger.error(`PagesService: listDuplicates -> ${error}`);
      return Promise.reject(new Error(`List Duplicates. Error: ${error}`));
    }
  }

  public async addMenuItem(item: Page): Promise<void> {
    Logger.info(`PagesService: addMenuItem ->`);

    try {
      const pages = await this.getItems();
      if (!pages) {
        return Promise.reject(new Error('No items found'));
      }

      const data: Pages = {
        ...pages,
        items: [...pages.items, item],
      };
      // Verify count
      if (
        pages &&
        pages.items &&
        data.items &&
        pages.items.length > data.items.length + 1
      ) {
        throw new Error('Inconsistent count.');
      }
      // Add item
      await this.writeFile(data);
      return Promise.resolve();
    } catch (error) {
      Logger.error(`PagesService: addMenuItem -> ${error}`);
      return undefined;
    }
  }

  private getUpdatedItem(item: MenuEdit, foundItem: Page | undefined) {
    Logger.info(`PagesService: getUpdatedItem ->`);

    try {
      if (!foundItem) {
        return undefined;
      }
      // Find old parent record
      const parent = foundItem.parent;
      const newParentArray = parent
        ? parent
            .filter((x) => x.id !== item.parentId)
            .concat({ id: item.parentId, seq: item.seq })
            .sort((a, b) => a.id - b.seq)
        : undefined;

      const ret = { ...foundItem, parent: newParentArray, sortby: item.sortby };
      return ret ? cleanUpData(ret) : undefined;
    } catch (error) {
      Logger.error(`PagesService: getItems -> ${error}`);
      return undefined;
    }
  }

  public async updateItems(items: ReadonlyArray<MenuEdit>): Promise<void> {
    Logger.info(`PagesService: updateItems ->`);

    try {
      const pages = await this.getItems();
      if (!pages || !pages.items) {
        return Promise.reject(new Error('No items found'));
      }
      const retItems = pages.items;

      items.forEach((x) => {
        const foundIndex = retItems
          .map(function (y) {
            return y.id;
          })
          .indexOf(x.id);
        const item = this.getUpdatedItem(x, retItems[foundIndex]);
        item ? (retItems[foundIndex] = item) : null;
      });

      // Add item
      await this.writeFile({ ...pages, items: retItems });
      return Promise.resolve();
    } catch (error) {
      Logger.error(`PagesService: updateItems -> ${error}`);
      return undefined;
    }
  }
}

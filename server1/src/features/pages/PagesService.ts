import { readFile, writeFile } from 'fs/promises';
import FilePath from '../files/FilePath.js';
import { isValidArray } from '../../lib/utils/helperUtils.js';
import { Logger } from '../../lib/utils/logger.js';
import { cleanUpData, getNextId } from '../../lib/utils/objectUtil.js';
import { MenuEdit } from '../../types/MenuEdit.js';
import { PageMenu } from '../../types/Page.js';
import { Pages } from '../../types/Pages.js';
import { PagesIndex } from '../../types/PagesIndex.js';
import { ParentSortby } from '../../types/ParentSortby.js';
//import { sanitizeFilePath } from '../../lib/utils/fileNameUtil.js';

export class PagesService {
  private fileName = 'pagesIndex.json';
  private filePath = '';

  constructor() {
    this.filePath = FilePath.getDataDir(this.fileName);
  }

  // Get all data
  public async getItems(): Promise<PagesIndex | undefined> {
    Logger.info(`PagesService: getItems ->`);

    const { promise, resolve, reject } = Promise.withResolvers<
      Pages | undefined
    >();

    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });

      if (!results) reject(new Error('No data found'));
      resolve(JSON.parse(results) as PagesIndex);
    } catch (error) {
      if (error instanceof SyntaxError) {
        Logger.error(
          `PagesService: getItems. Invalid JSON -> ${error.message}`,
        );
        reject(new Error('Syntax Error'));
      } else {
        Logger.error(`PagesService: getItems. Error -> ${error}`);
        reject(new Error(`Get Items failed. Error: ${error}`));
      }
    }
    return promise;
  }

  // Get the next id for the record
  public async getNextId(): Promise<number | undefined> {
    Logger.info(`PagesService: getNextId -> `);

    try {
      const data = await this.getItems();
      return getNextId<PageMenu>(data?.items);
    } catch (error) {
      Logger.error(`PagesService: getNextId. Error -> ${error}`);
      return undefined;
    }
  }

  // Write to file
  public async writeFile(data: Pages): Promise<boolean> {
    Logger.info(`PagesService: writeFile -> `);

    const filePath = this.filePath;

    try {
      await writeFile(filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesService: writeFile. Error -> ${error}`);
      return Promise.reject(new Error(`Write file failed. Error: ${error}`));
    }
  }

  // ?
  private getUpdatedParent(
    updates: MenuEdit[] | undefined,
    currItem: PageMenu | undefined,
  ): ParentSortby[] | undefined {
    Logger.info(`PagesService: getUpdatedParent ->`);

    try {
      if (!currItem || !updates || !isValidArray(updates)) {
        return undefined;
      }

      const newArr: ParentSortby[] = [];
      // Update existing item
      currItem.parentItems?.forEach((item) => {
        // Find the prior record
        const match = updates.find((x) => x.priorParent.id === item.id);

        const update = match && {
          id: match.newParent.id,
          seq: match.newParent.seq,
          sortby: match.newParent.sortby,
        };

        newArr.push(update ?? item);
      });

      //Second Loop through "new items"
      updates.forEach((x) => {
        const found = newArr.find((y) => y.id !== x.id);
        if (!found) {
          newArr.push(x.newParent);
        }
      });

      const filtered =
        currItem.type === 'page'
          ? newArr.map((x) => ({ id: x.id, seq: x.seq }))
          : newArr;
      const sorted = filtered.sort((a, b) => a.id - b.id);

      return sorted.length > 0 ? sorted : undefined;
    } catch (error) {
      Logger.error(`PagesService: getUpdatedParent. Error: -> ${error}`);
    }
    return undefined;
  }

  // Update multiple items in pagesIndex.json
  public async updateItems(items: ReadonlyArray<MenuEdit>): Promise<void> {
    Logger.info(`PagesService: updateItems ->`);

    try {
      const pages = await this.getItems();
      if (!pages?.items) {
        return Promise.reject(new Error('No items found'));
      }

      // Loop through items from pagesIndex.json
      pages.items.map((item) => {
        // Get the updates from the incoming records - could be more than one update per entry.
        const updateItems = items.filter((x) => x.id === item.id);
        // Check for zero length array
        const hasContent = isValidArray(updateItems);
        // Get the updated item or undefined.
        const updatedItem =
          hasContent && this.getUpdatedParent(updateItems, item);

        // Add update (if there is one) or original
        return updatedItem ?? item;
      });
    } catch (error) {
      Logger.error(`PagesService: updateItems. Error -> ${error}`);
      return undefined;
    }
  }

  // Standardize all entries in pagesIndex.json
  public async fixAllEntries(): Promise<unknown> {
    Logger.info(`PagesService: fixAllEntries -> `);

    try {
      const pages = await this.getItems();
      if (!pages?.items) {
        return Promise.reject(new Error('No items found'));
      }
      const data = pages.items.map((item) => {
        const newItem = cleanUpData<PageMenu>(item);
        return newItem;
      });

      const newData = { ...pages, items: data };
      await this.writeFile(newData);
      return Promise.resolve();
    } catch (error) {
      Logger.error(`PagesService: fixAllEntries. Error -> ${error}`);
      return Promise.reject(new Error(`fixAllEntries. Error: ${error}`));
    }
  }

  // List duplicates Ids
  public async listDuplicates(): Promise<unknown> {
    Logger.info(`PagesService: listDuplicates -> `);

    try {
      const item = await this.getItems();
      const duplicates = item?.items
        ?.map((x) => x.id?.toString() || x.title)
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
}

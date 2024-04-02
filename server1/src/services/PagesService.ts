import { readFile, writeFile } from 'fs/promises';

import { Logger } from '../utils/Logger.js';
import { getFilePath } from '../utils/getFilePath.js';
import { Page } from 'types/Page.js';
import { Pages } from 'types/Pages.js';

export class PagesService {
  private fileName = 'pages.json';
  private filePath = '';

  constructor() {
    this.filePath = getFilePath(this.fileName);
  }

  private getTrimmedPage(obj: Page) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null),
    );
  }

  // Get all data
  public async getItems(): Promise<Pages | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as Pages;
    } catch (error) {
      Logger.error(`PagesService: getItems -> ${error}`);
      return undefined;
    }
  }

  // Get the summary for a page
  public async getMetaData(id: string): Promise<Page | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });

      const jsonData = JSON.parse(results) as Pages;
      const tempId = parseInt(id, 10);
      let ret: Page | undefined = undefined;
      if (isNaN(tempId) && tempId > 0) {
        ret = jsonData.items.find((x) => x.id === tempId);
      } else {
        ret = jsonData.items.find((x) => x.url === id);
      }
      return ret;
    } catch (error) {
      Logger.error(`PagesService: getMetaData -> ${error}`);
      return undefined;
    }
  }

  // Get the last id. We'll increase this by one to add the next record
  public async getLastId(): Promise<number | undefined> {
    Logger.info(`getLastId -> `);
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      const data = JSON.parse(results) as Pages;
      // Check to make sure items isn't undefined
      if (data.items) {
        // Check to make sure it is iterable
        const itr = typeof data.items[Symbol.iterator] === 'function';
        if (!itr) {
          Logger.error(
            `PagesService: getLastId -> Error: items is not iterable`,
          );
          return undefined;
        }
        const maxItem = data.items.reduce((a, b) => (+a.id > +b.id ? a : b));
        return maxItem ? maxItem.id : undefined;
      } else {
        Logger.error(
          `PagesService: getLastId -> Error: items missing from file`,
        );
        return undefined;
      }
    } catch (error) {
      Logger.error(`PagesService: getLastId -> Error: ${error}`);
      return undefined;
    }
  }

  // Get the next available id
  public async getNextId(): Promise<number | undefined> {
    Logger.info(`getNextId -> `);
    try {
      const item = await this.getItems();
      return this.findFreeId(item?.items ?? undefined);
    } catch (error) {
      Logger.error(`PagesService: getLastId -> Error: ${error}`);
      return undefined;
    }
  }

  // Get Next Id
  public findFreeId(items: Page[] | undefined): number | undefined {
    try {
      // Check to make sure items isn't undefined
      if (items) {
        const sortedArray = items.toSorted((a, b) => a.id - b.id);

        // Start with the first id in the sorted array
        let nextId = sortedArray[0].id;
        // Iterate through the array to find the missing id
        for (let i = 0; i < sortedArray.length; i++) {
          // Check if the current object's id is not equal to the nextId
          if (sortedArray[i].id !== nextId) {
            return nextId; // Found the gap
          }
          nextId++; // Move to the next expected id
        }

        // If no gaps were found, the next free id is one greater than the last object's id
        return nextId;
      } else {
        Logger.error(
          `PagesService: findFreeIdd -> Error: items missing from file`,
        );
        return undefined;
      }
    } catch (error) {
      Logger.error(`PagesService: findFreeId -> Error: ${error}`);
      return undefined;
    }
  }

  // Add an item
  public async addItem(data: Page): Promise<boolean> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      const jsonData = JSON.parse(results) as Pages;
      // const ret = {
      //   ...jsonData,
      //   items: [...jsonData.items, { ...data, id: data.id }],
      // };
      // const retSorted: Pages = {
      //   ...ret,
      //   items: ret.items.toSorted((a, b) => a.id - b.id),
      // };
      // JSON - null = replacer.  2 = tab space

      const trimmedData = this.getTrimmedPage(data);

      const updatedFile = {
        metadata: jsonData.metadata,
        menus: jsonData.menus,
        items: [...jsonData.items, { ...trimmedData, id: data.id }],
      };

      await writeFile(this.filePath, JSON.stringify(updatedFile, null, 2), {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesService: addItem -> ${error}`);
      return Promise.resolve(false);
    }
  }

  // Update an item
  public async updateItem(data: Page): Promise<boolean> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      const jsonData = JSON.parse(results) as Pages;
      const ret = jsonData.items.filter((x) => x.id !== data.id);

      const trimmedData = this.getTrimmedPage(data);

      await writeFile(
        this.filePath,
        // JSON - null = replacer.  2 = tab space
        JSON.stringify({ ...ret, ...trimmedData }, null, 2),
        {
          encoding: 'utf8',
        },
      );
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesService: updateItem -> ${error}`);
      return Promise.resolve(false);
    }
  }

  // Delete an item
  public async deleteItem(id: number): Promise<boolean> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      const jsonData = JSON.parse(results) as Pages;
      const ret = jsonData.items.filter((x) => x.id !== id);
      // JSON - null = replacer.  2 = tab space
      await writeFile(this.filePath, JSON.stringify(ret, null, 2), {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesService: deleteItem -> ${error}`);
      return Promise.resolve(false);
    }
  }
}

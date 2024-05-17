import { readFile, writeFile } from 'fs/promises';

import { Logger } from '../utils/Logger.js';
import { getFilePath } from '../utils/getFilePath.js';
import { Page } from '../types/Page.js';
import { Pages } from '../types/Pages.js';

export class PagesIndexService {
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
      Logger.error(`PagesIndexService: getItems -> ${error}`);
      return undefined;
    }
  }

  // Get the summary for a page
  public async getMetaData(id: string | number): Promise<Page | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });

      const jsonData = JSON.parse(results) as Pages;

      let tempId = 0;
      if (typeof id === 'string') {
        tempId = parseInt(id as string, 10);
      } else {
        tempId = id as number;
      }

      let ret: Page | undefined = undefined;
      if (tempId > 0) {
        ret = jsonData?.pages?.find((x) => x.id === tempId);
      } else {
        ret = jsonData?.pages?.find((x) => x.url === id);
      }
      return ret;
    } catch (error) {
      Logger.error(`PagesIndexService: getMetaData -> ${error}`);
      return undefined;
    }
  }

  // Get the last id. We'll increase this by one to add the next record
  public async getLastId(): Promise<number | undefined> {
    Logger.info(`getLastId -> `);
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      const data = JSON.parse(results) as Pages;
      // Check to make sure pages isn't undefined
      if (data.pages) {
        // Check to make sure it is iterable
        const itr = typeof data.pages[Symbol.iterator] === 'function';
        if (!itr) {
          Logger.error(
            `PagesIndexService: getLastId -> Error: pages is not iterable`,
          );
          return undefined;
        }
        const maxItem = data.pages.reduce((a, b) => (+a.id > +b.id ? a : b));
        return maxItem ? maxItem.id : undefined;
      } else {
        Logger.error(
          `PagesIndexService: getLastId -> Error: pages missing from file`,
        );
        return undefined;
      }
    } catch (error) {
      Logger.error(`PagesIndexService: getLastId -> Error: ${error}`);
      return undefined;
    }
  }

  // Get the next available id
  public async getNextId(): Promise<number | undefined> {
    Logger.info(`getNextId -> `);
    try {
      const item = await this.getItems();
      return this.findFreeId(item?.pages ?? undefined);
    } catch (error) {
      Logger.error(`PagesIndexService: getLastId -> Error: ${error}`);
      return undefined;
    }
  }

  // Get Next Id
  public findFreeId(
    pages: ReadonlyArray<Page> | undefined,
  ): number | undefined {
    try {
      // Check to make sure pages isn't undefined
      if (pages) {
        const sortedArray = pages.toSorted((a, b) => a.id - b.id);

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
          `PagesIndexService: findFreeId -> Error: pages missing from file`,
        );
        return undefined;
      }
    } catch (error) {
      Logger.error(`PagesIndexService: findFreeId -> Error: ${error}`);
      return undefined;
    }
  }

  private async writeNewFile(data: Pages): Promise<boolean> {
    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesIndexService: writeFile -> ${error}`);
      return Promise.resolve(false);
    }
  }

  // Add an item
  public async addItem(data: Page, file: boolean) {
    // Get the current file contents
    const results = await readFile(this.filePath, { encoding: 'utf8' });
    const jsonData = JSON.parse(results) as Pages;

    const retPages = jsonData.pages ?? [];

    // We don't want to update the text field and create_date so we'll remove them
    const { text, ...rest } = data;

    const updatedFile: Pages = {
      ...jsonData,
      pages: [...retPages, { ...rest, file: file }],
    };

    return this.writeNewFile(updatedFile);
  }

  // Update an item
  public async updateItem(data: Page, file: boolean): Promise<boolean> {
    try {
      // Get the current file contents
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      const jsonData = JSON.parse(results) as Pages;
      // Remove the current item from the data
      const ret = jsonData.pages?.filter((x) => x.id !== data.id);

      // We don't want to update the text field and create_date so we'll remove them
      const { text, create_date, ...rest } = data;
      const retPages = ret ?? [];

      const updatedFile: Pages = {
        ...jsonData,
        pages: [...retPages, { ...rest, file: file }],
      };

      await this.writeNewFile(updatedFile);
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesIndexService: updateItem -> ${error}`);
      return Promise.resolve(false);
    }
  }

  // Delete an item
  public async deleteItem(id: number): Promise<boolean> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      const jsonData = JSON.parse(results) as Pages;
      const ret = jsonData?.pages?.filter((x) => x.id !== id);

      const updatedFile: Pages = {
        ...jsonData,
        pages: ret ? { ...ret } : [],
      };
      await this.writeNewFile(updatedFile);
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesIndexService: deleteItem -> ${error}`);
      return Promise.resolve(false);
    }
  }
}

import { readFile, writeFile } from 'fs/promises';
import { getDataDir } from '../../../lib/utils/FilePath.js';
import { Logger } from '../../../lib/utils/logger.js';
import { cleanUpData, getNextId } from '../../../lib/utils/objectUtil.js';
import { Item } from '../../../types/Item.js';
import { ItemEdit } from '../../../types/ItemEdit.js';
import { Items } from '../../../types/Items.js';

export class ItemsService {
  private fileName = 'items.json';
  private filePath = '';

  constructor() {
    this.filePath = getDataDir(this.fileName);
  }

  // Get all data
  private async readFile(): Promise<Items | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as Items;
    } catch (error) {
      Logger.error(`ItemsService: readFile -> ${error}`);
    }
    return undefined;
  }

  // Write to file
  public async writeFile(data: Readonly<Items>): Promise<boolean> {
    Logger.info(`ItemsService: writeFile -> `);

    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`ItemsService: writeFile. Error -> ${error}`);
      return Promise.reject(new Error(`Write file failed. Error: ${error}`));
    }
  }

  // Get all data
  public async getItems(): Promise<Items | undefined> {
    return this.readFile();
  }

  // Yes, this is a duplicate of getItems.  It's here for clarity and in case
  // we need to add additional logic to getItems in the future.
  public async getEditItems(): Promise<Items | undefined> {
    // Get current items
    const items = await this.readFile();
    if (!items) {
      throw new Error('getEditItems > Index file not loaded');
    }
    return { ...items };
  }

  public async getNextId(): Promise<number | undefined> {
    try {
      const data = await this.readFile();
      return getNextId<Item>(data?.items);
    } catch (error) {
      Logger.error(`ItemsService: getItems -> ${error}`);
      return undefined;
    }
  }

  public async updateItems(
    items: ReadonlyArray<ItemEdit> | undefined,
  ): Promise<boolean> {
    if (!items || !Array.isArray(items) || items.length === 0) {
      Logger.info(`ItemsService: updateItems -> no items to update`);
      return true;
    }

    const items = await this.readFile();
    if (!items?.items) {
      throw new Error('ItemsService: updateItems -> Unable to load index');
    }

    // Get the updated records
    const updatedItems: ItemEdit[] = items.map((item) => {
      const currItems = items.items?.filter((x) => x.id === item.id);

      if (!currItems) {
        throw new Error(
          `ItemsService: updateItems -> item not found in index: ${item.id}`,
        );
      }

      if (currItems && currItems?.length > 1) {
        throw new Error(
          `ItemsService: updateItems -> Duplicate items found: ${item.id}.  Please correct index`,
        );
      }

      // Create a replacement item
      const currItem = currItems[0];
      if (currItem) {
        return {
          ...currItem,
          ...item,
          isNewItem: false,
          originalFolder: currItem.folder,
        };
      }
    });

    // Replace the changed records in the original data
    const data: Item[] = items.items
      .map((x) => {
        const foundItem = updatedItems.find((y) => y.id === x.id);
        const addItem = () => {
          if (foundItem) {
            const { originalFolder: _unused, ...rest } = foundItem;
            return cleanUpData<Item>({ ...rest });
          }
          return undefined;
        };
        const newItem = addItem();
        return newItem || x;
      })
      .filter(Boolean);

    const results = await this.writeFile({ ...items, items: data });
    if (!results) {
      throw new Error('ItemsService: updateItems -> Failed to update index.');
    }

    return true;
  }
}

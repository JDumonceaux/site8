import { readFile, writeFile } from 'fs/promises';
import { getDataDir } from '../../lib/utils/FilePath.js';
import { Logger } from '../../lib/utils/logger.js';
import { getNextId } from '../../lib/utils/objectUtil.js';
import { Item } from '../../types/Item.js';
import { ItemsFile } from '../../types/ItemsFile.js';
import { Items } from '../../types/Items.js';
import { ItemsArtists } from '../../types/ItemsArtists.js';
import { ItemArtist } from '../../types/ItemArtist.js';
import { ItemAdd } from '../../types/ItemAdd.js';
import { ItemEdit } from '../../types/ItemEdit.js';

export class ItemsService {
  private fileName = 'items.json';
  private filePath = '';

  constructor() {
    this.filePath = getDataDir(this.fileName);
  }

  // Get all data
  private async readFile(): Promise<ItemsFile | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as ItemsFile;
    } catch (error) {
      Logger.error(`ItemsService: readFile -> ${error}`);
    }
    return undefined;
  }

  // Write to file
  public async writeFile(data: Readonly<ItemsFile>): Promise<boolean> {
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
    const ret = await this.readFile();
    return { metadata: ret?.metadata || { title: 'items' }, items: ret?.items };
  }

  public async getItemsArtists(): Promise<ItemsArtists | undefined> {
    // Get current items
    const items = await this.readFile();
    if (!items) {
      throw new Error('Item file not loaded');
    }

    const ret: ItemArtist[] = [];
    items.items?.forEach((x) => {
      const matchingArtist = items.artists?.find((y) => x.id === y.id);
      if (matchingArtist) {
        ret.push({
          ...x,
          ...matchingArtist,
        });
      } else {
        ret.push({
          ...x,
          name: 'unknown',
          sortName: 'unknown',
        });
      }
    });
    return { metadata: items.metadata || { title: 'items' }, items: ret };
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

  public async patchItems(_items: ReadonlyArray<ItemEdit>): Promise<boolean> {
    //    const itemsTemp = await this.readFile();

    // Get the updated records
    // const updatedItems: ItemEdit[] = items.map((item) => {
    //   const currItems = itemsTemp.items?.filter((x) => x.id === item.id);

    //   if (!currItems) {
    //     throw new Error(
    //       `ItemsService: updateItems -> item not found in index: ${item.id}`,
    //     );
    //   }

    //   if (currItems && currItems?.length > 1) {
    //     throw new Error(
    //       `ItemsService: updateItems -> Duplicate items found: ${item.id}.  Please correct index`,
    //     );
    //   }

    //   // Create a replacement item
    //   const currItem = currItems[0];
    //   if (currItem) {
    //     return {
    //       ...currItem,
    //       ...item,
    //       isNewItem: false,
    //     };
    //   }
    // });

    // // Replace the changed records in the original data
    // const data: Item[] = itemsTemp.items
    //   .map((x) => {
    //     const foundItem = updatedItems.find((y) => y.id === x.id);
    //     const addItem = () => {
    //       if (foundItem) {
    //         const { ...rest } = foundItem;
    //         return cleanUpData<Item>({ ...rest });
    //       }
    //       return undefined;
    //     };
    //     const newItem = addItem();
    //     return newItem || x;
    //   })
    //   .filter(Boolean);

    // const results = await this.writeFile({ ...itemsTemp, items: data });
    // if (!results) {
    //   throw new Error('ItemsService: updateItems -> Failed to update index.');
    // }

    return true;
  }

  public async putItems(items: ReadonlyArray<ItemAdd>) {
    try {
      const data = await this.readFile();
      const updates: Item[] = data?.items || [];

      for (const item of items) {
        const id = getNextId(updates) || 1;
        updates.push({
          ...item,
          id,
        });
      }

      const ret = await this.writeFile({
        ...data,
        metadata: data?.metadata || { title: 'Items' },
        items: updates,
      });
      return ret;
    } catch (error) {
      Logger.error(`ItemsService: Put Items -> ${error}`);
    }
    return false;
  }
}

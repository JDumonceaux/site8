import type { Items } from '../../types/Items.js';
import type {
  Item,
  ItemAdd,
  ItemArtist,
  ItemEdit,
  ItemsArtists,
  ItemsFile,
} from '@site8/shared';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import { getNextId as getNextIdUtil } from '../../utils/objectUtil.js';

export class ItemsService extends BaseDataService<ItemsFile> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('items.json'),
    });
  }

  // Get all data - returns only items and metadata (not artists)
  public async getAllItems(): Promise<Items | undefined> {
    const fileData = await this.readFile();
    return {
      artists: fileData.artists,
      items: fileData.items,
      metadata: fileData.metadata,
    };
  }

  public async getItemsArtists(): Promise<ItemsArtists | undefined> {
    // Get current items
    const items = await this.readFile();

    const ret: ItemArtist[] = items.items.map((x) => {
      const matchingArtist = items.artists.find((y) => x.id === y.id);
      if (matchingArtist) {
        return {
          ...x,
          ...matchingArtist,
        };
      }
      return {
        ...x,
        name: 'unknown',
        sortName: 'unknown',
      };
    });
    return { items: ret, metadata: items.metadata };
  }

  public override async getNextId(): Promise<number | undefined> {
    try {
      const data = await this.readFile();
      return getNextIdUtil(data.items);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`ItemsService: getNextId -> ${errorMessage}`);
      return undefined;
    }
  }

  public patchItems(_items: readonly ItemEdit[]): boolean {
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

  public async putItems(items: readonly ItemAdd[]): Promise<boolean> {
    try {
      if (!Array.isArray(items)) {
        throw new Error('Put Items failed. Data is not an array');
      }

      const data = await this.readFile();
      const existingItems = data.items;

      const newItems = await Promise.all(
        items.map(async (item) => {
          const id = (await this.getNextId()) ?? 1;
          return {
            ...item,
            id,
          } as Item;
        }),
      );

      const updates: Item[] = [...existingItems, ...newItems];

      await this.writeData({
        artists: data.artists,
        items: updates,
        metadata: data.metadata,
      } as ItemsFile);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`ItemsService: Put Items -> ${errorMessage}`);
      throw new Error(`Put Items failed. Error: ${errorMessage}`);
    }
  }
}

import type { Image } from '@site8/shared';
import type { Images } from '@site8/shared';

import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import {
  cleanUpData,
  getNextId as getNextIdUtil,
} from '../../utils/objectUtil.js';
import FilePath from '../../lib/filesystem/FilePath.js';

import { ImagesFileService } from './ImagesFileService.js';
import { getNewIds, getNewItems } from './imagesUtil.js';

export class ImagesService extends BaseDataService<Images> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('images.json'),
    });
  }

  public async fixIndex(): Promise<boolean> {
    try {
      const item = await this.readFile();

      const fixedItems = item?.items?.map((x, index) => ({
        ...x,
        id: index + 1,
      }));

      const data: Images = {
        items: fixedItems,
        metadata: item?.metadata ?? { title: 'Images' },
      };

      await this.writeData(data);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`ImagesService: fixIndex -> ${errorMessage}`, { error });
      throw new Error(`Failed to fix index: ${errorMessage}`);
    }
  }

  public async fixNames(): Promise<boolean> {
    try {
      const item = await this.readFile();

      const fixedItems = item?.items?.map((x) => {
        const fixed = { ...x };
        if (x.fileName) {
          fixed.fileName = x.fileName.toLowerCase();
        }
        return fixed;
      });

      const data: Images = {
        items: fixedItems,
        metadata: item?.metadata ?? { title: 'Images' },
      };

      await this.writeData(data);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`ImagesService: fixNames -> ${errorMessage}`, { error });
      throw new Error(`Failed to fix names: ${errorMessage}`);
    }
  }

  // Get all data - uses BaseDataService implementation
  // Override not needed as base class provides this functionality

  // Yes, this is a duplicate of getItems.  It's here for clarity and in case
  // we need to add additional logic to getItems in the future.
  public async getItemsEdit(): Promise<Images | undefined> {
    // Get current items
    const items = await this.readFile();
    if (!items) {
      throw new Error('getItemsEdit > Index file not loaded');
    }
    return { ...items };
  }

  public override async getNextId(): Promise<number | undefined> {
    try {
      const data = await this.readFile();
      return getNextIdUtil(data?.items);
    } catch (error) {
      Logger.error(`ImagesService: getNextId -> ${String(error)}`);
      return undefined;
    }
  }

  public override async listDuplicates(): Promise<{
    readonly items: string[];
  }> {
    try {
      const item = await this.readFile();

      const duplicates = item?.items
        ?.map((x) => x.fileName)
        .filter((x, i, a) => a.indexOf(x) !== i);

      // Filter out null and undefined
      const filtered = duplicates?.filter((x): x is string => x !== undefined);

      return { items: filtered ?? [] };
    } catch (error) {
      Logger.error(`ImagesService: listDuplicates -> ${String(error)}`);
      return { items: [] };
    }
  }

  /**
   * Retrieves new items from the /images directory and updates the existing items.
   * @returns A Promise that resolves to the updated Images object, or undefined if an error occurs.
   */
  public async scanForNewItems(): Promise<Images | undefined> {
    // Update the index file with new items
    await this.updateIndexWithNewItems();

    return this.getNewItems();
  }

  public async updateItems(
    items: readonly Image[] | undefined,
  ): Promise<boolean> {
    if (!items || !Array.isArray(items) || items.length === 0) {
      Logger.info(`ImagesService: updateItems -> no items to update`);
      return true;
    }

    const images = await this.readFile();
    if (!images?.items) {
      throw new Error('ImagesService: updateItems -> Unable to load index');
    }

    const updatedItems = this.prepareUpdatedItems(items, images.items);
    await this.moveItemFiles(updatedItems);
    const updatedData = this.replaceUpdatedItems(images, updatedItems);

    await this.writeData(updatedData);
    return true;
  }

  /**
   * Prepare updated items by merging with existing data
   */
  private prepareUpdatedItems(
    items: readonly Image[],
    currentItems: readonly Image[],
  ): Image[] {
    return items.map((item: Image) => {
      const currItems = currentItems.filter((x) => x.id === item.id);

      if (currItems.length === 0) {
        throw new Error(
          `ImagesService: updateItems -> item not found in index: ${item.id}`,
        );
      }

      if (currItems.length > 1) {
        throw new Error(
          `ImagesService: updateItems -> Duplicate items found: ${item.id}.  Please correct index`,
        );
      }

      const [currItem] = currItems;
      if (!currItem) {
        throw new Error(
          `ImagesService: updateItems -> Unexpected undefined item`,
        );
      }

      return {
        ...currItem,
        ...item,
        isNewItem: false,
        originalFolder: currItem.folder,
      } as Image;
    });
  }

  /**
   * Move files to new directories
   */
  private async moveItemFiles(updatedItems: Image[]): Promise<void> {
    const fileMoved = new ImagesFileService().moveItems(updatedItems);
    if (!fileMoved) {
      throw new Error(
        'ImagesService: updateItems -> Unable to move file: ${item.fileName}',
      );
    }
  }

  /**
   * Replace updated items in the collection
   */
  private replaceUpdatedItems(images: Images, updatedItems: Image[]): Images {
    const data: Image[] = images.items
      .map((x) => {
        const foundItem = updatedItems.find((y) => y.id === x.id);
        if (foundItem) {
          const { ...rest } = foundItem;
          return cleanUpData<Image>({ ...rest });
        }
        return x;
      })
      .filter(Boolean);

    return { ...images, items: data };
  }

  // Get Items to sort into folders
  private async getNewItems(): Promise<Images | undefined> {
    // Get current items
    const imageData = await this.readFile();
    if (!imageData) {
      throw new Error('getNewItems > Index file not loaded');
    }
    return { ...imageData };
  }

  /**
   * Updates the index file with new items.
   * @returns A promise that resolves to a boolean indicating whether the update was successful.
   */
  private async updateIndexWithNewItems(): Promise<boolean> {
    try {
      // Get all images from /images directory
      const images = new ImagesFileService().getItemsFromBaseDirectory();
      // Get current items
      const prev = await this.readFile();
      if (!prev) {
        throw new Error('updateIndexWithNewItems > Index file not loaded');
      }
      const currItems: Image[] = prev.items ?? [];
      // Get the items not already in the list
      const newItems = getNewItems(currItems, images) ?? [];
      // Add the the new items to the existing items
      const allItems = [...currItems, ...newItems];
      // Get ids for the new items
      const modifiedItems = getNewIds(allItems);
      // Write back file
      const data = { ...prev, items: modifiedItems };
      await this.writeData(data);
      return true;
    } catch (error) {
      Logger.error(
        `ImagesService: updateIndexWithNewItems -> ${String(error)}`,
      );
      throw new Error('Failed to update index with new items');
    }
  }
}

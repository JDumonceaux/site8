import type { Image, Images } from '@site8/shared';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import {
  cleanUpData,
  getNextId as getNextIdUtil,
} from '../../utils/objectUtil.js';
import { getImagesFileService } from '../../utils/ServiceFactory.js';

import { getNewIds } from './imagesUtil.js';

export class ImagesService extends BaseDataService<Images> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('images.json'),
    });
  }

  public async fixIndex(): Promise<boolean> {
    try {
      const items = await this.readFile();

      const fixedItems: Images = (items ?? []).map((x, index) => ({
        ...x,
        id: index + 1,
      }));

      await this.writeData(fixedItems);
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
      const items = await this.readFile();

      const fixedItems: Images = (items ?? []).map((x) => {
        const fixed = { ...x };
        return fixed;
      });

      await this.writeData(fixedItems);
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
    return { ...items };
  }

  public override async getNextId(): Promise<number> {
    try {
      const data = await this.readFile();
      const nextId = getNextIdUtil(data);
      return nextId ?? 1;
    } catch (error) {
      Logger.error(`ImagesService: getNextId -> ${String(error)}`);
      throw error;
    }
  }

  public override async listDuplicates(): Promise<{
    readonly items: string[];
  }> {
    try {
      const items = await this.readFile();

      const duplicates = (items ?? [])
        .map((x: Image) => x.src)
        .filter((x: string, i: number, a: string[]) => a.indexOf(x) !== i);

      // Filter out null and undefined
      const filtered = duplicates.filter((x): x is string => x !== undefined);
      return { items: filtered };
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
    if (images == null) {
      throw new Error('ImagesService: updateItems -> Unable to load index');
    }

    const updatedItems = this.prepareUpdatedItems(items, images);
    // Note: File operations removed - Image type doesn't have fileName/folder
    const updatedData = this.replaceUpdatedItems(images, updatedItems);

    await this.writeData(updatedData);
    return true;
  }

  // Get Items to sort into folders
  private async getNewItems(): Promise<Images | undefined> {
    // Get current items
    const imageData = await this.readFile();
    return { ...imageData };
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
      } as Image;
    });
  }

  /**
   * Replace updated items in the collection
   */
  private replaceUpdatedItems(images: Images, updatedItems: Image[]): Images {
    const data: Images = (images ?? [])
      .map((x: Image) => {
        const foundItem = updatedItems.find((y) => y.id === x.id);
        if (foundItem) {
          const { ...rest } = foundItem;
          return cleanUpData<Image>({ ...rest });
        }
        return x;
      })
      .filter(Boolean) as Images;

    return data;
  }

  /**
   * Updates the index file with new items.
   * @returns A promise that resolves to a boolean indicating whether the update was successful.
   */
  private async updateIndexWithNewItems(): Promise<boolean> {
    try {
      // Get all images from /images directory (ImageFile[])
      const imageFiles = getImagesFileService().getItemsFromBaseDirectory();
      if (!imageFiles) {
        return false;
      }
      // Get current items (Image[])
      const currItems: Images = await this.readFile();
      // Note: Scanning for new files requires mapping ImageFile to Image
      // For now, just reassign IDs to existing items
      const modifiedItems = getNewIds(currItems);
      // Write back file
      await this.writeData(modifiedItems ?? []);
      return true;
    } catch (error) {
      Logger.error(
        `ImagesService: updateIndexWithNewItems -> ${String(error)}`,
      );
      throw new Error('Failed to update index with new items');
    }
  }
}

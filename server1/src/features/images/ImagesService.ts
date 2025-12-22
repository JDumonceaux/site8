import { readFile, writeFile } from 'fs/promises';

import type { Image } from '../../types/Image.js';
import type { Images } from '../../types/Images.js';

import { Logger } from '../../utils/logger.js';
import { cleanUpData, getNextId } from '../../utils/objectUtil.js';
import FilePath from '../files/FilePath.js';

import { ImagesFileService } from './ImagesFileService.js';
import { getNewIds, getNewItems } from './imagesUtil.js';

export class ImagesService {
  private readonly fileName = 'images.json';
  private readonly filePath: string = '';

  public constructor() {
    this.filePath = FilePath.getDataDir(this.fileName);
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

      await this.writeFile(data);
      return true;
    } catch (error) {
      Logger.error(`ImagesService: fixIndex -> ${String(error)}`);
      return false;
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

      await this.writeFile(data);
      return true;
    } catch (error) {
      Logger.error(`ImagesService: fixNames -> ${String(error)}`);
      return false;
    }
  }

  // Get all data
  public async getItems(): Promise<Images | undefined> {
    return this.readFile();
  }

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

  public async getNextId(): Promise<number | undefined> {
    try {
      const data = await this.readFile();
      return getNextId(data?.items);
    } catch (error) {
      Logger.error(`ImagesService: getItems -> ${String(error)}`);
      return undefined;
    }
  }

  public async listDuplicates(): Promise<string[] | string | undefined> {
    try {
      const item = await this.readFile();

      const duplicates = item?.items
        ?.map((x) => x.fileName)
        .filter((x, i, a) => a.indexOf(x) !== i);

      // Filter out null and undefined
      const filtered = duplicates?.filter((x): x is string => x !== undefined);

      return filtered && filtered.length > 0 ? filtered : 'No duplicates found';
    } catch (error) {
      Logger.error(`ImagesService: listDuplicates -> ${String(error)}`);
      return 'No duplicates found';
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

    const imageItems: Image[] = images.items;

    // Get the updated records
    const updatedItems: Image[] = items.map((item: Image) => {
      const currItems = imageItems.filter((x) => x.id === item.id);

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

      // Create a replacement item
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

    // Move the files to a new directory
    const fileMoved = new ImagesFileService().moveItems(updatedItems);
    if (!fileMoved) {
      throw new Error(
        'ImagesService: updateItems -> Unable to move file: ${item.fileName}',
      );
    }

    // Replace the changed records in the original data
    const data: Image[] = images.items
      .map((x) => {
        const foundItem = updatedItems.find((y) => y.id === x.id);
        const addItem = () => {
          if (foundItem) {
            const { ...rest } = foundItem;
            return cleanUpData<Image>({ ...rest });
          }
          return undefined;
        };
        const newItem = addItem();
        return newItem ?? x;
      })
      .filter(Boolean);

    const results = await this.writeFile({ ...images, items: data });
    if (!results) {
      throw new Error('ImagesService: updateItems -> Failed to update index.');
    }

    return true;
  }

  public async writeFile(data: Readonly<Images>): Promise<boolean> {
    Logger.info(`ImagesService: writeFile -> `);

    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return true;
    } catch (error) {
      Logger.error(`ImagesService: writeFile. Error -> ${String(error)}`);
      throw new Error(`Write file failed. Error: ${String(error)}`);
    }
  }

  // Get Items to sort into folders
  private async getNewItems(): Promise<Images | undefined> {
    // Get current items
    const ret = await this.readFile();
    if (!ret) {
      throw new Error('getNewItems > Index file not loaded');
    }
    return { ...ret };
  }

  // Get all data
  private async readFile(): Promise<Images | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as Images;
    } catch (error) {
      Logger.error(`ImagesService: readFile -> ${String(error)}`);
    }
    return undefined;
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
      await this.writeFile(data);
      return true;
    } catch (error) {
      Logger.error(
        `ImagesService: updateIndexWithNewItems -> ${String(error)}`,
      );
      throw new Error('Failed to update index with new items');
    }
  }
}

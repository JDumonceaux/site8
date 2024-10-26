import { readFile, writeFile } from 'fs/promises';
import { getDataDir } from '../lib/utils/FilePath.js';
import { getNewIds, getNewItems } from '../lib/utils/imagesUtil.js';
import { Logger } from '../lib/utils/logger.js';
import { cleanUpData, getNextId } from '../lib/utils/objectUtil.js';
import { Image } from '../types/Image.js';
import { ImageEdit } from '../types/ImageEdit.js';
import { Images } from '../types/Images.js';
import { ImagesFileService } from './ImagesFileService.js';

export class ImagesService {
  private fileName = 'images.json';
  private filePath = '';

  constructor() {
    this.filePath = getDataDir(this.fileName);
  }

  // Get all data
  private async readFile(): Promise<Images | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as Images;
    } catch (error) {
      Logger.error(`ImagesService: readFile -> ${error}`);
    }
    return undefined;
  }

  // Write to file
  public async writeFile(data: Readonly<Images>): Promise<boolean> {
    Logger.info(`ImagesService: writeFile -> `);

    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`ImagesService: writeFile. Error -> ${error}`);
      return Promise.reject(new Error(`Write file failed. Error: ${error}`));
    }
  }

  // Get all data
  public async getItems(): Promise<Images | undefined> {
    return this.readFile();
  }

  // Get Items to sort into folders
  public async getNewItems(): Promise<Images | undefined> {
    // Get current items
    const prev = await this.readFile();
    if (!prev) {
      throw new Error('getNewItems > Index file not loaded');
    }
    const items = prev.items?.filter((x) => x.isNewItem === true);
    return { ...prev, items };
  }

  // Yes, this is a duplicate of getItems.  It's here for clarity and in case
  // we need to add additional logic to getItems in the future.
  public async getEditItems(): Promise<Images | undefined> {
    // Get current items
    const items = await this.readFile();
    if (!items) {
      throw new Error('getEditItems > Index file not loaded');
    }
    return { ...items };
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

  /**
   * Updates the index file with new items.
   * @returns A promise that resolves to a boolean indicating whether the update was successful.
   */
  private async updateIndexWithNewItems(): Promise<boolean> {
    try {
      // Get all images from /images directory
      const images = await new ImagesFileService().getItemsFromBaseDirectory();
      // Get current items
      const prev = await this.readFile();
      if (!prev) {
        throw new Error('updateIndexWithNewItems > Index file not loaded');
      }
      const currItems: Image[] = prev.items || [];
      // Get the items not already in the list
      const newItems = getNewItems(currItems, images) || [];
      // Add the the new items to the existing items
      const allItems = [...currItems, ...newItems];
      // Get ids for the new items
      const modifiedItems = getNewIds(allItems);
      // Write back file
      const data = { ...prev, items: modifiedItems };
      await this.writeFile(data);
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`ImagesService: updateIndexWithNewItems -> ${error}`);
    }
    return Promise.reject(false);
  }

  public async getNextId(): Promise<number | undefined> {
    try {
      const data = await this.readFile();
      return getNextId<Image>(data?.items);
    } catch (error) {
      Logger.error(`ImagesService: getItems -> ${error}`);
      return undefined;
    }
  }

  public async fixNames(): Promise<boolean> {
    try {
      const item = await this.readFile();

      const fixedItems = item?.items?.map((x) => ({
        ...x,
        fileName: x.fileName ? x.fileName.toLowerCase() : x.fileName,
      }));

      const data: Images = {
        metadata: item?.metadata ?? { title: 'Images' },
        items: fixedItems,
      };

      await this.writeFile(data);
      return true;
    } catch (error) {
      Logger.error(`ImagesService: fixNames -> ${error}`);
      return false;
    }
  }

  public async fixIndex(): Promise<boolean> {
    try {
      const item = await this.readFile();

      const fixedItems = item?.items?.map((x, index) => ({
        ...x,
        id: index + 1,
      }));

      const data: Images = {
        metadata: item?.metadata ?? { title: 'Images' },
        items: fixedItems,
      };

      await this.writeFile(data);
      return true;
    } catch (error) {
      Logger.error(`ImagesService: fixIndex -> ${error}`);
      return false;
    }
  }

  public async listDuplicates(): Promise<string[] | string | undefined> {
    try {
      const item = await this.readFile();

      const duplicates = item?.items
        ?.map((x) => x.fileName)
        .filter((x, i, a) => a.indexOf(x) !== i);

      // Filter out null
      const filtered = duplicates?.filter((x) => x);

      return filtered && filtered.length > 0 ? filtered : 'No duplicates found';
    } catch (error) {
      Logger.error(`ImagesService: listDuplicates -> ${error}`);
      return 'No duplicates found';
    }
  }

  public async updateItems(
    items: ReadonlyArray<ImageEdit> | undefined,
  ): Promise<boolean> {
    try {
      if (!items || !Array.isArray(items) || items.length === 0) {
        Logger.info(`ImagesService: updateItems -> no items to update`);
        return true;
      }

      const images = await this.readFile();
      if (!images?.items) {
        Logger.error(`ImagesService: updateItems -> file not loaded`);
        return false;
      }

      // Get the updated records
      const updatedItems: ImageEdit[] = items.map((item) => {
        const currItems = images.items?.filter((x) => x.id === item.id);

        if (!currItems) {
          Logger.error(
            `ImagesService: updateItems -> item not found: ${item.id}`,
          );
          return false;
        }

        if (currItems && currItems?.length > 1) {
          Logger.error(
            `ImagesService: updateItems -> Duplicate items found.  Please correct index`,
          );
          return false;
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

      // Move the files to a new directory
      await new ImagesFileService().moveItems(updatedItems);

      Logger.info(`ImagesService: step 1`);
      // Replace the changed records in the original data
      const data: Image[] = images.items
        .map((x) => {
          const foundItem = updatedItems.find((y) => y.id === x.id);
          const addItem = () => {
            if (foundItem) {
              const { originalFolder: _unused, ...rest } = foundItem;
              return cleanUpData<Image>({ ...rest });
            }
            return undefined;
          };
          const newItem = addItem();
          return newItem || x;
        })
        .filter(Boolean);

      await this.writeFile({ ...images, items: data });
    } catch (error) {
      Logger.error(`ImagesService: updateItems -> ${error}`);
    }
    return false;
  }
}

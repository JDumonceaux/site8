import type { Image, Images } from '@site8/shared';

import { cleanUpData, getNextId as getNextIdUtil } from '@site8/shared';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
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
      const data = await this.readFile();

      const fixedItems: Image[] = (data.items ?? []).map((x, index) => ({
        ...x,
        id: index + 1,
      }));

      await this.writeData({ ...data, items: fixedItems });
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
      const data = await this.readFile();

      const fixedItems: Image[] = (data.items ?? []).map((x) => {
        const fixed = { ...x };
        return fixed;
      });

      await this.writeData({ ...data, items: fixedItems });
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`ImagesService: fixNames -> ${errorMessage}`, { error });
      throw new Error(`Failed to fix names: ${errorMessage}`);
    }
  }

  public override async getItems(): Promise<Images> {
    const data = await this.readFile();
    return {
      ...data,
      items: (data.items ?? []).map((item) => ({
        ...item,
        src: this.toSrc(item.folder, item.fileName),
      })),
    };
  }

  public override async getNextId(): Promise<number> {
    try {
      const data = await this.readFile();
      const nextId = getNextIdUtil(data.items);
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
      const { items = [] } = await this.getItems();
      const srcs = items.map((x) => x.src).filter((s): s is string => !!s);
      const seen = new Set<string>();
      const duplicates = srcs.filter((src) => {
        if (seen.has(src)) return true;
        seen.add(src);
        return false;
      });
      return { items: duplicates };
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
    await this.updateIndexWithNewItems();
    const data = await this.readFile();
    return data;
  }

  public async updateItems(
    items: readonly Image[] | undefined,
  ): Promise<boolean> {
    if (!items || !Array.isArray(items) || items.length === 0) {
      Logger.info(`ImagesService: updateItems -> no items to update`);
      return true;
    }

    const data = await this.readFile();
    if (data == null) {
      throw new Error('ImagesService: updateItems -> Unable to load index');
    }

    const updatedItems = this.prepareUpdatedItems(items, data.items ?? []);
    // Note: File operations removed - Image type doesn't have fileName/folder
    const updatedData = this.replaceUpdatedItems(
      data.items ?? [],
      updatedItems,
    );

    await this.writeData({ ...data, items: updatedData });
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
      } as Image;
    });
  }

  /**
   * Replace updated items in the collection
   */
  private replaceUpdatedItems(images: Image[], updatedItems: Image[]): Image[] {
    return (images ?? [])
      .map((x: Image) => {
        const foundItem = updatedItems.find((y) => y.id === x.id);
        if (foundItem) {
          const { ...rest } = foundItem;
          return cleanUpData<Image>({ ...rest });
        }
        return x;
      })
      .filter(Boolean);
  }

  private toSrc(folder: string, fileName: string): string {
    return folder
      ? `/public/images/${folder}/${fileName}`
      : `/public/images/${fileName}`;
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
      const data = await this.readFile();
      const currItems: Image[] = data.items ?? [];
      // Note: Scanning for new files requires mapping ImageFile to Image
      // For now, just reassign IDs to existing items
      const modifiedItems = getNewIds(currItems);
      // Write back file
      await this.writeData({ ...data, items: modifiedItems ?? [] });
      return true;
    } catch (error) {
      Logger.error(
        `ImagesService: updateIndexWithNewItems -> ${String(error)}`,
      );
      throw new Error('Failed to update index with new items');
    }
  }
}

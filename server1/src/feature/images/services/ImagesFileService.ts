import { mkdirSync, existsSync, readdirSync, renameSync, statSync } from 'fs';
import path from 'path';
import { FOLDERS_TO_IGNORE } from '../../../lib/utils/constants.js';
import { Logger } from '../../../lib/utils/logger.js';
import { Image } from '../../../types/Image.js';
import { ImageEdit } from '../../../types/ImageEdit.js';
import { Images } from '../../../types/Images.js';
import { ImagesService } from './ImagesService.js';
import { getImageDirAbsolute } from '../../../lib/utils/FilePath.js';

export class ImagesFileService {
  private imageDir = '';

  constructor() {
    this.imageDir = getImageDirAbsolute();
  }

  // Get all data
  public async getMatchedItems(): Promise<Images | undefined> {
    try {
      const items = await this.getItemsFromBaseDirectory();
      const x = await this.matchItems(items);
      return { metadata: { title: 'Images' }, items: x };
    } catch (error) {
      Logger.error(`ImagesFileService: getMatchedItems -> ${error}`);
      return undefined;
    }
  }

  /**
   * Retrieves new items from the sort directory.
   * @returns A Promise that resolves to an object of type Images or undefined.
   */
  public async getNewItems(): Promise<Images | undefined> {
    const items = await this.getItemsFromSortDirectory();
    return { metadata: { title: 'Images' }, items: items };
  }

  /**
   * Retrieves the list of folders in the specified path.
   *
   * @returns An array of folder names.
   */
  public getFolders() {
    try {
      // All the files and all the directories
      // If encoding is missing, returns buffer vs. strings
      // NOTE: path is deprecated, but replacement - parentPath - isn't working
      const items = readdirSync(this.imageDir, {
        encoding: 'utf8',
        recursive: true,
        withFileTypes: true,
      })
        .filter((x) => x.isDirectory())
        .map((x) => x.path + '\\' + x.name)
        .map((x) => x.substring(this.imageDir.length + 1).trim())
        .filter((x) => !FOLDERS_TO_IGNORE.some((y) => x.startsWith(y)))
        .toSorted((a, b) => a.localeCompare(b));
      return items;
    } catch (error) {
      Logger.error(`ImagesFileService: getFolders -> ${error}`);
    }
    return undefined;
  }

  /**
   * Retrieves a list of images from a directory.
   * @param basePath - The base path of the directory.
   * @param addPath - An optional additional path to append to the base path.
   * @returns A Promise that resolves to an object containing the metadata and items of the images.
   */
  private async getItemsFromDirectory(
    basePath: string,
    addPath?: string,
  ): Promise<Image[] | undefined> {
    try {
      const fullPath = addPath ? path.join(basePath, addPath) : basePath;
      Logger.info(
        `ImagesFileService: getItemsFromDirectory -> path: ${fullPath}`,
      );

      // All the files and all the directories
      // If encoding is missing, returns buffer vs. strings
      const items = readdirSync(fullPath, {
        encoding: 'utf8',
        recursive: true,
      }).filter((item) => {
        const itemPath = path.join(fullPath, item);
        const stats = statSync(itemPath);
        return stats.isFile();
      });

      // Return a list of images
      const ret: Image[] = items.map((x) => {
        return {
          fileName: path.basename(x),
          folder: path.dirname(x),
        };
      }) as Image[];

      // Filter out 'site' folder
      const filteredImages = ret.filter((x) => x.folder != 'site');

      return filteredImages;
    } catch (error) {
      Logger.error(`ImagesFileService: getItemsFromDirectory -> ${error}`);
    }
    return undefined;
  }

  // Get "items" from 'sort' directory
  public async getItemsFromSortDirectory(): Promise<Image[] | undefined> {
    return this.getItemsFromDirectory(this.imageDir, 'sort');
  }

  // Get all data
  public async getItemsFromBaseDirectory(): Promise<Image[] | undefined> {
    return this.getItemsFromDirectory(this.imageDir);
  }

  private async matchItems(
    items: Image[] | undefined,
  ): Promise<Image[] | undefined> {
    try {
      const service = new ImagesService();
      const data = await service.getItems();

      if (!data) {
        return items;
      }

      // const ret = items?.map((item) => {
      //   const matched = item.src
      //     ? data.items?.find((x) => x.src === item.src)
      //     : false;
      //   return {
      //     ...item,
      //     isMatched: !!matched,
      //     matchedId: matched ? matched?.id : 0,
      //   };
      // });
      // return ret;
    } catch (error) {
      Logger.error(`ImagesFileService: matchItems -> ${error}`);
      return undefined;
    }
  }

  /**
   * Moves the specified items to a new location.
   * @param items - An array of ImageEdit objects representing the items to be moved.
   * @returns A Promise that resolves to a boolean indicating whether the move operation was successful.
   */
  public async moveItems(
    items: ReadonlyArray<ImageEdit> | undefined,
  ): Promise<boolean> {
    try {
      Logger.info(
        `ImagesFileService: moveItems. -> (${items ? items?.length : 0}) to move.`,
      );

      const updates = items?.filter((x) => x.originalFolder !== x.folder);

      if (!updates) {
        Logger.info(`ImagesFileService: moveItems. -> no items to update`);
        return true;
      }

      updates.forEach((item) => {
        if (!item.fileName || !item.folder) {
          Logger.error(
            `ImagesFileService: moveItems -> fileName or folder is missing.`,
          );
          return false;
        }

        const currLocation = path.join(
          this.imageDir,
          item.originalFolder ?? '',
          item.fileName,
        );
        const moveTo = path.join(this.imageDir, item.folder, item.fileName);
        const moveToPath = path.join(this.imageDir, item.folder);

        // Create the folder if needed
        try {
          if (!existsSync(moveToPath)) {
            Logger.info(`ImagesFileService: creating folder -> ${moveToPath}.`);
            mkdirSync(moveToPath);
          }
        } catch (err) {
          console.error(err);
        }

        if (existsSync(moveTo)) {
          Logger.warn(
            `ImagesFileService: Unable to move file -> ${moveTo} already exists.`,
          );
          return false;
        } else {
          renameSync(currLocation, moveTo);
        }
      });
      return true;
    } catch (error) {
      Logger.error(`ImagesFileService: moveItems ->  ${error}`);
      return false;
    }
  }

  public async fixNames(): Promise<boolean> {
    try {
      // All the files and all the directories
      // If encoding is missing, returns buffer vs. strings
      const items = readdirSync(this.imageDir, {
        encoding: 'utf8',
        recursive: true,
      });

      items.forEach((item) => {
        const itemPath = path.join(this.imageDir, item);
        const stats = statSync(itemPath);
        if (stats.isFile()) {
          renameSync(itemPath, itemPath.toLowerCase());
        }
      });

      return true;
    } catch (error) {
      Logger.error(`ImagesFileService: fixNames -> ${error}`);
      return false;
    }
  }
}

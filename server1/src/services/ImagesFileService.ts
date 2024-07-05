import { existsSync, readdirSync, renameSync, statSync } from 'fs';
import path from 'path';
import { Image } from '../types/Image.js';
import { ImageEdit } from '../types/ImageEdit.js';
import { Images } from '../types/Images.js';
import { LOCAL_IMAGE_PATH } from '../utils/Constants.js';
import { Logger } from '../utils/Logger.js';
import { ImagesService } from './ImagesService.js';

export class ImagesFileService {
  // Get all data
  public async getMatchedItems(): Promise<Images | undefined> {
    try {
      const items = await this.getItemsFromBaseDirectory();
      const x = await this.matchItems(items?.items);
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
    return { metadata: { title: 'Images' }, items: items?.items };
  }

  /**
   * Retrieves the list of folders in the specified path.
   *
   * @returns An array of folder names.
   */
  public getFolders() {
    try {
      Logger.info(`ImagesFileService: getFolders ->`);

      // All the files and all the directories
      // If encoding is missing, returns buffer vs. strings
      const items = readdirSync(LOCAL_IMAGE_PATH, {
        encoding: 'utf8',
        recursive: true,
        withFileTypes: true,
      })
        .filter((x) => x.isDirectory())
        .map((x) => x.path + '\\' + x.name)
        .map((x) => x.substring(LOCAL_IMAGE_PATH.length + 1).trim());

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
  ): Promise<Images | undefined> {
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

      return { metadata: { title: 'Images' }, items: filteredImages };
    } catch (error) {
      Logger.error(`ImagesFileService: getItemsFromDirectory -> ${error}`);
    }
    return undefined;
  }

  // Get "items" from 'sort' directory
  public async getItemsFromSortDirectory(): Promise<Images | undefined> {
    return this.getItemsFromDirectory(LOCAL_IMAGE_PATH, 'sort');
  }

  // Get all data
  public async getItemsFromBaseDirectory(): Promise<Images | undefined> {
    return this.getItemsFromDirectory(LOCAL_IMAGE_PATH);
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

  public async moveItems(items: ImageEdit[] | undefined): Promise<boolean> {
    try {
      Logger.info(
        `ImagesFileService: moveItems. -> (${items ? items?.length : 0}) to move.`,
      );
      if (!items) {
        return true;
      }
      items.forEach((item) => {
        const path1 = path.join(
          LOCAL_IMAGE_PATH,
          item.originalFolder ?? '',
          item.fileName,
        );
        const path2 = path.join(
          LOCAL_IMAGE_PATH,
          item.folder ?? '',
          item.fileName,
        );
        if (existsSync(path2)) {
          Logger.error(`ImagesFileService: moveItems -> ${path2} exists.`);
        } else {
          renameSync(path1, path2);
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
      const items = readdirSync(LOCAL_IMAGE_PATH, {
        encoding: 'utf8',
        recursive: true,
      });

      items.forEach((item) => {
        const itemPath = path.join(LOCAL_IMAGE_PATH, item);
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

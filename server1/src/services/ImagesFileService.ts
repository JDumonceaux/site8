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

  public async getNewItems(): Promise<Images | undefined> {
    const items = await this.getItemsFromSortDirectory();
    return { metadata: { title: 'Images' }, items: items?.items };
  }

  // Get all data
  public getFolders() {
    try {
      Logger.info(`ImagesFileService: getFolders -> path: ${LOCAL_IMAGE_PATH}`);

      // All the files and all the directories
      // If encoding is missing, returns buffer vs. strings
      const items = readdirSync(LOCAL_IMAGE_PATH, {
        encoding: 'utf8',
        recursive: true,
        withFileTypes: true,
      });

      return items
        .filter((item) => item.isDirectory())
        .map((item) => item.name);
    } catch (error) {
      Logger.error(`ImagesFileService: getFolders -> ${error}`);
    }
    return undefined;
  }

  // Get all data
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
      });

      // Filter out directories
      const files = items.filter((item) => {
        const itemPath = path.join(fullPath, item);
        const stats = statSync(itemPath);
        return stats.isFile();
      });

      // Return a list of images
      const ret: Image[] = files.map((file) => {
        return {
          fileName: path.basename(file),
          folder: addPath ?? '',
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
          return false;
        }
        renameSync(path1, path2);
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

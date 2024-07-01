import { readdirSync, renameSync, statSync } from 'fs';
import path from 'path';
import { ImageEdit } from 'types/ImageEdit.js';
import { Image } from '../types/Image.js';
import { Images } from '../types/Images.js';
import { Logger } from '../utils/Logger.js';
import { ImagesService } from './ImagesService.js';

export class ImagesFileService {
  private directoryPath =
    'C:\\Users\\jdumo\\Documents\\0Projects\\site8\\client\\public\\images';

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
      const fullPath = this.directoryPath;
      Logger.error(`ImagesFileService: getFolders -> path: ${fullPath}`);

      // All the files and all the directories
      // If encoding is missing, returns buffer vs. strings
      const items = readdirSync(fullPath, {
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
    return this.getItemsFromDirectory(this.directoryPath, 'sort');
  }

  // Get all data
  public async getItemsFromBaseDirectory(): Promise<Images | undefined> {
    return this.getItemsFromDirectory(this.directoryPath);
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

      const ret = items?.map((item) => {
        const matched = item.src
          ? data.items?.find((x) => x.src === item.src)
          : false;
        return {
          ...item,
          isMatched: !!matched,
          matchedId: matched ? matched?.id : 0,
        };
      });
      return ret;
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

      console.log('items', items);

      items.forEach((item) => {
        const path1 = path.join(
          this.directoryPath,
          item.originalFolder ?? '',
          item.fileName,
        );
        const path2 = path.join(
          this.directoryPath,
          item.folder ?? '',
          item.fileName,
        );
        console.log('path1', path1);
        console.log('path2', path2);

        //renameSync(path1, path2);
      });

      return true;
    } catch (error) {
      Logger.error(`ImagesFileService: moveItems -> ${error}`);
      return false;
    }
  }

  public async fixNames(): Promise<boolean> {
    try {
      // All the files and all the directories
      // If encoding is missing, returns buffer vs. strings
      const items = readdirSync(this.directoryPath, {
        encoding: 'utf8',
        recursive: true,
      });

      items.forEach((item) => {
        const itemPath = path.join(this.directoryPath, item);
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

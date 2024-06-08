import { readdirSync, renameSync, statSync } from 'fs';
import path from 'path';
import { Logger } from '../utils/Logger.js';
import { Images } from '../types/Images.js';
import { Image } from '../types/Image.js';
import { ImagesService } from './ImagesService.js';

export class ImagesFileService {
  private directoryPath =
    'C:\\Users\\jdumo\\Documents\\0Projects\\site8\\client\\public\\images';

  // Get all data
  public async getMatchedItems(): Promise<Images | undefined> {
    try {
      const items = await this.getItemsFromDirectory();
      const x = await this.matchItems(items?.items);

      return { metadata: { title: 'Images' }, items: x };
    } catch (error) {
      Logger.error(`ImagesFileService: getItems -> ${error}`);
      return undefined;
    }
  }

  // Get all data
  private async getItemsFromDirectory(): Promise<Images | undefined> {
    try {
      // All the files and all the directories
      // If encoding is missing, returns buffer vs. strings
      const items = readdirSync(this.directoryPath, {
        encoding: 'utf8',
        recursive: true,
      });

      // Filter out directories
      const files = items.filter((item) => {
        const itemPath = path.join(this.directoryPath, item);
        const stats = statSync(itemPath);
        return stats.isFile();
      });

      // Return a list of images
      const ret: Image[] = files.map((file, index) => {
        const newFile = file.replaceAll('\\', '/');
        return {
          id: index,
          fileName: path.basename(file),
          folder: path.dirname(file) === '.' ? '' : path.dirname(file),
          src: newFile,
        };
      }) as Image[];

      // Filter out 'site' folder
      const filteredImages = ret.filter((x) => x.folder != 'site');

      return { metadata: { title: 'Images' }, items: filteredImages };
    } catch (error) {
      Logger.error(`ImagesFileService: getItems -> ${error}`);
      return undefined;
    }
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

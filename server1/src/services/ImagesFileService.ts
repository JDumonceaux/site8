import { readdirSync, renameSync, statSync } from 'fs';
import path from 'path';
import { Logger } from '../utils/Logger.js';

import { Images } from 'types/Images.js';
import { Image } from 'types/Image.js';
import { ImagesService } from './ImagesService.js';

export class ImagesFileService {
  private directoryPath =
    'C:\\Users\\jdumo\\Documents\\0Projects\\site8\\client\\public\\images';

  // Get all data
  public async getItems(): Promise<Images | undefined> {
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

      const ret: Image[] = files.map((file, index) => {
        const newFile = file.replaceAll('\\', '/');
        return {
          id: index,
          fileName: path.basename(file),
          folder: path.dirname(file) === '.' ? '' : path.dirname(file),
          src: newFile,
        };
      }) as Image[];

      const filteredImages = ret.filter((x) => x.folder != 'site');

      const results: Images = {
        metadata: { title: 'Images' },
        items: filteredImages,
      };

      const x = await this.matchItems(results.items);

      return { ...results, items: x };
    } catch (error) {
      Logger.error(`ImagesFileService: getItems -> ${error}`);
      return undefined;
    }
  }

  public async matchItems(
    items: Image[] | undefined,
  ): Promise<Image[] | undefined> {
    try {
      const service = new ImagesService();
      const data = await service.getItems();

      if (!data) {
        return items;
      }

      const ret = items?.map((item) => {
        const matched = data?.items?.find((x) => x.src === item.src);
        return {
          ...item,
          isMatched: matched ? true : false,
          matchedId: matched ? matched?.id : 0,
        };
      });
      return ret;
    } catch (error) {
      Logger.error(`ImagesFileService: getItems -> ${error}`);
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
          console.log(item);
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

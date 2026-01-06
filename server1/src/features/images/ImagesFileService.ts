import type { Image, ImageEdit, Images } from '@site8/shared';

import { existsSync, mkdirSync, readdirSync, renameSync, statSync } from 'fs';
import path from 'path';

import FilePath from '../../lib/filesystem/FilePath.js';
import { FOLDERS_TO_IGNORE } from '../../utils/constants.js';
import { Logger } from '../../utils/logger.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

export class ImagesFileService {
  private readonly imageDir: string = '';

  public constructor() {
    this.imageDir = FilePath.getImageDirAbsolute();
  }

  public fixNames(): boolean {
    try {
      // All the files and all the directories
      // If encoding is missing, returns buffer vs. strings
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
      const items = readdirSync(this.imageDir, {
        encoding: 'utf8',
        recursive: true,
      });

      items.forEach((item) => {
        const itemPath = path.join(this.imageDir, item);
        // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
        const stats = statSync(itemPath);
        if (stats.isFile()) {
          // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
          renameSync(itemPath, itemPath.toLowerCase());
        }
      });

      return true;
    } catch (error) {
      Logger.error(`ImagesFileService: fixNames -> ${String(error)}`);
      return false;
    }
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
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
      const items = readdirSync(this.imageDir, {
        encoding: 'utf8',
        recursive: true,
        withFileTypes: true,
      })
        .filter((x) => x.isDirectory())
        .map((x) => x.parentPath + '\\' + x.name)
        .map((x) => x.substring(this.imageDir.length + 1).trim())
        .filter((x) => !FOLDERS_TO_IGNORE.some((y) => x.startsWith(y)))
        .toSorted((a, b) => a.localeCompare(b));
      return items;
    } catch (error) {
      Logger.error(`ImagesFileService: getFolders -> ${String(error)}`);
    }
    return undefined;
  }

  // Get all data
  public getItemsFromBaseDirectory(): Image[] | undefined {
    return this.getItemsFromDirectory(this.imageDir);
  }

  // Get "items" from 'sort' directory
  public getItemsFromSortDirectory(): Image[] | undefined {
    return this.getItemsFromDirectory(this.imageDir, 'sort');
  }

  // Get all data
  public async getMatchedItems(): Promise<Images | undefined> {
    try {
      const items = this.getItemsFromBaseDirectory();
      const x = await this.matchItems(items);
      return { items: x, metadata: { title: 'Images' } };
    } catch (error) {
      Logger.error(`ImagesFileService: getMatchedItems -> ${String(error)}`);
      return undefined;
    }
  }

  /**
   * Retrieves new items from the sort directory.
   * @returns A Promise that resolves to an object of type Images or undefined.
   */
  public getNewItems(): Images | undefined {
    const items = this.getItemsFromSortDirectory();
    return { items: items, metadata: { title: 'Images' } };
  }

  /**
   * Moves the specified items to a new location.
   * @param items - An array of ImageEdit objects representing the items to be moved.
   * @returns A Promise that resolves to a boolean indicating whether the move operation was successful.
   */
  public moveItems(items: readonly ImageEdit[] | undefined): boolean {
    try {
      Logger.info(
        `ImagesFileService: moveItems. -> (${items ? items.length : 0}) to move.`,
      );

      const updates: readonly ImageEdit[] = []; //items?.filter((x) => x.originalFolder !== x.folder);

      if (!updates || updates.length === 0) {
        Logger.info(`ImagesFileService: moveItems. -> no items to update`);
        return true;
      }

      for (const item of updates) {
        if (!item.fileName || !item.folder) {
          Logger.error(
            `ImagesFileService: moveItems -> fileName or folder is missing.`,
          );
          return false;
        }

        const { originalFolder } = item as ImageEdit & {
          originalFolder?: string;
        };
        const currLocation = path.join(
          this.imageDir,
          originalFolder ?? '',
          item.fileName,
        );
        const moveTo = path.join(this.imageDir, item.folder, item.fileName);
        const moveToPath = path.join(this.imageDir, item.folder);

        // Create the folder if needed
        try {
          // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
          if (!existsSync(moveToPath)) {
            Logger.info(`ImagesFileService: creating folder -> ${moveToPath}.`);
            // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
            mkdirSync(moveToPath);
          }
        } catch (err) {
          Logger.error(
            `ImagesFileService: Error creating folder -> ${String(err)}`,
          );
        }

        // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
        if (existsSync(moveTo)) {
          Logger.warn(
            `ImagesFileService: Unable to move file -> ${moveTo} already exists.`,
          );
          return false;
        } else {
          // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
          renameSync(currLocation, moveTo);
        }
      }
      return true;
    } catch (error) {
      Logger.error(`ImagesFileService: moveItems ->  ${String(error)}`);
      return false;
    }
  }

  private getItemsFromDirectory(
    basePath: string,
    addPath?: string,
  ): Image[] | undefined {
    try {
      const fullPath = addPath ? path.join(basePath, addPath) : basePath;
      Logger.info(
        `ImagesFileService: getItemsFromDirectory -> path: ${fullPath}`,
      );

      // All the files and all the directories
      // If encoding is missing, returns buffer vs. strings
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
      const items = readdirSync(fullPath, {
        encoding: 'utf8',
        recursive: true,
      }).filter((item) => {
        const itemPath = path.join(fullPath, item);
        // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
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
      Logger.error(
        `ImagesFileService: getItemsFromDirectory -> ${String(error)}`,
      );
    }
    return undefined;
  }

  private async matchItems(
    items: Image[] | undefined,
  ): Promise<Image[] | undefined> {
    try {
      const service = getImagesService();
      const data = await service.getItems();

      if (!data) {
        return items;
      }

      if (!items) {
        return undefined;
      }

      const ret = items.map((item) => {
        // Try to match by src if present, otherwise fall back to filename
        const itemSrc = (item as { src?: string }).src;
        const matched = itemSrc
          ? data.items?.find((x) => (x as { src?: string }).src === itemSrc)
          : data.items?.find((x) => x.fileName === item.fileName);

        return {
          ...item,
          isMatched: !!matched,
          matchedId: matched?.id ?? 0,
        } as Image;
      });

      return ret;
    } catch (error) {
      Logger.error(`ImagesFileService: matchItems -> ${String(error)}`);
      return undefined;
    }
  }
}

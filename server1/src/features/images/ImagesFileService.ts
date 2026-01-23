import type { ImageFile, ImageFileEdit } from './types.js';

import { existsSync, mkdirSync, readdirSync, renameSync, statSync } from 'fs';
import path from 'path';

import FilePath from '../../lib/filesystem/FilePath.js';
import { Logger } from '../../utils/logger.js';

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

  // Get all data
  public getItemsFromBaseDirectory(): ImageFile[] | undefined {
    return this.getItemsFromDirectory(this.imageDir);
  }

  /**
   * Moves the specified items to a new location.
   * @param items - An array of ImageFileEdit objects representing the items to be moved.
   * @returns A Promise that resolves to a boolean indicating whether the move operation was successful.
   */
  public moveItems(items: readonly ImageFileEdit[] | undefined): boolean {
    try {
      Logger.info(
        `ImagesFileService: moveItems. -> (${items ? items.length : 0}) to move.`,
      );

      const updates: readonly ImageFileEdit[] = []; //items?.filter((x) => x.originalFolder !== x.folder);
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

        const { originalFolder } = item;
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
  ): ImageFile[] | undefined {
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
      const ret: ImageFile[] = items.map((x) => {
        return {
          fileName: path.basename(x),
          folder: path.dirname(x),
        };
      });

      // Filter out 'site' folder
      const filteredImages = ret.filter((x) => x.folder !== 'site');

      return filteredImages;
    } catch (error) {
      Logger.error(
        `ImagesFileService: getItemsFromDirectory -> ${String(error)}`,
      );
    }
    return undefined;
  }
}

import { existsSync } from 'fs';
import { readFile, unlink, writeFile } from 'fs/promises';

import FilePath from '../../lib/filesystem/FilePath.js';
import { Logger } from '../../utils/logger.js';

export class PageFileService {
  public async addFile(id: number, text: string | undefined): Promise<boolean> {
    Logger.info('PageFileService: addFile');

    if (text === undefined) {
      throw new Error('addFile - Text is required');
    }

    await this.saveFile(id, text);
    return true;
  }

  public async deleteFile(id: number): Promise<void> {
    Logger.info('PageFileService: deleteFile');

    const filePath = this.getFileName(id);

    if (id === 0) {
      throw new Error('deleteFile - ID is required');
    }

    try {
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
      if (existsSync(filePath)) {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        await unlink(filePath);
      } else {
        throw new Error(`deleteFile - File does not exist: ${filePath}`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`PageFileService: Error deleting file - ${errorMessage}`, {
        error,
        filePath,
      });
      Logger.error(`Failed to delete file: ${filePath}`);
      throw error;
    }
  }

  public async getFile(id: number): Promise<string> {
    Logger.info(`PageFileService: getFile id: ${id}`);

    try {
      const filePath = this.getFileName(id);
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
      if (!existsSync(filePath)) {
        Logger.warn(
          `PageFileService: File does not exist for id ${id}, returning empty content`,
        );
        return '';
      }
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      return await readFile(filePath, 'utf8');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `PageFileService: Error reading file id ${id} - ${errorMessage}`,
        error,
      );
      return '';
    }
  }

  public async updateFile(
    id: number,
    text: string | undefined,
  ): Promise<boolean> {
    Logger.info('PageFileService: updateFile');
    await this.saveFile(id, text ?? '');
    return true;
  }

  private getFileName(id: number): string {
    return FilePath.getPagesDir(`page${id.toString()}-en.txt`);
  }

  // https://nodejs.org/api/fs.html#file-system-flags
  // 'w': Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
  private async saveFile(id: number, text: string): Promise<boolean> {
    try {
      Logger.info(`PageFileService: saveFile id: ${id}`);
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      await writeFile(this.getFileName(id), text, {
        encoding: 'utf8',
        flag: 'w',
      });
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `PageFileService: Error saving file id ${id} - ${errorMessage}`,
        error,
      );
      throw new Error(`Unable to save file for id: ${id}`);
    }
  }
}

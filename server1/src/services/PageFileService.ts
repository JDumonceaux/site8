import { existsSync } from 'fs';
import { readFile, unlink, writeFile } from 'fs/promises';
import { getFilePath } from '../utils/getFilePath.js';
import { Logger } from '../utils/Logger.js';

export class PageFileService {
  private getFileName(id: number): string {
    return getFilePath(`page${id.toString()}-en.txt`);
  }

  public async getFile(id: number): Promise<string> {
    Logger.info(`PageFileService: getFile id: -> ${id}`);

    try {
      return readFile(this.getFileName(id), 'utf8');
    } catch (error) {
      Logger.error(`PageFileService: getFile id -> ${error}`);
      return Promise.reject(new Error(`unable to read file: -> ${id}`));
    }
  }

  // https://nodejs.org/api/fs.html#file-system-flags
  // 'w': Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
  private async saveFile(id: number, text: string): Promise<boolean> {
    try {
      Logger.info(`PageFileService: saveFile id: -> ${id}`);
      await writeFile(this.getFileName(id), text || '', {
        encoding: 'utf8',
        flag: 'w',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PageFileService: saveFile id -> ${error}`);
      return Promise.reject(new Error(`unable to save file: -> ${id}`));
    }
  }

  public async addFile(id: number, text: string | undefined): Promise<boolean> {
    Logger.info(`PageFileService: addFile -> `);
    if (text === undefined) {
      return Promise.reject(new Error('addFile -> Text is required'));
    }
    await this.saveFile(id, text);
    return Promise.resolve(true);
  }

  public async updateFile(
    id: number,
    text: string | undefined,
  ): Promise<boolean> {
    Logger.info(`PageFileService: updateFile -> `);
    await this.saveFile(id, text ?? '');
    return Promise.resolve(true);
  }

  public async deleteFile(id: number): Promise<void> {
    Logger.info(`PageFileService: deleteFile -> `);
    const filePath = this.getFileName(id);

    if (id === undefined || id === 0) {
      return Promise.reject(new Error('deleteFile -> ID is required'));
    }
    try {
      if (existsSync(filePath)) {
        return await unlink(filePath);
      } else {
        throw new Error(`deleteFile -> File does not exist: ${filePath}`);
      }
    } catch (error) {
      Logger.error(`PageFileService: deleteFile --> Error: ${error}`);
      Logger.error(`Failed to delete file: ${filePath}`);
      throw error;
    }
  }
}

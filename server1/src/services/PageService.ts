import { readFile, writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { getFilePath } from 'utils/getFilePath.js';
import { Logger } from 'utils/Logger.js';

export class PageService {
  public async getItem(id: number): Promise<string> {
    try {
      const filePath = getFilePath(`page${id.toString()}-en.txt`);
      return await readFile(filePath, 'utf8');
    } catch (error) {
      throw new Error(`getItem -> Failed to read file: ${error}`);
    }
  }

  public async addItem(id: number, data: string): Promise<void> {
    try {
      const filePath = getFilePath(`page${id.toString()}-en.txt`);
      return await writeFile(filePath, data, 'utf8');
    } catch (error) {
      throw new Error(`addItem -> Failed to read file: ${error}`);
    }
  }

  public async updateItem(id: number, data: string): Promise<void> {
    const fileName = `page${id.toString()}-en.txt`;
    const filePath = getFilePath(fileName);
    try {
      return await writeFile(filePath, data, { encoding: 'utf8', flag: 'w' });
    } catch (error) {
      throw new Error(`updateItem -> Failed to update file: ${error}`);
    }
  }

  public async deleteItem(id: number): Promise<void> {
    const fileName = `page${id.toString()}-en.txt`;
    const filePath = getFilePath(fileName);
    try {
      if (existsSync(filePath)) {
        return await unlink(filePath);
      } else {
        throw new Error(`deleteItem -> File does not exist: ${fileName}`);
      }
    } catch (error) {
      Logger.error(`Failed to delete file: ${error}`);
      throw error;
    }
  }
}

import { existsSync, mkdirSync, realpathSync, writeFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';

import { Logger } from '../../utils/logger.js';
/* eslint-disable-next-line perfectionist/sort-imports */
import FilePath from './FilePath.js';

export class FileService {
  public createFolder(folderPath: string): boolean {
    Logger.info(`FileService: createFolder -> ${folderPath}`);
    try {
      if (existsSync(folderPath)) {
        return true;
      }
      mkdirSync(folderPath, { recursive: true });
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `FileService: createFolder: ${folderPath} --> Error: ${errorMessage}`,
      );
      throw new Error(`Create folder failed. Error: ${errorMessage}`);
    }
  }

  public async getDataFile(fileName: string): Promise<string | undefined> {
    Logger.info(`FileService: getDataFile -> ${fileName}`);
    try {
      const filePath = FilePath.getDataDir(fileName);
      const resolvedPath = realpathSync(filePath);
      if (!resolvedPath.startsWith(__dirname)) {
        Logger.error(
          `FileService: getDataFile: ${fileName} --> Invalid file path: ${filePath}`,
        );
        return undefined;
      }
      return await readFile(filePath, { encoding: 'utf8' });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `FileService: getDataFile: ${fileName} --> Error: ${errorMessage}`,
      );
      return undefined;
    }
  }

  public async getFile(filePath: string): Promise<string | undefined> {
    Logger.info(`FileService: getFile -> ${filePath}`);
    try {
      // Prevent path traversal attacks
      const resolvedPath = realpathSync(filePath);
      const allowedDir = realpathSync(FilePath.getDataDir(''));

      if (!resolvedPath.startsWith(allowedDir)) {
        Logger.error(
          `FileService: getFile: ${filePath} --> Invalid file path attempt: ${resolvedPath}`,
        );
        throw new Error('Access denied: Invalid file path');
      }

      return await readFile(resolvedPath, { encoding: 'utf8' });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `FileService: getFile: ${filePath} --> Error: ${errorMessage}`,
      );
      return undefined;
    }
  }

  public async readFile<T>(filePath: string): Promise<T> {
    try {
      const data = await readFile(filePath, { encoding: 'utf8' });
      return JSON.parse(data) as T;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`FileService: readFile -> ${errorMessage}`);
      throw new Error(`Read file failed. Error: ${errorMessage}`);
    }
  }

  public async writeFile(data: unknown, filePath: string): Promise<boolean> {
    try {
      Logger.info(`FileService: writeFile -> ${filePath}`);
      await writeFile(filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`FileService: writeFile -> Error: ${errorMessage}`);
      throw new Error(`Write file failed. Error: ${errorMessage}`);
    }
  }

  public writeFileSync(data: unknown, filePath: string): boolean {
    try {
      Logger.info(`FileService: writeFileSync -> ${filePath}`);
      writeFileSync(filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
        flag: 'w',
      });
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`FileService: writeFileSync -> Error: ${errorMessage}`);
      throw new Error(`Write file failed. Error: ${errorMessage}`);
    }
  }
}

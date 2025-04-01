import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { writeFileSync } from 'fs';
import { Logger } from '../../lib/utils/logger.js';
import FilePath from './FilePath.js';

export class FileService {
  public async getDataFile(fileName: string): Promise<string | undefined> {
    Logger.info(`FileService: getDataFile -> ${fileName}`);
    try {
      const filePath = FilePath.getDataDir(fileName);
      const resolvedPath = fs.realpathSync(filePath);
      if (!resolvedPath.startsWith(__dirname)) {
        Logger.error(
          `FileService: getDataFile: ${fileName} --> Invalid file path: ${filePath}`,
        );
        return undefined;
      }
      return await readFile(filePath, { encoding: 'utf8' });
    } catch (error) {
      Logger.error(`FileService: getDataFile: ${fileName} --> Error: ${error}`);
      return undefined;
    }
  }

  public async getFile(filePath: string): Promise<string | undefined> {
    Logger.info(`FileService: getFile -> ${filePath}`);
    try {
      return await readFile(filePath, { encoding: 'utf8' });
    } catch (error) {
      Logger.error(`FileService: getFile: ${filePath} --> Error: ${error}`);
      return undefined;
    }
  }

  public async readFile<T>(filePath: string): Promise<T> {
    try {
      const data = await readFile(filePath, { encoding: 'utf8' });
      return JSON.parse(data) as T;
    } catch (error) {
      Logger.error(`FileService: readFile -> ${error}`);
      throw new Error(`Read file failed. Error: ${error}`);
    }
  }

  public async writeFile<T>(data: T, filePath: string): Promise<boolean> {
    try {
      Logger.info(`FileService: writeFile -> ${filePath}`);
      await writeFile(filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return true;
    } catch (error) {
      Logger.error(`FileService: writeFile -> Error: ${error}`);
      throw new Error(`Write file failed. Error: ${error}`);
    }
  }

  public writeFileSync<T>(data: T, filePath: string): boolean {
    try {
      Logger.info(`FileService: writeFileSync -> ${filePath}`);
      writeFileSync(filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
        flag: 'w',
      });
      return true;
    } catch (error) {
      Logger.error(`FileService: writeFileSync -> Error: ${error}`);
      throw new Error(`Write file failed. Error: ${error}`);
    }
  }

  public async createFolder(folderPath: string): Promise<boolean> {
    Logger.info(`FileService: createFolder -> ${folderPath}`);
    try {
      if (fs.existsSync(folderPath)) {
        return true;
      }
      fs.mkdirSync(folderPath, { recursive: true });
      return true;
    } catch (error) {
      Logger.error(
        `FileService: createFolder: ${folderPath} --> Error: ${error}`,
      );
      throw new Error(`Create folder failed. Error: ${error}`);
    }
  }
}

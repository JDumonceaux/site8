import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { getDataDir } from '../../lib/utils/FilePath.js';
import { Logger } from '../../lib/utils/logger.js';

export class FileService {
  public async getDataFile(fileName: string): Promise<string | undefined> {
    Logger.info(`FileService: getDataFile -> ${fileName}`);

    try {
      const filePath = getDataDir(fileName);

      // Verify that the file path is under the root directory
      const tempFilePath = fs.realpathSync(filePath);
      if (!tempFilePath.startsWith(__dirname)) {
        Logger.error(
          `FileService: getDataFile: ${fileName} --> Invalid file path: ${filePath}`,
        );
        return undefined;
      }

      return readFile(filePath, { encoding: 'utf8' });
    } catch (error) {
      Logger.error(`FileService: getDataFile: ${fileName} --> Error: ${error}`);
      return undefined;
    }
  }

  public async getFile(filePath: string): Promise<string | undefined> {
    Logger.info(`FileService: getFile -> ${filePath}`);

    try {
      return readFile(filePath, { encoding: 'utf8' });
    } catch (error) {
      Logger.error(`FileService: getFile: ${filePath} --> Error: ${error}`);
      return undefined;
    }
  }

  public async readFile<T>(filePath: string): Promise<T | undefined> {
    try {
      const results = await readFile(filePath, { encoding: 'utf8' });
      return JSON.parse(results) as T;
    } catch (error) {
      Logger.error(`FileService: readFile -> ${error}`);
      return Promise.reject(new Error(`Read file failed. Error: ${error}`));
    }
  }

  public async writeFile<T>(data: T, filePath: string): Promise<boolean> {
    try {
      await writeFile(filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`FileService: writeFile. Error -> ${error}`);
      return Promise.reject(new Error(`Write file failed. Error: ${error}`));
    }
  }
}

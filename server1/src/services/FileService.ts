import fs from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { Logger } from '../utils/Logger.js';
import { getFilePath } from '../utils/getFilePath.js';

export class FileService {
  private fileName = '';
  private filePath = '';
  private ROOT = '/data';

  constructor(fileName: string) {
    this.fileName = fileName;
    this.filePath = getFilePath(this.fileName);
  }

  public async getFile(): Promise<string | undefined> {
    Logger.info(`FileService: getFile -> `);

    try {
      // GOOD: Verify that the file path is under the root directory
      const tempFilePath = fs.realpathSync(
        path.resolve(this.ROOT, this.filePath),
      );
      if (!tempFilePath.startsWith(this.ROOT)) {
        return undefined;
      }

      return await readFile(this.filePath, { encoding: 'utf8' });
    } catch (error) {
      Logger.error(`FileService: getFile --> Error: ${error}`);
      return undefined;
    }
  }
}

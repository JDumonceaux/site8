import { Logger } from '../utils/Logger.js';
import { getFilePath } from '../utils/getFilePath.js';
import { readFile } from 'fs/promises';

export class FileService {
  private fileName = '';
  private filePath = '';

  constructor(fileName: string) {
    this.fileName = fileName;
    this.filePath = getFilePath(this.fileName);
  }

  public async getFile(): Promise<string | undefined> {
    Logger.info(`FileService: getFile -> `);

    try {
      return await readFile(this.filePath, { encoding: 'utf8' });
    } catch (error) {
      Logger.error(`FileService: getFile --> Error: ${error}`);
      return undefined;
    }
  }
}

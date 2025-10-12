import { readFile } from 'fs/promises';
import FilePath from '../files/FilePath.js';
import { Logger } from '../../lib/utils/logger.js';
import { Photos } from '../../types/Photos.js';

export class PhotosService {
  private readonly FILE_NAME = 'photos.json';
  private readonly filePath: string;

  constructor() {
    this.filePath = FilePath.getDataDir(this.FILE_NAME);
  }

  public async getItems(): Promise<Photos | undefined> {
    try {
      const data = await readFile(this.filePath, { encoding: 'utf8' });
      const parsedData = JSON.parse(data) as Photos;

      Logger.info('PhotosService: Successfully retrieved photos');
      return parsedData;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `PhotosService: Error reading photos file - ${errorMessage}`,
        { error, filePath: this.filePath },
      );
      return undefined;
    }
  }
}

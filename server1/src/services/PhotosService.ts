import { readFile } from 'fs/promises';
import { getDataDir } from '../lib/utils/FilePath.js';
import { Logger } from '../lib/utils/logger.js';
import { Photos } from '../types/Photos.js';

export class PhotosService {
  private fileName = 'photos.json';
  private filePath = '';

  constructor() {
    this.filePath = getDataDir(this.fileName);
  }

  // Get all data
  public async getItems(): Promise<Photos | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as Photos;
    } catch (error) {
      Logger.error(`PhotosService: getItems -> ${error}`);
      return undefined;
    }
  }
}

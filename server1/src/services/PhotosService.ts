import { Logger } from '../utils/Logger.js';
import { readFile } from 'fs/promises';
import { Photos } from 'models/Photos.js';
import { getFilePath } from 'utils/getFilePath.js';

export class PhotosService {
  fileName = 'photos.json';
  filePath = '';

  constructor() {
    this.filePath = getFilePath(this.fileName);
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

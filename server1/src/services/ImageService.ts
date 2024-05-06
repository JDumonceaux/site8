import { readFile } from 'fs/promises';

import { Logger } from '../utils/Logger.js';

import { getFilePath } from '../utils/getFilePath.js';
import { Images } from '../types/Images.js';

export class ImageService {
  private fileName = 'images.json';
  private filePath = '';

  constructor() {
    this.filePath = getFilePath(this.fileName);
  }

  // Get all data
  public async getItems(): Promise<Images | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as Images;
    } catch (error) {
      Logger.error(`MenuService: getItems -> ${error}`);
      return undefined;
    }
  }
}

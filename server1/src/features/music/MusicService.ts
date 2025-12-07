import { readFile, writeFile } from 'node:fs/promises';

import type { MusicItems } from '../../types/MusicItems.js';

import { Logger } from '../../lib/utils/logger.js';
import FilePath from '../files/FilePath.js';

export class MusicService {
  private readonly fileName = 'music.json';
  private readonly filePath: string = '';

  public constructor() {
    this.filePath = FilePath.getDataDir(this.fileName);
  }

  // Get all items
  public async getItems(): Promise<MusicItems | undefined> {
    const ret = await this.readFile();
    return { items: ret?.items, metadata: ret?.metadata ?? { title: 'Music' } };
  }

  // Write to file
  public async writeFile(data: Readonly<MusicItems>): Promise<boolean> {
    Logger.info('MusicService: writeFile');

    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`MusicService: writeFile. Error -> ${errorMessage}`);
      return Promise.reject(
        new Error(`Write file failed. Error: ${errorMessage}`),
      );
    }
  }

  // Read data from file
  private async readFile(): Promise<MusicItems | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as MusicItems;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`MusicService: readFile -> ${errorMessage}`);
    }
    return undefined;
  }
}

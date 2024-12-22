import { readFile, writeFile } from 'fs/promises';
import { getDataDir } from '../../lib/utils/FilePath.js';
import { Logger } from '../../lib/utils/logger.js';
import { Artists } from '../../types/Artists.js';
import { ItemsFile } from '../../types/ItemsFile.js';

export class ArtistsService {
  private fileName = 'items.json';
  private filePath = '';

  constructor() {
    this.filePath = getDataDir(this.fileName);
  }

  // Get all data
  private async readFile(): Promise<ItemsFile | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as ItemsFile;
    } catch (error) {
      Logger.error(`ArtistsService: readFile -> ${error}`);
    }
    return undefined;
  }

  // Write to file
  public async writeFile(data: Readonly<ItemsFile>): Promise<boolean> {
    Logger.info(`ArtistsService: writeFile -> `);

    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`ArtistsService: writeFile. Error -> ${error}`);
      return Promise.reject(new Error(`Write file failed. Error: ${error}`));
    }
  }

  // Get all data
  public async getArtists(): Promise<Artists | undefined> {
    const ret = await this.readFile();
    return {
      metadata: ret?.metadata || { title: 'items' },
      items: ret?.artists,
    };
  }
}

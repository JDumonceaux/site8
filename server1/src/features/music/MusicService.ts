import type { MusicItems } from '../../types/MusicItems.js';

import { BaseDataService } from '../../lib/services/BaseDataService.js';
import FilePath from '../files/FilePath.js';

/**
 * Service for managing music items.
 * Handles reading/writing music data from/to JSON files.
 */
export class MusicService extends BaseDataService<MusicItems> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('music.json'),
      serviceName: 'MusicService',
    });
  }

  /**
   * Retrieves all music items
   * @returns Music items with metadata
   */
  public async getItems(): Promise<MusicItems | undefined> {
    try {
      const data = await this.readFile();
      return data;
    } catch {
      return undefined;
    }
  }

  /**
   * Writes music items to file
   * @param data - Music items to write
   * @returns True if successful
   * @throws Error if write fails
   */
  public async updateItems(data: Readonly<MusicItems>): Promise<boolean> {
    try {
      await this.writeFile(data);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Write file failed: ${errorMessage}`);
    }
  }
}

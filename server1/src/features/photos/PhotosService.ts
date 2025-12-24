import type { Photos } from '../../types/Photos.js';

// eslint-disable-next-line import/no-cycle
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import FilePath from '../files/FilePath.js';

export class PhotosService extends BaseDataService<Photos> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('photos.json'),
      serviceName: 'PhotosService',
    });
  }

  public override async getItems(): Promise<Photos | undefined> {
    try {
      const parsedData = await this.readFile();

      Logger.info('PhotosService: Successfully retrieved photos');
      return parsedData;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `PhotosService: Error reading photos file - ${errorMessage}`,
        { error },
      );
      return undefined;
    }
  }
}

import { Logger } from '../utils/Logger.js';
import { Image } from 'types/Image.js';
import { ImagesService } from './ImagesService.js';
import { Images } from 'types/Images.js';
import { removeEmptyAttributes, sorteObjectKeys } from 'utils/objectUtil.js';

export class ImageService extends ImagesService {
  public async getItem(id: number): Promise<Image | undefined> {
    try {
      const ret = await this.getItems();
      if (!ret) {
        return Promise.reject(new Error('getItem -> No data found'));
      }
      return ret.items?.find((x) => x.id === id);
    } catch (error) {
      Logger.error(`ImageService: getItem -> ${error}`);
      return undefined;
    }
  }

  public cleanUpData(data: Image) {
    try {
      const cleanedData = removeEmptyAttributes<Image>(data);
      const sortedData = sorteObjectKeys<Image>(cleanedData);
      const [id, ...rest] = sortedData;
      return { id, ...rest };
    } catch (error) {
      Logger.error(`ImageService: cleanUpData -> ${error}`);
    }
  }

  public async addItem(data: Image): Promise<number> {
    Logger.info(`ImageService: addItem -> `);

    try {
      const ret = await this.getItems();
      if (!ret) {
        return Promise.reject(new Error('addItem -> No data found'));
      }

      // Get next id
      const id = (await this.getNextId()) ?? 0;

      const updatedFile: Images = {
        metadata: ret.metadata,
        items: [...(ret.items ?? []), this.cleanUpData(data)],
      };

      await this.writeNewFile(updatedFile);
      return Promise.resolve(id);
    } catch (error) {
      Logger.error(`ImageService: addItem -> ${error}`);
      return Promise.reject();
    }
  }

  public async updateItem(data: Image): Promise<number> {
    Logger.info(`ImageService: updateItem -> `);

    try {
      const ret = await this.getItems();
      if (!ret) {
        return Promise.reject(new Error('updateItem -> No data found'));
      }
      // Remove the current item from the data
      const updateItems = ret.items?.filter((x) => x.id !== data.id);

      const updatedFile: Images = {
        metadata: ret.metadata,
        items: [...(updateItems ?? []), this.cleanUpData(data)],
      };

      await this.writeNewFile(updatedFile);
      return Promise.resolve(data.id);
    } catch (error) {
      Logger.error(`ImageService: updateItem -> ${error}`);
      return Promise.reject();
    }
  }
}

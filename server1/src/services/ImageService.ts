import { Logger } from '../utils/Logger.js';
import { Image } from 'types/Image.js';
import { ImagesService } from './ImagesService.js';
import { Images } from 'types/Images.js';
import { removeEmptyAttributes, sorteObjectKeys } from '../utils/objectUtil.js';

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

  public cleanUpData(data: Image): Image {
    try {
      const cleanedData: Image = removeEmptyAttributes<Image>(data);
      console.log('cleanData', cleanedData);
      const sortedData: Image = sorteObjectKeys<Image>(cleanedData);
      const { id, ...rest } = sortedData;
      return { id, ...rest };
    } catch (error) {
      Logger.error(`ImageService: cleanUpData -> ${error}`);
    }
    return data;
  }

  public async addItem(data: Image): Promise<number> {
    Logger.info(`ImageService: addItem -> `);

    try {
      const updatedItem = this.cleanUpData(data);

      if (!updatedItem) {
        throw new Error('addItem -> Invalid item');
      }

      const ret = await this.getItems();
      if (!ret) {
        throw new Error('addItem -> No data found');
      }

      // Get next id
      const idNew = (await this.getNextId()) ?? 0;

      // I want the Id to show up first in the record in the file
      const { id, ...rest } = updatedItem;
      const newItem = { id: idNew, ...rest };

      const updatedFile: Images = {
        metadata: ret.metadata,
        items: [...(ret.items ?? []), newItem],
      };

      await this.writeNewFile(updatedFile);
      return Promise.resolve(id);
    } catch (error) {
      Logger.error(`ImageService: addItem -> ${error}`);
      return Promise.reject(new Error('fail'));
    }
  }

  public async updateItem(data: Image): Promise<number> {
    Logger.info(`ImageService: updateItem -> `);

    try {
      const updatedItem = this.cleanUpData(data);
      if (!updatedItem) {
        return Promise.reject(new Error('updateItem -> Invalid item'));
      }

      const ret = await this.getItems();
      if (!ret) {
        throw new Error('updateItem -> No data found');
      }

      // Remove the current item from the data
      const updateItems = ret.items?.filter((x) => x.id !== data.id);

      // I want the Id to show up first in the record in the file
      const { id, ...rest } = updatedItem;
      const newItem = { id, ...rest };

      const updatedFile: Images = {
        metadata: ret.metadata,
        items: [...(updateItems ?? []), newItem],
      };

      await this.writeNewFile(updatedFile);
      return Promise.resolve(data.id);
    } catch (error) {
      Logger.error(`ImageService: updateItem -> ${error}`);
      return Promise.reject(new Error('fail'));
    }
  }
}

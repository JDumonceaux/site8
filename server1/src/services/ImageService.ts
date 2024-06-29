import { Image } from '../types/Image.js';
import { Images } from '../types/Images.js';
import { Logger } from '../utils/Logger.js';
import { cleanUpData } from '../utils/objectUtil.js';
import { ImagesService } from './ImagesService.js';

export class ImageService {
  public async getItem(id: number): Promise<Image | undefined> {
    Logger.info(`ImageService: getItem -> ${id}`);

    try {
      const ret = await new ImagesService().getItems();
      if (!ret) {
        return Promise.reject(new Error('getItem -> No data found'));
      }
      return ret.items?.find((x) => x.id === id);
    } catch (error) {
      Logger.error(`ImageService: getItem -> ${id} ${error}`);
      return undefined;
    }
  }

  public async addItem(data: Image): Promise<number> {
    Logger.info(`ImageService: addItem -> `);

    try {
      // Clean up the data
      const updatedItem = cleanUpData<Image>(data);
      if (!updatedItem) {
        throw new Error('addItem -> Invalid item');
      }

      // Get the current file data
      const ret = await new ImagesService().getItems();
      if (!ret) {
        throw new Error('addItem -> No data found');
      }

      // Get next id
      const idNew = (await new ImagesService().getNextId()) ?? 0;

      // I want the Id to show up first in the record in the file
      const { id, ...rest } = updatedItem;
      const newItem = { id: idNew, ...rest };

      // Save the new item
      const updatedFile: Images = {
        metadata: ret.metadata,
        items: [...(ret.items ?? []), newItem],
      };

      await new ImagesService().writeFile(updatedFile);
      return Promise.resolve(id);
    } catch (error) {
      Logger.error(`ImageService: addItem -> ${error}`);
      return Promise.reject(new Error('add failed'));
    }
  }

  public async updateItem(data: Image): Promise<number> {
    Logger.info(`ImageService: updateItem -> `);

    try {
      const updatedItem = cleanUpData<Image>(data);
      if (!updatedItem) {
        return Promise.reject(new Error('updateItem -> Invalid item'));
      }

      const ret = await new ImagesService().getItems();
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

      await new ImagesService().writeFile(updatedFile);
      return Promise.resolve(data.id);
    } catch (error) {
      Logger.error(`ImageService: updateItem -> ${error}`);
      return Promise.reject(new Error('fail'));
    }
  }
}

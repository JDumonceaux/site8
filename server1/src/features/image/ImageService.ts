import type { Image, ImageAdd } from '../../types/Image.js';
import type { Images } from '../../types/Images.js';

import { Logger } from '../../utils/logger.js';
import { cleanUpData } from '../../utils/objectUtil.js';
import { ImagesService } from '../images/ImagesService.js';

export class ImageService {
  public async addItem(data: ImageAdd): Promise<number> {
    Logger.info('ImageService: addItem ->');
    const imagesService = this.getImagesService();

    try {
      const updatedItem = cleanUpData<ImageAdd>(data);
      const currentData = await imagesService.getItems();
      if (!currentData) {
        throw new Error('addItem -> No data found');
      }
      const idNew = (await imagesService.getNextId()) ?? 0;
      const newItem = { ...updatedItem, id: idNew };

      const updatedFile: Images = {
        items: [...(currentData.items ?? []), newItem],
        metadata: currentData.metadata,
      };
      await imagesService.writeFile(updatedFile);
      return idNew;
    } catch (error) {
      Logger.error(`ImageService: addItem -> ${String(error)}`);
      throw new Error('add failed');
    }
  }

  public async deleteItem(id: number): Promise<Image | undefined> {
    Logger.info(`ImageService: deleteItem -> id: ${id}`);
    const imagesService = this.getImagesService();

    try {
      const currentData = await imagesService.getItems();
      if (!currentData?.items) {
        throw new Error('deleteItem -> No data found');
      }
      const itemToDelete = currentData.items.find((item) => item.id === id);
      if (!itemToDelete) {
        Logger.warn(`ImageService: deleteItem -> Item with id ${id} not found`);
        return undefined;
      }
      const updatedItems = currentData.items.filter((item) => item.id !== id);
      const updatedFile: Images = {
        items: updatedItems,
        metadata: currentData.metadata,
      };
      await imagesService.writeFile(updatedFile);
      return itemToDelete;
    } catch (error) {
      Logger.error(`ImageService: deleteItem -> ${String(error)}`);
      throw new Error('delete failed');
    }
  }

  public async getItem(id: number): Promise<Image | undefined> {
    Logger.info(`ImageService: Fetching item with ID -> ${id}`);
    const imagesService = this.getImagesService();

    try {
      const response = await imagesService.getItems();
      if (!response?.items) {
        Logger.warn(
          `ImageService: No data found while fetching item with ID -> ${id}`,
        );
        throw new Error('No data found');
      }
      const item = response.items.find((x) => x.id === id);
      if (!item) {
        Logger.warn(`ImageService: Item with ID -> ${id} not found`);
      }
      return item;
    } catch (error) {
      const errorMessage = (error as Error).message;
      Logger.error(
        `ImageService: Error fetching item with ID -> ${id}. Details: ${errorMessage}`,
        error,
      );
      throw error;
    }
  }

  public async updateItem(data: Image): Promise<number> {
    Logger.info('ImageService: updateItem ->');
    const imagesService = this.getImagesService();

    try {
      const updatedItem = cleanUpData<Image>(data);
      const currentData = await imagesService.getItems();
      if (!currentData) {
        throw new Error('updateItem -> No data found');
      }
      const updatedItems =
        currentData.items?.filter((x) => x.id !== data.id) ?? [];
      const { id, ...rest } = updatedItem;
      const newItem = { id, ...rest };

      const updatedFile: Images = {
        items: [...updatedItems, newItem],
        metadata: currentData.metadata,
      };
      await imagesService.writeFile(updatedFile);
      return data.id;
    } catch (error) {
      Logger.error(`ImageService: updateItem -> ${String(error)}`);
      throw new Error('update failed');
    }
  }

  private getImagesService(): ImagesService {
    return new ImagesService();
  }
}

import type { ImagesService } from '../images/ImagesService.js';
import type { Image, ImageAdd, ImageEdit, Images } from '@site8/shared';

import { Logger } from '../../utils/logger.js';
import { cleanUpData } from '../../utils/objectUtil.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

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

      // Build new Image using allowed properties only
      const baseItem: Image = {
        description: updatedItem.description ?? '',
        ext_url: '',
        fileName: updatedItem.fileName ?? '',
        folder: updatedItem.folder ?? '',
        id: idNew,
        name: updatedItem.name ?? '',
      };

      const sanitizedNew = this.pickImageFields(baseItem);
      const sanitizedNewRecord = {
        ...(sanitizedNew as Record<string, unknown>),
      } as Record<string, unknown>;
      this.removeEmptyAttributesExceptId(sanitizedNewRecord);
      const finalNew = sanitizedNewRecord as Image;

      const updatedFile: Images = {
        items: [...(currentData.items ?? []), finalNew],
        metadata: currentData.metadata,
      };
      await this.writeImageData(imagesService, updatedFile);
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
      await this.writeImageData(imagesService, updatedFile);
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

  public async patchItem(
    data: Partial<ImageEdit> & { id: number },
  ): Promise<number> {
    Logger.info('ImageService: patchItem ->');
    const imagesService = this.getImagesService();

    try {
      const updatedItem = cleanUpData(data);
      const currentData = await imagesService.getItems();
      if (!currentData?.items) {
        throw new Error('patchItem -> No data found');
      }
      const existing = this.findExistingItem(currentData.items, data.id);
      const mergedBase: Image = {
        ...existing,
        ...updatedItem,
        id: existing.id,
      };
      const finalMerged = this.sanitizeImageItem(mergedBase);

      // Validate that finalMerged has at least one field besides id
      const fieldsWithoutId = Object.keys(finalMerged).filter(
        (key) => key !== 'id',
      );
      if (fieldsWithoutId.length === 0) {
        throw new Error(
          'patchItem -> finalMerged contains only id, no valid fields to update',
        );
      }

      const updatedFile = this.replaceItemInCollection(
        currentData,
        finalMerged,
      );

      await this.writeImageData(imagesService, updatedFile);
      return finalMerged.id;
    } catch (error) {
      Logger.error(`ImageService: patchItem -> ${String(error)}`);
      throw new Error('patch failed');
    }
  }

  // Backwards-compatible alias for callers expecting updateItem
  public async updateItem(
    data: Partial<ImageEdit> & { id: number },
  ): Promise<number> {
    return this.patchItem(data);
  }

  /**
   * Find existing item by ID with validation
   */
  private findExistingItem(items: readonly Image[], id: number): Image {
    const matches = items.filter((x) => x.id === id);
    if (matches.length === 0) {
      throw new Error(`patchItem -> Item with id ${id} not found`);
    }
    if (matches.length > 1) {
      throw new Error(
        `patchItem -> Multiple items with id ${id} found: ${matches.length}`,
      );
    }
    const [foundItem] = matches;
    return foundItem;
  }

  private getImagesService(): ImagesService {
    const service = getImagesService();
    // Access writeFile through public method if needed
    return service;
  }

  private pickFields<T extends Record<string, unknown>>(
    obj: Record<string, unknown>,
    keys: (keyof T)[],
    defaults: Partial<T> = {},
  ): T {
    const result: Record<string, unknown> = {};
    for (const k of keys) {
      const key = String(k);
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = obj[key];
      } else if (Object.prototype.hasOwnProperty.call(defaults, key)) {
        result[key] = (defaults as Record<string, unknown>)[key];
      } else {
        result[key] = undefined;
      }
    }

    return cleanUpData(result as T);
  }

  private pickImageFields(obj: Record<string, unknown>): Image {
    // Explicitly define allowed Image fields
    const allowedKeys: (keyof Image)[] = [
      'id',
      'name',
      'fileName',
      'folder',
      'ext_url',
      'tags',
      'description',
    ];
    return this.pickFields<Image>(obj, allowedKeys, {
      id: obj['id'] as number,
    });
  }

  private removeEmptyAttributesExceptId(obj: Record<string, unknown>): void {
    for (const key of Object.keys(obj)) {
      if (key === 'id') continue;
      const val = obj[key];
      if (val === undefined || val === null) {
        delete obj[key];
        continue;
      }
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed === '') {
          delete obj[key];
        } else {
          obj[key] = trimmed;
        }
        continue;
      }
      if (Array.isArray(val)) {
        if (val.length === 0) delete obj[key];
        continue;
      }
      if (typeof val === 'object') {
        if (Object.keys(val as Record<string, unknown>).length === 0) {
          delete obj[key];
        }
        continue;
      }
    }
  }

  /**
   * Replace an item in the collection and return updated Images
   */
  private replaceItemInCollection(
    currentData: Images,
    updatedItem: Image,
  ): Images {
    const items = currentData.items ?? [];
    const updatedItems = items.map((it) =>
      it.id === updatedItem.id ? updatedItem : it,
    );

    return {
      items: updatedItems,
      metadata: currentData.metadata,
    };
  }

  /**
   * Sanitize image item by picking valid fields and removing empty attributes
   */
  private sanitizeImageItem(item: Image): Image {
    const sanitized = this.pickImageFields(item);
    const record = {
      ...(sanitized as Record<string, unknown>),
    } as Record<string, unknown>;
    this.removeEmptyAttributesExceptId(record);
    return record as Image;
  }

  private async writeImageData(
    service: ImagesService,
    data: Images,
  ): Promise<void> {
    await service.writeData(data);
  }
}

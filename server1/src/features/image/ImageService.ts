import type { Image, ImageAdd } from '@site8/shared';
import type { Images } from '@site8/shared';

import { Logger } from '../../utils/logger.js';
import { cleanUpData } from '../../utils/objectUtil.js';
import { ImagesService } from '../images/ImagesService.js';
import FilePath from '../../lib/filesystem/FilePath.js';
import fs from 'fs';
import path from 'path';

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
        id: idNew,
        name: (updatedItem as any).title ?? (updatedItem as any).name ?? '',
        fileName: updatedItem.fileName ?? '',
        folder: updatedItem.folder ?? '',
        url:
          (updatedItem as any).url ?? (updatedItem as any).official_url ?? '',
        // Normalize tags to a string if present as array
        tags: Array.isArray((updatedItem as any).tags)
          ? (updatedItem as any).tags.join(',')
          : ((updatedItem as any).tags ?? ''),
        description: (updatedItem as any).description ?? '',
      };

      // If fileName is provided, attempt to read file metrics and add them
      let metrics: { width?: number; height?: number; size?: number } | null =
        null;
      if (baseItem.fileName) {
        metrics = await this.getImageFileMetricsIfExists(
          baseItem.fileName,
          baseItem.folder ?? '',
        );
      }

      const sanitizedNew = this.pickImageFields({
        ...baseItem,
        ...(metrics ?? {}),
      });
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

  public async patchItem(data: Image): Promise<number> {
    Logger.info('ImageService: patchItem ->');
    const imagesService = this.getImagesService();

    try {
      const updatedItem = cleanUpData<Partial<Image>>(data as Partial<Image>);
      const currentData = await imagesService.getItems();
      if (!currentData?.items) {
        throw new Error('patchItem -> No data found');
      }

      const matches = currentData.items.filter((x) => x.id === data.id);
      if (matches.length === 0) {
        throw new Error(`patchItem -> Item with id ${data.id} not found`);
      }
      if (matches.length > 1) {
        throw new Error(
          `patchItem -> Multiple items with id ${data.id} found: ${matches.length}`,
        );
      }
      const existing = matches[0]!;

      // Merge existing item with provided fields (patch semantics)
      const mergedBase: Image = {
        ...existing,
        ...updatedItem,
        id: existing.id,
      };

      // If a filename is present (either updated or existing), attempt to read metrics
      const fileNameToCheck =
        (updatedItem as any).fileName ?? existing.fileName ?? '';
      const folderToCheck =
        (updatedItem as any).folder ?? existing.folder ?? '';
      let metrics: { width?: number; height?: number; size?: number } | null =
        null;

      if (fileNameToCheck) {
        metrics = await this.getImageFileMetricsIfExists(
          fileNameToCheck,
          folderToCheck,
        );
      }

      const mergedWithMetrics = { ...mergedBase, ...(metrics ?? {}) };
      const mergedSanitized = this.pickImageFields(mergedWithMetrics);
      const mergedRecord = {
        ...(mergedSanitized as Record<string, unknown>),
      } as Record<string, unknown>;
      this.removeEmptyAttributesExceptId(mergedRecord);
      const finalMerged = mergedRecord as Image;

      const updatedItems = currentData.items.map((it) =>
        it.id === finalMerged.id ? finalMerged : it,
      );

      const updatedFile: Images = {
        items: updatedItems,
        metadata: currentData.metadata,
      };

      await this.writeImageData(imagesService, updatedFile);
      return finalMerged.id;
    } catch (error) {
      Logger.error(`ImageService: patchItem -> ${String(error)}`);
      throw new Error('patch failed');
    }
  }

  // Backwards-compatible alias for callers expecting updateItem
  public async updateItem(data: Image): Promise<number> {
    return this.patchItem(data);
  }

  private getImagesService(): ImagesService {
    const service = new ImagesService();
    // Access writeFile through public method if needed
    return service;
  }

  private async getImageFileMetricsIfExists(
    fileName: string,
    folder: string,
  ): Promise<{ width?: number; height?: number; size?: number } | null> {
    if (!fileName) return null;

    const imageDir = FilePath.getImageDirAbsolute();
    const filePath = path.join(imageDir, folder ?? '', fileName);

    try {
      const stats = await fs.promises.stat(filePath);
      if (!stats.isFile()) {
        throw new Error(`File not found: ${filePath}`);
      }

      const size = stats.size;

      const handle = await fs.promises.open(filePath, 'r');
      try {
        const toRead = Math.min(65536, size);
        const { buffer } = await handle.read({ length: toRead, position: 0 });
        const dims = this.parseImageDimensions(Buffer.from(buffer));
        return { width: dims?.width, height: dims?.height, size };
      } finally {
        await handle.close();
      }
    } catch (err) {
      throw new Error(
        `Image file metrics error for ${fileName}: ${String(err)}`,
      );
    }
  }

  private parseImageDimensions(
    buf: Buffer,
  ): { width: number; height: number } | null {
    if (!buf || buf.length < 10) return null;

    // PNG
    if (buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47) {
      // PNG signature matches
      try {
        const width = buf.readUInt32BE(16);
        const height = buf.readUInt32BE(20);
        if (width && height) return { width, height };
      } catch {
        // fallthrough
      }
    }

    // GIF
    if (buf.length >= 10 && buf.toString('ascii', 0, 3) === 'GIF') {
      const width = buf.readUInt16LE(6);
      const height = buf.readUInt16LE(8);
      return { width, height };
    }

    // JPEG - look for SOF markers
    if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xd8) {
      let offset = 2;
      while (offset < buf.length) {
        if (buf[offset] !== 0xff) {
          offset++;
          continue;
        }
        if (offset + 1 >= buf.length) break;
        const marker = buf[offset + 1];
        // 0xC0..0xCF are SOF markers (not all), SOF0 (0xC0) and SOF2 (0xC2) commonly
        if (
          marker !== undefined &&
          marker >= 0xc0 &&
          marker <= 0xcf &&
          marker !== 0xc4 &&
          marker !== 0xc8 &&
          marker !== 0xcc
        ) {
          // length is two bytes after marker
          if (offset + 5 >= buf.length) break;
          if (offset + 7 >= buf.length) break;
          const height = buf.readUInt16BE(offset + 5);
          const width = buf.readUInt16BE(offset + 7);
          return { width, height };
        } else {
          if (offset + 4 >= buf.length) break;
          const blockLength = buf.readUInt16BE(offset + 2);
          offset += 2 + blockLength;
        }
      }
    }

    return null;
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
        if (val && Object.keys(val as Record<string, unknown>).length === 0) {
          delete obj[key];
        }
        continue;
      }
    }
  }

  private pickImageFields(obj: Record<string, unknown>): Image {
    // Derive allowed keys from the shared Image to stay in sync
    const temp = {} as Image;
    const keys = Object.keys(temp);
    return this.pickFields<Image>(obj, keys as Array<keyof Image>, {
      id: (obj['id'] as number) ?? 0,
    });
  }

  private pickFields<T extends Record<string, unknown>>(
    obj: Record<string, unknown>,
    keys: Array<keyof T>,
    defaults: Partial<T> = {},
  ): T {
    const ret: Record<string, unknown> = {};
    for (const k of keys) {
      const key = String(k);
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        ret[key] = obj[key];
      } else if (Object.prototype.hasOwnProperty.call(defaults, key)) {
        ret[key] = (defaults as Record<string, unknown>)[key];
      } else {
        ret[key] = undefined;
      }
    }

    return cleanUpData(ret as any) as T;
  }

  private async writeImageData(
    service: ImagesService,
    data: Images,
  ): Promise<void> {
    await service.writeData(data);
  }
}

import type { Image, ImageAdd } from '@site8/shared';
import type { Images } from '@site8/shared';

import { Logger } from '../../utils/logger.js';
import { cleanUpData } from '../../utils/objectUtil.js';
import { ImagesService } from '../images/ImagesService.js';
import FilePath from '../../lib/filesystem/FilePath.js';
import fs from 'fs';
import path from 'path';

/**
 * Constants for image file parsing
 */
const IMAGE_CONSTANTS = {
  MAX_HEADER_BYTES: 16384,
  PNG: {
    MIN_HEADER_SIZE: 24,
    SIGNATURE: 0x89504e47,
    WIDTH_OFFSET: 16,
    HEIGHT_OFFSET: 20,
  },
  GIF: {
    MIN_HEADER_SIZE: 10,
    SIGNATURE: 'GIF',
    WIDTH_OFFSET: 6,
    HEIGHT_OFFSET: 8,
  },
  JPEG: {
    MIN_HEADER_SIZE: 2,
    MARKER_START: 0xff,
    SOI_MARKER: 0xd8,
    INVALID_SOF_MARKERS: [0xc4, 0xc8, 0xcc],
    SOF_MIN: 0xc0,
    SOF_MAX: 0xcf,
    HEIGHT_OFFSET: 5,
    WIDTH_OFFSET: 7,
  },
} as const;

/**
 * Extended type for ImageAdd with optional alternative property names
 */
type ImageAddExtended = ImageAdd & {
  title?: string;
  official_url?: string;
  description?: string;
};

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

      // Normalize the input data with proper typing
      const extended = updatedItem as ImageAddExtended;

      // Build new Image using allowed properties only
      const baseItem: Image = {
        id: idNew,
        name: extended.title ?? extended.name ?? '',
        fileName: updatedItem.fileName ?? '',
        folder: updatedItem.folder ?? '',
        url: extended.url ?? extended.official_url ?? '',
        // Normalize tags to a string if present as array
        tags: Array.isArray(extended.tags)
          ? extended.tags.join(',')
          : (extended.tags ?? ''),
        description: extended.description ?? '',
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

      const existing = this.findExistingItem(currentData.items, data.id);
      const mergedWithMetrics = await this.mergeWithFileMetrics(
        existing,
        updatedItem,
      );
      const finalMerged = this.sanitizeImageItem(mergedWithMetrics);

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
    return matches[0]!;
  }

  /**
   * Merge existing item with updates and enrich with file metrics
   */
  private async mergeWithFileMetrics(
    existing: Image,
    updatedItem: Partial<Image>,
  ): Promise<Image> {
    const mergedBase: Image = {
      ...existing,
      ...updatedItem,
      id: existing.id,
    };

    const updatedPartial = updatedItem as Partial<Image>;
    const fileNameToCheck = updatedPartial.fileName ?? existing.fileName ?? '';
    const folderToCheck = updatedPartial.folder ?? existing.folder ?? '';

    if (fileNameToCheck) {
      const metrics = await this.getImageFileMetricsIfExists(
        fileNameToCheck,
        folderToCheck,
      );
      return { ...mergedBase, ...(metrics ?? {}) };
    }

    return mergedBase;
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

  /**
   * Replace an item in the collection and return updated Images
   */
  private replaceItemInCollection(
    currentData: Images,
    updatedItem: Image,
  ): Images {
    const updatedItems = currentData.items.map((it) =>
      it.id === updatedItem.id ? updatedItem : it,
    );

    return {
      items: updatedItems,
      metadata: currentData.metadata,
    };
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
        const toRead = Math.min(IMAGE_CONSTANTS.MAX_HEADER_BYTES, size);
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
    if (!buf || buf.length < IMAGE_CONSTANTS.GIF.MIN_HEADER_SIZE) return null;

    return (
      this.parsePngDimensions(buf) ||
      this.parseGifDimensions(buf) ||
      this.parseJpegDimensions(buf) ||
      null
    );
  }

  /**
   * Parse PNG image dimensions
   */
  private parsePngDimensions(
    buf: Buffer,
  ): { width: number; height: number } | null {
    if (
      buf.length >= IMAGE_CONSTANTS.PNG.MIN_HEADER_SIZE &&
      buf.readUInt32BE(0) === IMAGE_CONSTANTS.PNG.SIGNATURE
    ) {
      try {
        const width = buf.readUInt32BE(IMAGE_CONSTANTS.PNG.WIDTH_OFFSET);
        const height = buf.readUInt32BE(IMAGE_CONSTANTS.PNG.HEIGHT_OFFSET);
        if (width && height) return { width, height };
      } catch {
        // fallthrough
      }
    }
    return null;
  }

  /**
   * Parse GIF image dimensions
   */
  private parseGifDimensions(
    buf: Buffer,
  ): { width: number; height: number } | null {
    if (
      buf.length >= IMAGE_CONSTANTS.GIF.MIN_HEADER_SIZE &&
      buf.toString('ascii', 0, 3) === IMAGE_CONSTANTS.GIF.SIGNATURE
    ) {
      const width = buf.readUInt16LE(IMAGE_CONSTANTS.GIF.WIDTH_OFFSET);
      const height = buf.readUInt16LE(IMAGE_CONSTANTS.GIF.HEIGHT_OFFSET);
      return { width, height };
    }
    return null;
  }

  /**
   * Parse JPEG image dimensions by looking for SOF markers
   */
  private parseJpegDimensions(
    buf: Buffer,
  ): { width: number; height: number } | null {
    if (
      buf.length < IMAGE_CONSTANTS.JPEG.MIN_HEADER_SIZE ||
      buf[0] !== IMAGE_CONSTANTS.JPEG.MARKER_START ||
      buf[1] !== IMAGE_CONSTANTS.JPEG.SOI_MARKER
    ) {
      return null;
    }

    let offset = 2;
    while (offset < buf.length) {
      if (buf[offset] !== IMAGE_CONSTANTS.JPEG.MARKER_START) {
        offset++;
        continue;
      }
      if (offset + 1 >= buf.length) break;

      const marker = buf[offset + 1];
      if (this.isValidJpegSOFMarker(marker)) {
        const dimensions = this.extractJpegDimensions(buf, offset);
        if (dimensions) return dimensions;
      } else {
        const blockLength = this.getJpegBlockLength(buf, offset);
        if (blockLength === null) break;
        offset += 2 + blockLength;
      }
    }

    return null;
  }

  /**
   * Check if marker is a valid JPEG SOF (Start of Frame) marker
   */
  private isValidJpegSOFMarker(marker: number | undefined): boolean {
    return (
      marker !== undefined &&
      marker >= IMAGE_CONSTANTS.JPEG.SOF_MIN &&
      marker <= IMAGE_CONSTANTS.JPEG.SOF_MAX &&
      !IMAGE_CONSTANTS.JPEG.INVALID_SOF_MARKERS.includes(marker)
    );
  }

  /**
   * Extract dimensions from JPEG SOF marker
   */
  private extractJpegDimensions(
    buf: Buffer,
    offset: number,
  ): { width: number; height: number } | null {
    if (offset + IMAGE_CONSTANTS.JPEG.HEIGHT_OFFSET >= buf.length) return null;
    if (offset + IMAGE_CONSTANTS.JPEG.WIDTH_OFFSET >= buf.length) return null;

    const height = buf.readUInt16BE(
      offset + IMAGE_CONSTANTS.JPEG.HEIGHT_OFFSET,
    );
    const width = buf.readUInt16BE(offset + IMAGE_CONSTANTS.JPEG.WIDTH_OFFSET);
    return { width, height };
  }

  /**
   * Get JPEG block length from buffer
   */
  private getJpegBlockLength(buf: Buffer, offset: number): number | null {
    if (offset + 4 >= buf.length) return null;
    return buf.readUInt16BE(offset + 2);
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

    return cleanUpData(result as T) as T;
  }

  private async writeImageData(
    service: ImagesService,
    data: Images,
  ): Promise<void> {
    await service.writeData(data);
  }
}

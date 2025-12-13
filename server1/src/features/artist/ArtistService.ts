import { z } from 'zod';

import type { ItemsFile } from '../../types/ItemsFile.js';

import { BaseDataService } from '../../lib/services/BaseDataService.js';
import { Logger } from '../../lib/utils/logger.js';
import FilePath from '../files/FilePath.js';

// ============================================================================
// Zod Validation Schemas
// ============================================================================

const ArtistSchema = z.object({
  id: z.number().int().positive('Artist ID must be a positive integer'),
  name: z.string().min(1, 'Artist name is required'),
  sortName: z.string().min(1, 'Artist sortName is required'),
  // Add other fields as needed
});

const ItemSchema = z.object({
  artistId: z.number().int().positive('Artist ID must be a positive integer'),
  id: z.number().int().positive('Item ID must be a positive integer'),
  title: z.string().min(1, 'Item title is required'),
  // Add other fields as needed
});

const MetadataSchema = z.object({
  title: z.string().default('artists'),
  // Add other metadata fields as needed
});

const ItemsFileSchema = z.object({
  artists: z.array(ArtistSchema).default([]),
  items: z.array(ItemSchema).default([]),
  metadata: MetadataSchema,
});

// ============================================================================
// Service Class
// ============================================================================
class ArtistService extends BaseDataService<ItemsFile> {
  public constructor(fileName = 'items.json') {
    super({
      cacheTTL: 5000,
      defaultMetadata: { title: 'artists' },
      enableCache: true,
      filePath: FilePath.getDataDir(fileName),
      serviceName: 'ArtistService',
      validationSchema: ItemsFileSchema,
    });
  }

  // ============================================================================
  // Public Methods
  // ============================================================================

  /**
   * Checks if an artist exists by ID
   * @param artistId - The artist ID to check
   * @returns True if artist exists
   */
  public async artistExists(artistId: number): Promise<boolean> {
    try {
      // Validate input first
      if (!Number.isInteger(artistId) || artistId <= 0) {
        return false;
      }

      const data = await this.readFile();
      return (data.artists ?? []).some((a) => a.id === artistId);
    } catch (error) {
      Logger.warn(`Error checking artist existence for ID ${artistId}:`, error);
      return false;
    }
  }

  /**
   * Gets all artists with their items
   * @returns ItemsFile data
   */
  public async getItems(): Promise<ItemsFile> {
    return this.readFile();
  }

  /**
   * Updates the artists data file
   * @param data - New artists data
   */
  public async updateItems(data: ItemsFile): Promise<void> {
    return this.writeFile(data);
  }
}

export { ArtistService };

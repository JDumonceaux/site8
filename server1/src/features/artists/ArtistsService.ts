import { z } from 'zod';

import type { Artists } from '../../types/Artists.js';
import type { ArtistsItems } from '../../types/ArtistsItems.js';
import type { ArtistWithItems } from '../../types/ArtistWithItems.js';
import type { ItemsFile } from '../../types/ItemsFile.js';

// eslint-disable-next-line import/no-cycle
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
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
// Custom Error Classes
// ============================================================================

export class ArtistNotFoundError extends Error {
  public constructor(artistId: number) {
    super(`Artist with ID ${artistId} not found`);
    this.name = 'ArtistNotFoundError';
  }
}

// ============================================================================
// Service Class
// ============================================================================

/**
 * Service for managing artists and their associated items.
 * Handles reading/writing artist data from/to JSON files with validation and caching.
 */
export class ArtistsService extends BaseDataService<ItemsFile> {
  public constructor(fileName = 'items.json') {
    super({
      cacheTTL: 5000,
      defaultMetadata: { title: 'artists' },
      enableCache: true,
      filePath: FilePath.getDataDir(fileName),
      serviceName: 'ArtistsService',
      validationSchema: ItemsFileSchema,
    });
  }

  /**
   * Checks if an artist exists by ID.
   * @public
   * @param {number} artistId - The ID to check
   * @returns {Promise<boolean>} True if artist exists
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
   * Retrieves all artists with metadata.
   * @public
   * @returns {Promise<Artists>} List of all artists
   * @throws {Error} If artists cannot be retrieved
   */
  public async getArtists(): Promise<Artists> {
    const data = await this.readFile();

    return {
      items: data.artists,
      metadata: data.metadata,
    };
  }

  /**
   * Retrieves all artists with their associated items, sorted by artist sortName.
   * @public
   * @returns {Promise<ArtistsItems>} All artists with their items
   * @throws {Error} If artists cannot be retrieved
   */
  public async getArtistsItems(): Promise<ArtistsItems> {
    const data = await this.readFile();

    // Sort artists by their sortName property
    const sortedArtists = [...(data.artists ?? [])].sort((a, b) =>
      a.sortName.localeCompare(b.sortName, undefined, {
        numeric: true,
        sensitivity: 'base',
      }),
    );

    const artistsItems = sortedArtists.map((artist) => {
      const items = (data.items ?? []).filter(
        (item) => item.artistId === artist.id,
      );
      return {
        artist,
        items: this.sortItemsByTitle(items),
      };
    });

    Logger.debug(
      `Retrieved ${artistsItems.length} artists with their associated items`,
    );

    return {
      items: artistsItems,
      metadata: data.metadata,
    };
  }

  /**
   * Retrieves a specific artist and their associated items.
   * @public
   * @param {number} artistId - The ID of the artist to retrieve
   * @returns {Promise<ArtistWithItems>} Artist and their items
   * @throws {ArtistNotFoundError} If artist not found
   * @throws {Error} If artistId is invalid
   */
  public async getArtistWithItems(artistId: number): Promise<ArtistWithItems> {
    // Validate input
    if (!Number.isInteger(artistId) || artistId <= 0) {
      throw new Error(
        `Invalid artist ID: ${artistId}. Must be a positive integer.`,
      );
    }

    const data = await this.readFile();
    const artist = data.artists?.find((a) => a.id === artistId);

    if (!artist) {
      throw new ArtistNotFoundError(artistId);
    }

    const items = (data.items ?? []).filter(
      (item) => item.artistId === artistId,
    );

    Logger.debug(`Found ${items.length} items for artist ${artistId}`);

    return {
      artist,
      items: this.sortItemsByTitle(items),
    };
  }

  /**
   * Retrieves multiple artists and their items in a single operation.
   * @public
   * @param {number[]} artistIds - Array of artist IDs to retrieve
   * @returns {Promise<ArtistWithItems[]>} Array of artists with their items
   * @throws {Error} If any artistId is invalid
   */
  public async getMultipleArtistWithItems(
    artistIds: number[],
  ): Promise<ArtistWithItems[]> {
    // Validate inputs
    if (!Array.isArray(artistIds)) {
      throw new Error('artistIds must be an array');
    }

    if (artistIds.length === 0) {
      return [];
    }

    // Validate all IDs first
    const invalidIds = artistIds.filter(
      (id) => !Number.isInteger(id) || id <= 0,
    );
    if (invalidIds.length > 0) {
      throw new Error(
        `Invalid artist IDs: ${invalidIds.join(', ')}. All IDs must be positive integers.`,
      );
    }

    const data = await this.readFile();
    const results: ArtistWithItems[] = [];
    const notFound: number[] = [];

    // Create a map for efficient lookups
    const artistMap = new Map(
      (data.artists ?? []).map((artist) => [artist.id, artist]),
    );

    for (const artistId of artistIds) {
      const artist = artistMap.get(artistId);

      if (!artist) {
        notFound.push(artistId);
        continue;
      }

      const items = (data.items ?? []).filter(
        (item) => item.artistId === artistId,
      );
      results.push({
        artist,
        items: this.sortItemsByTitle(items),
      });
    }

    if (notFound.length > 0) {
      Logger.warn(`Artists not found: ${notFound.join(', ')}`);
    }

    Logger.debug(
      `Retrieved ${results.length} of ${artistIds.length} requested artists`,
    );

    return results;
  }

  /**
   * Gets optimized statistics about artists and items.
   * @public
   * @returns {Promise<Statistics>} Statistics about artists and items
   */
  public async getStatistics(): Promise<{
    artistCount: number;
    artistsWithNoItems: number;
    averageItemsPerArtist: number;
    itemCount: number;
    itemDistribution: { artistId: number; itemCount: number }[];
    topArtistsByItemCount: {
      artistId: number;
      itemCount: number;
      name: string;
    }[];
  }> {
    const data = await this.readFile();
    const artistCount = data.artists?.length ?? 0;
    const totalItemCount = data.items?.length ?? 0;

    // Optimized O(n) approach using Map
    const itemCountByArtist = new Map<number, number>();

    // Count items per artist in a single pass
    for (const item of data.items ?? []) {
      itemCountByArtist.set(
        item.artistId,
        (itemCountByArtist.get(item.artistId) ?? 0) + 1,
      );
    }

    // Count artists with no items and create distribution
    let artistsWithNoItems = 0;
    const itemDistribution: { artistId: number; itemCount: number }[] = [];

    for (const artist of data.artists ?? []) {
      const count = itemCountByArtist.get(artist.id) ?? 0;
      if (count === 0) {
        artistsWithNoItems++;
      }
      itemDistribution.push({
        artistId: artist.id,
        itemCount: count,
      });
    }

    // Get top 10 artists by item count
    const topArtistsByItemCount = (data.artists ?? [])
      .map((artist) => ({
        artistId: artist.id,
        itemCount: itemCountByArtist.get(artist.id) ?? 0,
        name: artist.name,
      }))
      .sort((a, b) => b.itemCount - a.itemCount)
      .slice(0, 10);

    return {
      artistCount,
      artistsWithNoItems,
      averageItemsPerArtist: artistCount > 0 ? totalItemCount / artistCount : 0,
      itemCount: totalItemCount,
      itemDistribution,
      topArtistsByItemCount,
    };
  }

  /**
   * Updates the artists data file
   * @param data - New artists data
   */
  public async updateItems(data: ItemsFile): Promise<void> {
    return this.writeFile(data);
  }

  /**
   * Sorts items by title using locale-aware comparison.
   * @private
   * @template T - Type with a title property
   * @param {T[]} items - Items to sort
   * @returns {T[]} Sorted copy of items
   */
  private sortItemsByTitle<T extends { title: string }>(items: T[]): T[] {
    return [...items].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, {
        numeric: true, // Handle numbers in strings correctly
        sensitivity: 'base',
      }),
    );
  }
}

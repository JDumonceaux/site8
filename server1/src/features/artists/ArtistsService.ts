import FilePath from '../files/FilePath.js';
import { ArtistWithtems } from '../../types/ArtistWithtems.js';
import { Artists } from '../../types/Artists.js';
import { ArtistsItems } from '../../types/ArtistsItems.js';
import { ItemsFile } from '../../types/ItemsFile.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';
import { Logger } from '../../lib/utils/logger.js';
import { z } from 'zod';

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
  id: z.number().int().positive('Item ID must be a positive integer'),
  title: z.string().min(1, 'Item title is required'),
  artistId: z.number().int().positive('Artist ID must be a positive integer'),
  // Add other fields as needed
});

const MetadataSchema = z.object({
  title: z.string().default('artists'),
  // Add other metadata fields as needed
});

const ItemsFileSchema = z.object({
  metadata: MetadataSchema.optional(),
  artists: z.array(ArtistSchema).default([]),
  items: z.array(ItemSchema).default([]),
});

// ============================================================================
// Custom Error Classes
// ============================================================================

export class ArtistNotFoundError extends Error {
  constructor(artistId: number) {
    super(`Artist with ID ${artistId} not found`);
    this.name = 'ArtistNotFoundError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public validationErrors: string[],
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ============================================================================
// Service Class
// ============================================================================

/**
 * Service for managing artists and their associated items.
 * Handles reading/writing artist data from/to JSON files with validation and caching.
 */
export class ArtistsService {
  private readonly filePath: string;
  private readonly fileService: ReturnType<
    typeof ServiceFactory.getFileService
  >;
  private readonly DEFAULT_METADATA = { title: 'artists' };

  // Cache configuration - made mutable for setCacheTTL
  private cache: ItemsFile | null = null;
  private cacheTimestamp: number = 0;
  private cacheTTL = 5000; // 5 seconds (no longer readonly)

  constructor(fileName: string = 'items.json') {
    this.filePath = FilePath.getDataDir(fileName);
    this.fileService = ServiceFactory.getFileService();
  }

  /**
   * Reads and validates the items file from disk with optional caching.
   * @private
   * @throws {Error} If file cannot be read, parsed, or validated
   */
  private async readFile(): Promise<ItemsFile> {
    try {
      // Check cache first
      const now = Date.now();
      if (this.cache && now - this.cacheTimestamp < this.cacheTTL) {
        Logger.debug('Returning cached artists data');
        return this.cache;
      }

      Logger.debug(`Reading artists file from ${this.filePath}`);
      const rawData = await this.fileService.readFile<unknown>(this.filePath);

      if (!rawData) {
        throw new Error('File data is undefined or null');
      }

      // Validate data structure using Zod
      const validationResult = ItemsFileSchema.safeParse(rawData);

      if (!validationResult.success) {
        const errors = validationResult.error.issues
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join('; ');
        Logger.error(`Data validation failed: ${errors}`);
        throw new ValidationError(
          `Invalid file structure: ${errors}`,
          errors.split('; '),
        );
      }

      const validatedData = validationResult.data;

      // Ensure defaults for optional fields
      const data: ItemsFile = {
        metadata: validatedData.metadata || this.DEFAULT_METADATA,
        artists: validatedData.artists,
        items: validatedData.items,
      };

      // Update cache
      this.cache = data;
      this.cacheTimestamp = now;

      Logger.info(
        `Successfully loaded ${data.artists?.length ?? 0} artists and ${data.items?.length ?? 0} items`,
      );

      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`Failed to read file at ${this.filePath}: ${errorMessage}`);

      // Re-throw with context but preserve original error
      if (error instanceof Error) {
        throw new Error(`Error reading artists file: ${errorMessage}`, {
          cause: error,
        });
      }
      throw new Error(`Error reading artists file: ${errorMessage}`);
    }
  }

  /**
   * Validates and writes the items file to disk, then invalidates cache.
   * @public
   * @param {ItemsFile} data - The data to write
   * @throws {Error} If data is invalid or file cannot be written
   */
  public async writeFile(data: ItemsFile): Promise<void> {
    try {
      // Validate data structure before writing
      const validationResult = ItemsFileSchema.safeParse(data);

      if (!validationResult.success) {
        const errors = validationResult.error.issues
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join('; ');
        throw new ValidationError(
          `Invalid data structure: ${errors}`,
          errors.split('; '),
        );
      }

      const validatedData = validationResult.data;

      await this.fileService.writeFile<ItemsFile>(
        validatedData as ItemsFile,
        this.filePath,
      );

      // Invalidate cache after successful write
      this.invalidateCache();

      Logger.info(
        `Successfully wrote ${validatedData.artists.length} artists and ${validatedData.items.length} items to ${this.filePath}`,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`Failed to write file at ${this.filePath}: ${errorMessage}`);

      if (error instanceof Error) {
        throw new Error(`Error writing artists file: ${errorMessage}`, {
          cause: error,
        });
      }
      throw new Error(`Error writing artists file: ${errorMessage}`);
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
      metadata: data.metadata || this.DEFAULT_METADATA,
      items: data.artists,
    };
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
        sensitivity: 'base',
        numeric: true, // Handle numbers in strings correctly
      }),
    );
  }

  /**
   * Retrieves a specific artist and their associated items.
   * @public
   * @param {number} artistId - The ID of the artist to retrieve
   * @returns {Promise<ArtistWithtems>} Artist and their items
   * @throws {ArtistNotFoundError} If artist not found
   * @throws {Error} If artistId is invalid
   */
  public async getArtistWithtems(artistId: number): Promise<ArtistWithtems> {
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

    const items = (data.items || []).filter(
      (item) => item.artistId === artistId,
    );

    Logger.debug(`Found ${items.length} items for artist ${artistId}`);

    return {
      artist,
      items: this.sortItemsByTitle(items),
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
    const sortedArtists = [...(data.artists || [])].sort((a, b) =>
      a.sortName.localeCompare(b.sortName, undefined, {
        sensitivity: 'base',
        numeric: true,
      }),
    );

    const artistsItems = sortedArtists.map((artist) => {
      const items = (data.items || []).filter(
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
      metadata: data.metadata || { title: 'artist items' },
      items: artistsItems,
    };
  }

  /**
   * Invalidates the internal cache, forcing next read to fetch from disk.
   * @public
   */
  public invalidateCache(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
    Logger.debug('Cache invalidated');
  }

  /**
   * Gets optimized statistics about artists and items.
   * @public
   * @returns {Promise<Statistics>} Statistics about artists and items
   */
  public async getStatistics(): Promise<{
    artistCount: number;
    itemCount: number;
    averageItemsPerArtist: number;
    artistsWithNoItems: number;
    itemDistribution: { artistId: number; itemCount: number }[];
    topArtistsByItemCount: {
      artistId: number;
      name: string;
      itemCount: number;
    }[];
  }> {
    const data = await this.readFile();
    const artistCount = data.artists?.length || 0;
    const itemCount = data.items?.length || 0;

    // Optimized O(n) approach using Map
    const itemCountByArtist = new Map<number, number>();

    // Count items per artist in a single pass
    for (const item of data.items || []) {
      itemCountByArtist.set(
        item.artistId,
        (itemCountByArtist.get(item.artistId) || 0) + 1,
      );
    }

    // Count artists with no items and create distribution
    let artistsWithNoItems = 0;
    const itemDistribution: { artistId: number; itemCount: number }[] = [];

    for (const artist of data.artists || []) {
      const itemCount = itemCountByArtist.get(artist.id) || 0;
      if (itemCount === 0) {
        artistsWithNoItems++;
      }
      itemDistribution.push({
        artistId: artist.id,
        itemCount,
      });
    }

    // Get top 10 artists by item count
    const topArtistsByItemCount = (data.artists || [])
      .map((artist) => ({
        artistId: artist.id,
        name: artist.name,
        itemCount: itemCountByArtist.get(artist.id) || 0,
      }))
      .sort((a, b) => b.itemCount - a.itemCount)
      .slice(0, 10);

    return {
      artistCount,
      itemCount,
      averageItemsPerArtist: artistCount > 0 ? itemCount / artistCount : 0,
      artistsWithNoItems,
      itemDistribution,
      topArtistsByItemCount,
    };
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
      return (data.artists || []).some((a) => a.id === artistId);
    } catch (error) {
      Logger.warn(`Error checking artist existence for ID ${artistId}:`, error);
      return false;
    }
  }

  /**
   * Gets the cache status for monitoring/debugging.
   * @public
   * @returns {CacheStatus} Current cache status
   */
  public getCacheStatus(): {
    isCached: boolean;
    age: number;
    ttl: number;
    size: number | null;
  } {
    const now = Date.now();
    const age = this.cache ? now - this.cacheTimestamp : 0;

    return {
      isCached: !!this.cache && age < this.cacheTTL,
      age,
      ttl: this.cacheTTL,
      size: this.cache
        ? (this.cache.artists?.length || 0) + (this.cache.items?.length || 0)
        : null,
    };
  }

  /**
   * Refreshes the cache by forcing a new read from disk.
   * @public
   */
  public async refreshCache(): Promise<void> {
    this.invalidateCache();
    await this.readFile(); // Populate cache with fresh data
    Logger.info('Cache refreshed from disk');
  }

  /**
   * Configures cache TTL (useful for testing or different environments).
   * @public
   * @param {number} ttlMs - Time to live in milliseconds
   * @throws {Error} If TTL is negative
   */
  public setCacheTTL(ttlMs: number): void {
    if (ttlMs < 0) {
      throw new Error('Cache TTL must be non-negative');
    }

    const oldTTL = this.cacheTTL;
    this.cacheTTL = ttlMs;

    Logger.debug(`Cache TTL changed from ${oldTTL}ms to ${ttlMs}ms`);

    // If new TTL is shorter and cache is now expired, invalidate it
    if (this.cache && ttlMs > 0) {
      const now = Date.now();
      const age = now - this.cacheTimestamp;
      if (age >= ttlMs) {
        this.invalidateCache();
        Logger.debug('Cache invalidated due to reduced TTL');
      }
    }
  }

  /**
   * Retrieves multiple artists and their items in a single operation.
   * @public
   * @param {number[]} artistIds - Array of artist IDs to retrieve
   * @returns {Promise<ArtistWithtems[]>} Array of artists with their items
   * @throws {Error} If any artistId is invalid
   */
  public async getMultipleArtistWithtems(
    artistIds: number[],
  ): Promise<ArtistWithtems[]> {
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
    const results: ArtistWithtems[] = [];
    const notFound: number[] = [];

    // Create a map for efficient lookups
    const artistMap = new Map(
      (data.artists || []).map((artist) => [artist.id, artist]),
    );

    for (const artistId of artistIds) {
      const artist = artistMap.get(artistId);

      if (!artist) {
        notFound.push(artistId);
        continue;
      }

      const items = (data.items || []).filter(
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
   * Gets detailed information about the service instance.
   * @public
   * @returns {ServiceInfo} Service information
   */
  public getServiceInfo(): {
    filePath: string;
    cacheTTL: number;
    cacheStatus: {
      isCached: boolean;
      age: number;
      ttl: number;
      size: number | null;
    };
  } {
    return {
      filePath: this.filePath,
      cacheTTL: this.cacheTTL,
      cacheStatus: this.getCacheStatus(),
    };
  }
}

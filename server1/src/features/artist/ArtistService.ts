import { z } from 'zod';

import { Logger } from '../../lib/utils/logger.js';
import { getFileService } from '../../lib/utils/ServiceFactory.js';
import FilePath from '../files/FilePath.js';

import type { ItemsFile } from '../../types/ItemsFile.js';

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
export class ArtistService {
  private readonly filePath: string;
  private readonly fileService: ReturnType<typeof getFileService>;
  private readonly DEFAULT_METADATA = { title: 'artists' };

  // Cache configuration - made mutable for setCacheTTL
  private cache: ItemsFile | null = null;
  private cacheTimestamp = 0;
  private cacheTTL = 5000; // 5 seconds (no longer readonly)

  constructor(fileName = 'items.json') {
    this.filePath = FilePath.getDataDir(fileName);
    this.fileService = getFileService();
  }

  // Reads and validates the items file from disk with optional caching.
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

  // Validates and writes the items file to disk, then invalidates cache.
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

  // Invalidates the internal cache, forcing next read to fetch from disk.
  public invalidateCache(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
    Logger.debug('Cache invalidated');
  }

  // Checks if an artist exists by ID.
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

  // Gets the cache status for monitoring/debugging.
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

  // Refreshes the cache by forcing a new read from disk.
  public async refreshCache(): Promise<void> {
    this.invalidateCache();
    await this.readFile(); // Populate cache with fresh data
    Logger.info('Cache refreshed from disk');
  }

  // Configures cache TTL (useful for testing or different environments).
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
  // Gets detailed information about the service instance.
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

import type { z } from 'zod';

import { Logger } from '../utils/logger.js';
import { getFileService } from '../utils/ServiceFactory.js';

/**
 * Custom validation error with detailed validation messages
 */
export class ValidationError extends Error {
  public constructor(
    message: string,
    public validationErrors: string[],
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Configuration options for BaseDataService
 */
export type BaseDataServiceConfig<T> = {
  /** Cache TTL in milliseconds (default: 5000) */
  cacheTTL?: number;
  /** Default metadata to use when none exists */
  defaultMetadata?: Record<string, unknown>;
  /** Whether to enable caching (default: false) */
  enableCache?: boolean;
  /** Full file path to read/write */
  filePath: string;
  /** Service name for logging (default: derived from filePath) */
  serviceName?: string;
  /** Zod schema for validation (optional) */
  validationSchema?: z.ZodType<T>;
};

/**
 * Base service for managing JSON data files with optional caching and validation.
 * Provides common CRUD operations, error handling, and logging.
 *
 * @template T - The data type this service manages
 *
 * @example
 * ```typescript
 * class MyService extends BaseDataService<MyDataType> {
 *   constructor() {
 *     super({
 *       filePath: FilePath.getDataDir('mydata.json'),
 *       enableCache: true,
 *       validationSchema: MyDataSchema
 *     });
 *   }
 *
 *   // Add domain-specific methods
 *   async getItemById(id: number) {
 *     const data = await this.readFile();
 *     return data.items.find(item => item.id === id);
 *   }
 * }
 * ```
 */
export abstract class BaseDataService<T> {
  private cache: T | null = null;
  private cacheTimestamp = 0;
  private cacheTTL: number;
  private readonly defaultMetadata: Record<string, unknown> | undefined;
  private readonly enableCache: boolean;
  private readonly filePath: string;
  private readonly fileService: ReturnType<typeof getFileService>;
  private readonly serviceName: string;
  private readonly validationSchema: z.ZodType<T> | undefined;

  protected constructor(config: BaseDataServiceConfig<T>) {
    this.filePath = config.filePath;
    this.fileService = getFileService();
    this.serviceName =
      config.serviceName ??
      config.filePath
        .split(/[\\/]/)
        .pop()
        ?.replace(/\.json$/, '') ??
      'DataService';
    this.enableCache = config.enableCache ?? false;
    this.cacheTTL = config.cacheTTL ?? 5000;
    this.validationSchema = config.validationSchema ?? undefined;
    this.defaultMetadata = config.defaultMetadata ?? undefined;
  }

  // ============================================================================
  // Cache Management Methods
  // ============================================================================

  /**
   * Gets the current cache status
   * @returns Cache status information
   */
  public getCacheStatus(): {
    age: number;
    isCached: boolean;
    isEnabled: boolean;
    ttl: number;
  } {
    const now = Date.now();
    const age = this.cache ? now - this.cacheTimestamp : 0;

    return {
      age,
      isCached: !!this.cache && age < this.cacheTTL,
      isEnabled: this.enableCache,
      ttl: this.cacheTTL,
    };
  }

  /**
   * Gets detailed service information
   * @returns Service configuration and status
   */
  public getServiceInfo(): {
    cacheStatus: {
      age: number;
      isCached: boolean;
      isEnabled: boolean;
      ttl: number;
    };
    filePath: string;
    serviceName: string;
  } {
    return {
      cacheStatus: this.getCacheStatus(),
      filePath: this.filePath,
      serviceName: this.serviceName,
    };
  }

  /**
   * Invalidates the cache, forcing next read from disk
   */
  public invalidateCache(): void {
    if (!this.enableCache) {
      return;
    }

    this.cache = null;
    this.cacheTimestamp = 0;
    Logger.debug(`${this.serviceName}: Cache invalidated`);
  }

  /**
   * Refreshes the cache by reading from disk
   */
  public async refreshCache(): Promise<void> {
    if (!this.enableCache) {
      Logger.debug(`${this.serviceName}: Cache not enabled, skipping refresh`);
      return;
    }

    this.invalidateCache();
    await this.readFile();
    Logger.info(`${this.serviceName}: Cache refreshed from disk`);
  }

  /**
   * Updates the cache TTL
   * @param ttlMs - New TTL in milliseconds
   */
  public setCacheTTL(ttlMs: number): void {
    if (ttlMs < 0) {
      throw new Error('Cache TTL must be non-negative');
    }

    const oldTTL = this.cacheTTL;
    this.cacheTTL = ttlMs;

    Logger.debug(
      `${this.serviceName}: Cache TTL changed from ${oldTTL}ms to ${ttlMs}ms`,
    );

    // Invalidate cache if new TTL makes it expired
    if (this.cache && ttlMs > 0) {
      const now = Date.now();
      const age = now - this.cacheTimestamp;
      if (age >= ttlMs) {
        this.invalidateCache();
        Logger.debug(
          `${this.serviceName}: Cache invalidated due to reduced TTL`,
        );
      }
    }
  }

  // ============================================================================
  // File Operations
  // ============================================================================

  /**
   * Reads data from file with optional caching and validation
   * @returns The data from the file
   * @throws Error if read or validation fails
   */
  protected async readFile(): Promise<T> {
    try {
      // Check cache first if enabled
      if (this.enableCache) {
        const now = Date.now();
        if (this.cache && now - this.cacheTimestamp < this.cacheTTL) {
          Logger.debug(`${this.serviceName}: Returning cached data`);
          return this.cache;
        }
      }

      Logger.debug(`${this.serviceName}: Reading file from ${this.filePath}`);
      const rawData = await this.fileService.readFile<unknown>(this.filePath);

      if (!rawData) {
        throw new Error('File data is undefined or null');
      }

      // Validate if schema provided
      let data: T;
      if (this.validationSchema) {
        const validationResult = this.validationSchema.safeParse(rawData);

        if (!validationResult.success) {
          const errors = validationResult.error.issues
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join('; ');
          Logger.error(
            `${this.serviceName}: Data validation failed - ${errors}`,
          );
          throw new ValidationError(
            `Invalid file structure: ${errors}`,
            errors.split('; '),
          );
        }

        const { data: validatedData } = validationResult;
        data = validatedData;

        // Apply default metadata if configured
        if (this.defaultMetadata && typeof data === 'object' && data !== null) {
          const dataObj = data as Record<string, unknown>;
          if (!dataObj['metadata']) {
            (data as Record<string, unknown>)['metadata'] =
              this.defaultMetadata;
          }
        }
      } else {
        data = rawData as T;
      }

      // Update cache if enabled
      if (this.enableCache) {
        this.cache = data;
        this.cacheTimestamp = Date.now();
      }

      Logger.info(`${this.serviceName}: Successfully loaded data`);
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `${this.serviceName}: Failed to read file at ${this.filePath} - ${errorMessage}`,
      );

      if (error instanceof Error) {
        throw new Error(
          `Error reading ${this.serviceName} file: ${errorMessage}`,
          { cause: error },
        );
      }
      throw new Error(
        `Error reading ${this.serviceName} file: ${errorMessage}`,
      );
    }
  }

  /**
   * Writes data to file with optional validation
   * @param data - Data to write
   * @throws Error if validation or write fails
   */
  protected async writeFile(data: T): Promise<void> {
    try {
      // Validate if schema provided
      if (this.validationSchema) {
        const validationResult = this.validationSchema.safeParse(data);

        if (!validationResult.success) {
          const errors = validationResult.error.issues
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join('; ');
          throw new ValidationError(
            `Invalid data structure: ${errors}`,
            errors.split('; '),
          );
        }
      }

      await this.fileService.writeFile(data, this.filePath);

      // Invalidate cache after successful write
      if (this.enableCache) {
        this.invalidateCache();
      }

      Logger.info(
        `${this.serviceName}: Successfully wrote data to ${this.filePath}`,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `${this.serviceName}: Failed to write file at ${this.filePath} - ${errorMessage}`,
      );

      if (error instanceof Error) {
        throw new Error(
          `Error writing ${this.serviceName} file: ${errorMessage}`,
          { cause: error },
        );
      }
      throw new Error(
        `Error writing ${this.serviceName} file: ${errorMessage}`,
      );
    }
  }
}

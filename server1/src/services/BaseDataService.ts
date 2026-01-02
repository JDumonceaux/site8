import type { ZodType } from 'zod';

import type { IDataService } from './IDataService.js';

import { getFileService } from '../utils/ServiceFactory.js';
import { CacheManager } from './CacheManager.js';
import { DataValidator, ValidationError } from './DataValidator.js';
import { ErrorHandler } from './ErrorHandler.js';

// Re-export ValidationError for backward compatibility
export { ValidationError };

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
  validationSchema?: ZodType<T>;
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
export abstract class BaseDataService<T> implements IDataService<T> {
  private readonly cacheManager: CacheManager<T>;
  private readonly errorHandler: ErrorHandler;
  private readonly filePath: string;
  private readonly fileService: ReturnType<typeof getFileService>;
  private readonly validator: DataValidator<T>;

  protected constructor(config: BaseDataServiceConfig<T>) {
    this.filePath = config.filePath;
    this.fileService = getFileService();

    // Auto-derive serviceName from class name (this.constructor.name) if not provided
    // Falls back to filename if class name is just 'Object' or unavailable
    const className = this.constructor.name;
    const fileBasedName =
      config.filePath
        .split(/[\\/]/)
        .pop()
        ?.replace(/\.json$/, '') ?? 'DataService';

    const serviceName =
      config.serviceName ??
      (className && className !== 'Object' ? className : fileBasedName);

    // Initialize utility classes
    this.cacheManager = new CacheManager<T>({
      cacheTTL: config.cacheTTL ?? 5000,
      enabled: config.enableCache ?? false,
      serviceName,
    });

    this.validator = new DataValidator<T>({
      defaultMetadata: config.defaultMetadata,
      serviceName,
      validationSchema: config.validationSchema,
    });

    this.errorHandler = new ErrorHandler({ serviceName });
  }

  // ============================================================================
  // Cache Management Methods
  // ============================================================================

  /**
   * Fixes all entries by applying a cleanup function to each item
   * @param cleanupFn - Function to clean up each item
   */
  public async fixAllEntries<TItem>(
    cleanupFn: (item: TItem) => TItem,
  ): Promise<void> {
    this.errorHandler.info('fixAllEntries');

    try {
      const data = await this.getItems();
      const dataWithItems = data as { items?: TItem[] };

      if (!dataWithItems?.items) {
        throw new Error('No items found');
      }

      const cleanedItems = dataWithItems.items.map((item) => cleanupFn(item));
      const newData = { ...data, items: cleanedItems } as T;

      await this.writeFile(newData);
      this.errorHandler.info('Successfully fixed all entries');
    } catch (error) {
      this.errorHandler.handle(error, 'fixing entries');
    }
  }

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
    return this.cacheManager.getStatus();
  }

  /**
   * Gets all items from the data file
   * @returns The data from the file or undefined on error
   */
  public async getItems(): Promise<T | undefined> {
    this.errorHandler.info('getItems');

    try {
      const parsedData = await this.readFile();
      this.errorHandler.info('Successfully retrieved items');
      return parsedData;
    } catch (error) {
      if (error instanceof SyntaxError) {
        this.errorHandler.handle(error, 'parsing JSON');
      } else {
        this.errorHandler.handle(error, 'reading items');
      }
    }
  }

  /**
   * Gets the next available ID from items array
   * @returns Next available ID or undefined on error
   */
  public async getNextId(): Promise<number | undefined> {
    this.errorHandler.info('getNextId');

    try {
      const data = await this.getItems();
      const items = (data as { items?: { id: number }[] })?.items;

      if (!items || items.length === 0) {
        return 1;
      }

      const maxId = Math.max(...items.map((item) => item.id));
      const nextId = maxId + 1;

      this.errorHandler.info(`Next ID is ${nextId}`);
      return nextId;
    } catch (error) {
      this.errorHandler.handle(error, 'getting next ID');
    }
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
      serviceName: this.errorHandler['serviceName'],
    };
  }

  // ============================================================================
  // File Operations
  // ============================================================================

  /**
   * Invalidates the cache, forcing next read from disk
   */
  public invalidateCache(): void {
    this.cacheManager.invalidate();
  }

  /**
   * Lists duplicate IDs in the items array
   * @returns Object containing array of duplicate ID strings
   */
  public async listDuplicates(): Promise<{ readonly items: string[] }> {
    this.errorHandler.info('listDuplicates');

    try {
      const data = await this.getItems();
      const items = (data as { items?: { id: number }[] })?.items;

      if (!items) {
        return { items: [] };
      }

      const allIds = items.map((x) => x.id.toString());
      const duplicates = allIds.filter((x, i, arr) => arr.indexOf(x) !== i);
      const filtered = new Set(duplicates)
        .difference(new Set(['', null, undefined]))
        .values()
        .toArray();

      this.errorHandler.info(`Found ${filtered.length} duplicates`);
      return { items: filtered };
    } catch (error) {
      this.errorHandler.handle(error, 'listing duplicates');
    }
  }

  // ============================================================================
  // Generic CRUD Operations
  // ============================================================================

  /**
   * Refreshes the cache by reading from disk
   */
  public async refreshCache(): Promise<void> {
    this.cacheManager.invalidate();
    await this.readFile();
    this.errorHandler.info('Cache refreshed from disk');
  }

  /**
   * Updates the cache TTL
   * @param ttlMs - New TTL in milliseconds
   */
  public setCacheTTL(ttlMs: number): void {
    this.cacheManager.setTTL(ttlMs);
  }

  /**
   * Writes data to the file
   * @param data - Data to write
   */
  public async writeData(data: T): Promise<void> {
    this.errorHandler.info('writeData');
    await this.writeFile(data);
  }

  /**
   * Reads data from file with optional caching and validation
   * @returns The data from the file
   * @throws Error if read or validation fails
   */
  protected async readFile(): Promise<T> {
    try {
      // Check cache first if enabled
      const cachedData = this.cacheManager.get();
      if (cachedData) {
        return cachedData;
      }

      this.errorHandler.info(`Reading file from ${this.filePath}`);
      const rawData = await this.fileService.readFile<unknown>(this.filePath);

      if (!rawData) {
        throw new Error('File data is undefined or null');
      }

      // Validate data
      const data = this.validator.validate(rawData);

      // Update cache if enabled
      this.cacheManager.set(data);

      this.errorHandler.info('Successfully loaded data');
      return data;
    } catch (error) {
      this.errorHandler.handle(error, `reading file at ${this.filePath}`);
    }
  }

  /**
   * Writes data to file with optional validation
   * @param data - Data to write
   * @throws Error if validation or write fails
   */
  protected async writeFile(data: T): Promise<void> {
    try {
      // Validate data
      this.validator.validate(data);

      await this.fileService.writeFile(data, this.filePath);

      // Invalidate cache after successful write
      this.cacheManager.invalidate();

      this.errorHandler.info(`Successfully wrote data to ${this.filePath}`);
    } catch (error) {
      this.errorHandler.handle(error, `writing file at ${this.filePath}`);
    }
  }
}

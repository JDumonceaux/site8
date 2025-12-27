import { Logger } from '../utils/logger.js';

/**
 * Configuration for cache management
 */
export type CacheConfig = {
  /** Cache TTL in milliseconds */
  cacheTTL: number;
  /** Whether caching is enabled */
  enabled: boolean;
  /** Service name for logging */
  serviceName: string;
};

/**
 * Manages caching for data services
 * Handles cache storage, TTL validation, and invalidation
 */
export class CacheManager<T> {
  private cache: T | null = null;
  private cacheTimestamp = 0;
  private cacheTTL: number;
  private readonly enabled: boolean;
  private readonly serviceName: string;

  public constructor(config: CacheConfig) {
    this.enabled = config.enabled;
    this.cacheTTL = config.cacheTTL;
    this.serviceName = config.serviceName;
  }

  /**
   * Gets cached data if available and not expired
   * @returns Cached data or null if not available/expired
   */
  public get(): T | null {
    if (!this.enabled) {
      return null;
    }

    const now = Date.now();
    if (this.cache && now - this.cacheTimestamp < this.cacheTTL) {
      Logger.debug(`${this.serviceName}: Returning cached data`);
      return this.cache;
    }

    return null;
  }

  /**
   * Gets the current cache status
   * @returns Cache status information
   */
  public getStatus(): {
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
      isEnabled: this.enabled,
      ttl: this.cacheTTL,
    };
  }

  /**
   * Invalidates the cache, forcing next read from source
   */
  public invalidate(): void {
    if (!this.enabled) {
      return;
    }

    this.cache = null;
    this.cacheTimestamp = 0;
    Logger.debug(`${this.serviceName}: Cache invalidated`);
  }

  /**
   * Stores data in cache with current timestamp
   * @param data - Data to cache
   */
  public set(data: T): void {
    if (!this.enabled) {
      return;
    }

    this.cache = data;
    this.cacheTimestamp = Date.now();
  }

  /**
   * Updates the cache TTL
   * @param ttlMs - New TTL in milliseconds
   */
  public setTTL(ttlMs: number): void {
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
        this.invalidate();
        Logger.debug(
          `${this.serviceName}: Cache invalidated due to reduced TTL`,
        );
      }
    }
  }
}

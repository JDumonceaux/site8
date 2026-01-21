/**
 * Service Container - Manages service instances with dependency injection
 *
 * This container automatically handles service instantiation and dependency resolution.
 * Services are lazily instantiated on first request and cached for reuse.
 */
// NOTE: This file intentionally imports feature service implementations.
// The service factory is the centralized instantiation point for all services,
// and disabling import/no-restricted-paths here maintains architectural intent.
/* eslint-disable import/no-restricted-paths */
/* eslint-disable no-restricted-syntax */

// NOTE: This is the correct format.  GPT 5.0 fixes are incorrect.
import { ArtistsService } from '../features/artists/ArtistsService.js';
import { MenuService } from '../features/menu/MenuService.js';
import { PageFileService } from '../features/page/PageFileService.js';
import { PageService } from '../features/page/PageService.js';
import { TestService } from '../features/test/TestService.js';
import { TestsGroupsService } from '../features/tests/TestsGroupsService.js';
import { TestsService } from '../features/tests/TestsService.js';
import { PlacesMenuService } from '../features/travel/PlacesMenuService.js';
import { TravelService } from '../features/travel/TravelService.js';
import { GenericService } from '../lib/generic/GenericService.js';
import { PrettierService } from '../services/code-quality/PrettierService.js';

/**
 * Service container that manages singleton instances
 */
class ServiceContainer {
  private readonly services = new Map<string, unknown>();

  public getArtistsService(): ArtistsService {
    return this.getOrCreate('ArtistsService', () => new ArtistsService());
  }

  public getGenericService(): GenericService {
    return this.getOrCreate('GenericService', () => new GenericService());
  }

  public getMenuService(): MenuService {
    return this.getOrCreate('MenuService', () => new MenuService());
  }

  public getPageFileService(): PageFileService {
    return this.getOrCreate('PageFileService', () => new PageFileService());
  }

  public getPageService(): PageService {
    return this.getOrCreate('PageService', () => new PageService());
  }

  public getPlacesMenuService(): PlacesMenuService {
    return this.getOrCreate(
      'PlacesMenuService',
      () => new PlacesMenuService(this.getTravelService()),
    );
  }

  public getPrettierService(): PrettierService {
    return this.getOrCreate('PrettierService', () => new PrettierService());
  }

  public getTestService(): TestService {
    return this.getOrCreate('TestService', () => new TestService());
  }

  public getTestsGroupsService(): TestsGroupsService {
    return this.getOrCreate(
      'TestsGroupsService',
      () => new TestsGroupsService(),
    );
  }

  public getTestsService(): TestsService {
    return this.getOrCreate('TestsService', () => new TestsService());
  }

  public getTravelService(): TravelService {
    return this.getOrCreate('TravelService', () => new TravelService());
  }

  /**
   * Clears all cached service instances (useful for testing)
   */
  public reset(): void {
    this.services.clear();
  }

  /**
   * Gets or creates a service instance
   */
  private getOrCreate<T>(key: string, factory: () => T): T {
    if (!this.services.has(key)) {
      this.services.set(key, factory());
    }
    return this.services.get(key) as T;
  }
}

// Global container instance
const container = new ServiceContainer();

// Export factory functions for backward compatibility
export const getArtistsService = (): ArtistsService =>
  container.getArtistsService();
export const getGenericService = (): GenericService =>
  container.getGenericService();
export const getMenuService = (): MenuService => container.getMenuService();
export const getPageService = (): PageService => container.getPageService();
export const getPageFileService = (): PageFileService =>
  container.getPageFileService();
export const getPlacesMenuService = (): PlacesMenuService =>
  container.getPlacesMenuService();
export const getPrettierService = (): PrettierService =>
  container.getPrettierService();
export const getTestService = (): TestService => container.getTestService();
export const getTestsService = (): TestsService => container.getTestsService();
export const getTestsGroupsService = (): TestsGroupsService =>
  container.getTestsGroupsService();
export const getTravelService = (): TravelService =>
  container.getTravelService();

// Export container for testing
export const serviceContainer = container;

/**
 * Service Container - Manages service instances with dependency injection
 *
 * This container automatically handles service instantiation and dependency resolution.
 * Services are lazily instantiated on first request and cached for reuse.
 */

import { ArtistsService } from '../features/artists/ArtistsService.js';
import { BookmarksService } from '../features/bookmarks/BookmarksService.js';
import { BuildService } from '../services/build/BuildService.js';
import { FileService } from '../lib/filesystem/FileService.js';
import { ImageService } from '../features/image/ImageService.js';
import { ImagesFileService } from '../features/images/ImagesFileService.js';
import { ImagesService } from '../features/images/ImagesService.js';
import { ItemsService } from '../features/items/ItemsService.js';
import { MenuService } from '../features/menu/MenuService.js';
import { MusicService } from '../features/music/MusicService.js';
import { PageFileService } from '../features/page/PageFileService.js';
import { PageService } from '../features/page/PageService.js';
import { PagesService } from '../features/pages/PagesService.js';
import { PhotosService } from '../features/photos/PhotosService.js';
import { PrettierService } from '../services/code-quality/PrettierService.js';
import { TestsService } from '../features/tests/TestsService.js';
import { TravelService } from '../features/travel/TravelService.js';

/**
 * Service container that manages singleton instances
 */
class ServiceContainer {
  private readonly services: Map<string, unknown> = new Map();

  /**
   * Gets or creates a service instance
   */
  private getOrCreate<T>(key: string, factory: () => T): T {
    if (!this.services.has(key)) {
      this.services.set(key, factory());
    }
    return this.services.get(key) as T;
  }

  public getArtistsService(): ArtistsService {
    return this.getOrCreate('ArtistsService', () => new ArtistsService());
  }

  public getBookmarksService(): BookmarksService {
    return this.getOrCreate('BookmarksService', () => new BookmarksService());
  }

  public getBuildService(): BuildService {
    return this.getOrCreate('BuildService', () => new BuildService());
  }

  public getFileService(): FileService {
    return this.getOrCreate('FileService', () => new FileService());
  }

  public getImageService(): ImageService {
    return this.getOrCreate('ImageService', () => new ImageService());
  }

  public getImagesFileService(): ImagesFileService {
    return this.getOrCreate('ImagesFileService', () => new ImagesFileService());
  }

  public getImagesService(): ImagesService {
    return this.getOrCreate('ImagesService', () => new ImagesService());
  }

  public getItemsService(): ItemsService {
    return this.getOrCreate('ItemsService', () => new ItemsService());
  }

  public getMenuService(): MenuService {
    return this.getOrCreate(
      'MenuService',
      () => new MenuService(this.getPagesService()),
    );
  }

  public getMusicService(): MusicService {
    return this.getOrCreate('MusicService', () => new MusicService());
  }

  public getPageService(): PageService {
    return this.getOrCreate('PageService', () => new PageService());
  }

  public getPageFileService(): PageFileService {
    return this.getOrCreate('PageFileService', () => new PageFileService());
  }

  public getPagesService(): PagesService {
    return this.getOrCreate('PagesService', () => new PagesService());
  }

  public getPhotosService(): PhotosService {
    return this.getOrCreate('PhotosService', () => new PhotosService());
  }

  public getPrettierService(): PrettierService {
    return this.getOrCreate('PrettierService', () => new PrettierService());
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
}

// Global container instance
const container = new ServiceContainer();

// Export factory functions for backward compatibility
export const getArtistsService = (): ArtistsService =>
  container.getArtistsService();
export const getBookmarksService = (): BookmarksService =>
  container.getBookmarksService();
export const getBuildService = (): BuildService => container.getBuildService();
export const getFileService = (): FileService => container.getFileService();
export const getImageService = (): ImageService => container.getImageService();
export const getImagesFileService = (): ImagesFileService =>
  container.getImagesFileService();
export const getImagesService = (): ImagesService =>
  container.getImagesService();
export const getItemsService = (): ItemsService => container.getItemsService();
export const getMenuService = (): MenuService => container.getMenuService();
export const getMusicService = (): MusicService => container.getMusicService();
export const getPageService = (): PageService => container.getPageService();
export const getPageFileService = (): PageFileService =>
  container.getPageFileService();
export const getPagesService = (): PagesService => container.getPagesService();
export const getPhotosService = (): PhotosService =>
  container.getPhotosService();
export const getPrettierService = (): PrettierService =>
  container.getPrettierService();
export const getTestsService = (): TestsService => container.getTestsService();
export const getTravelService = (): TravelService =>
  container.getTravelService();

// Export container for testing
export const serviceContainer = container;

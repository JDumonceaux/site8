import { ImagesFileService } from '../../features/images/ImagesFileService.js';
import { PageFileService } from '../../features/page/PageFileService.js';
import { ArtistsService } from '../../features/artists/ArtistsService.js';
import { BookmarksService } from '../../features/bookmarks/BookmarksService.js';
import { FileService } from '../../features/files/FileService.js';
import { ImageService } from '../../features/image/ImageService.js';
import { ImagesService } from '../../features/images/ImagesService.js';
import { ItemsService } from '../../features/items/ItemsService.js';
import { MenuService } from '../../features/menu/MenuService.js';
import { PageService } from '../../features/page/PageService.js';
import { PagesService } from '../../features/pages/PagesService.js';
import { PhotosService } from '../../features/photos/PhotosService.js';
import { TestsService } from '../../features/tests/TestsService.js';
import { BuildService } from '../../features/build/BuildService.js';

export class ServiceFactory {
  public static getArtistsService() {
    return new ArtistsService();
  }
  public static getBookmarksService() {
    return new BookmarksService();
  }
  public static getBuildService() {
    return new BuildService();
  }
  public static getFileService() {
    return new FileService();
  }
  public static getImageService() {
    return new ImageService();
  }
  public static getImagesFileService() {
    return new ImagesFileService();
  }
  public static getImagesService() {
    return new ImagesService();
  }
  public static getItemsService() {
    return new ItemsService();
  }
  public static getMenuService() {
    return new MenuService();
  }
  public static getPageService() {
    return new PageService();
  }
  public static getPageFileService() {
    return new PageFileService();
  }
  public static getPagesService() {
    return new PagesService();
  }
  public static getPhotosService() {
    return new PhotosService();
  }
  public static getTestsService() {
    return new TestsService();
  }
}

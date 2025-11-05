import { ArtistsService } from '../../features/artists/ArtistsService.js';
import { BookmarksService } from '../../features/bookmarks/BookmarksService.js';
import { BuildService } from '../../features/build/BuildService.js';
import { FileService } from '../../features/files/FileService.js';
import { ImageService } from '../../features/image/ImageService.js';
import { ImagesFileService } from '../../features/images/ImagesFileService.js';
import { ImagesService } from '../../features/images/ImagesService.js';
import { ItemsService } from '../../features/items/ItemsService.js';
import { MenuService } from '../../features/menu/MenuService.js';
import { PageFileService } from '../../features/page/PageFileService.js';
import { PageService } from '../../features/page/PageService.js';
import { PagesService } from '../../features/pages/PagesService.js';
import { PhotosService } from '../../features/photos/PhotosService.js';
import { PrettierService } from '../../features/prettier/PrettierService.js';
import { TestsService } from '../../features/tests/TestsService.js';

let artistsService: ArtistsService | null = null;
let bookmarksService: BookmarksService | null = null;
let buildService: BuildService | null = null;
let fileService: FileService | null = null;
let imageService: ImageService | null = null;
let imagesFileService: ImagesFileService | null = null;
let imagesService: ImagesService | null = null;
let itemsService: ItemsService | null = null;
let menuService: MenuService | null = null;
let pageService: PageService | null = null;
let pageFileService: PageFileService | null = null;
let pagesService: PagesService | null = null;
let photosService: PhotosService | null = null;
let prettierService: PrettierService | null = null;
let testsService: TestsService | null = null;

export const getArtistsService = (): ArtistsService => {
  artistsService ??= new ArtistsService();
  return artistsService;
};

export const getBookmarksService = (): BookmarksService => {
  bookmarksService ??= new BookmarksService();
  return bookmarksService;
};

export const getBuildService = (): BuildService => {
  buildService ??= new BuildService();
  return buildService;
};

export const getFileService = (): FileService => {
  fileService ??= new FileService();
  return fileService;
};

export const getImageService = (): ImageService => {
  imageService ??= new ImageService();
  return imageService;
};

export const getImagesFileService = (): ImagesFileService => {
  imagesFileService ??= new ImagesFileService();
  return imagesFileService;
};

export const getImagesService = (): ImagesService => {
  imagesService ??= new ImagesService();
  return imagesService;
};

export const getItemsService = (): ItemsService => {
  itemsService ??= new ItemsService();
  return itemsService;
};

export const getMenuService = (): MenuService => {
  menuService ??= new MenuService();
  return menuService;
};

export const getPageService = (): PageService => {
  pageService ??= new PageService();
  return pageService;
};

export const getPageFileService = (): PageFileService => {
  pageFileService ??= new PageFileService();
  return pageFileService;
};

export const getPagesService = (): PagesService => {
  pagesService ??= new PagesService();
  return pagesService;
};

export const getPhotosService = (): PhotosService => {
  photosService ??= new PhotosService();
  return photosService;
};

export const getPrettierService = (): PrettierService => {
  prettierService ??= new PrettierService();
  return prettierService;
};

export const getTestsService = (): TestsService => {
  testsService ??= new TestsService();
  return testsService;
};

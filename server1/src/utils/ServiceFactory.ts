/* eslint-disable import/no-restricted-paths, import/no-cycle */
import { ArtistsService } from '../features/artists/ArtistsService.js';
import { BookmarksService } from '../features/bookmarks/BookmarksService.js';
import { BuildService } from '../features/build/BuildService.js';
import { FileService } from '../features/files/FileService.js';
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
import { PrettierService } from '../features/prettier/PrettierService.js';
import { TestsService } from '../features/tests/TestsService.js';
import { TravelService } from '../features/travel/TravelService.js';

let artistsService: null | ArtistsService = null;
let bookmarksService: null | BookmarksService = null;
let buildService: null | BuildService = null;
let fileService: null | FileService = null;
let imageService: null | ImageService = null;
let imagesFileService: null | ImagesFileService = null;
let imagesService: null | ImagesService = null;
let itemsService: null | ItemsService = null;
let menuService: null | MenuService = null;
let musicService: null | MusicService = null;
let pageFileService: null | PageFileService = null;
let pageService: null | PageService = null;
let pagesService: null | PagesService = null;
let photosService: null | PhotosService = null;
let prettierService: null | PrettierService = null;
let testsService: null | TestsService = null;
let travelService: null | TravelService = null;

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

export const getMusicService = (): MusicService => {
  musicService ??= new MusicService();
  return musicService;
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

export const getTravelService = (): TravelService => {
  travelService ??= new TravelService();
  return travelService;
};

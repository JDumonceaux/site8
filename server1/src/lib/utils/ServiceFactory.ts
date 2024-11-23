import { PageService } from '../../feature/page/PageService.js';
import { PagesService } from '../../feature/pages/PagesService.js';
import { FileService } from '../../feature/files/FileService.js';
import { MenuService } from '../../feature/menu/MenuService.js';

export class ServiceFactory {
  public static getFileService() {
    return new FileService();
  }
  public static getMenuService() {
    return new MenuService();
  }
  public static getPageService() {
    return new PageService();
  }
  public static getPagesService() {
    return new PagesService();
  }
}

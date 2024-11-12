import { PageService } from '../../feature/page/services/PageService.js';
import { PagesService } from '../../feature/pages/services/PagesService.js';
import { FileService } from '../../feature/files/services/FileService.js';
import { MenuService } from '../../feature/menu/services/MenuService.js';

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

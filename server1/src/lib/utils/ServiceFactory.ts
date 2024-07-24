import { FileService } from '../../services/FileService.js';
import { MenuService } from '../../services/MenuService.js';
import { PageService } from '../../services/PageService.js';
import { PagesService } from '../../services/PagesService.js';

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

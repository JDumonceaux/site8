import { Logger } from '../utils/Logger.js';
import { Menus } from 'models/Menus.js';
import { Menu } from 'models/Menu.js';
import { PagesService } from './PagesService.js';
import { PageSummary } from 'models/PageSummary.js';

export class MenuService {
  public async getMenus(): Promise<Menus | undefined> {
    Logger.info(`MenuService: getMenus -> `);
    try {
      const service = new PagesService();
      const data = await service.getItems();

      if (!data) {
        return undefined;
      }

      const sortedMenu: Menu[] = data.menus.toSorted((a, b) => a.seq - b.seq);
      const ret: Menus = {
        items: sortedMenu.map((item) => {
          const pages = data.items.filter((x) => x.parentId === item.id);
          const mapMenuItems: PageSummary[] = pages.map((x) => ({
            id: x.id,
            name: x.name,
          }));
          return {
            ...item,
            items: mapMenuItems,
          };
        }),
      };
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getMenus --> Error: ${error}`);
      throw error;
    }
  }
}

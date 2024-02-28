import { Logger } from '../utils/Logger.js';
import { Menu } from 'types/Menu.js';
import { PagesService } from './PagesService.js';

export class MenuService {
  public async getMenu(): Promise<Menu | undefined> {
    Logger.info(`MenuService: getMenu -> `);
    try {
      const service = new PagesService();
      const data = await service.getItems(); // Await the getItems method call

      if (data) {
        const ret: Menu = {};
        const sorted = data.menu.items.toSorted((a, b) => a.seq - b.seq); // Use the sort method instead of toSorted

        ret.items = { ...sorted };
        return ret;
      }

      return undefined;
    } catch (error) {
      Logger.error(`MenuService: getItem --> Error: ${error}`);
      throw new Error(`getItem -> Failed to read file: ${error}`);
    }
  }
}

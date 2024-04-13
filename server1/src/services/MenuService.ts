import { readFile } from 'fs/promises';

import { Logger } from '../utils/Logger.js';
import { Pages } from '../types/Pages.js';
import { Menu } from '../types/Menu.js';
import { getFilePath } from '../utils/getFilePath.js';
import { Page } from '../types/Page.js';

export class MenuService {
  private fileName = 'pagesIndex.json';
  private filePath = '';

  constructor() {
    this.filePath = getFilePath(this.fileName);
  }

  // Get all data
  private async getItems(): Promise<Pages | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as Pages;
    } catch (error) {
      Logger.error(`MenuService: getItems -> ${error}`);
      return undefined;
    }
  }

  private getRestructuredMenu(
    menus?: Menu[] | undefined,
    pages?: Page[],
  ): Menu[] | undefined {
    try {
      if (!menus) {
        return undefined;
      }

      const restructuredMenu = menus.map((menu) => {
        const items = menu.items?.map((item) => {
          const filteredPages = pages?.filter(
            (page) => page.parentId === item.id,
          );
          return {
            ...item,
            pages: filteredPages,
          };
        });

        return {
          ...menu,
          items,
        };
      });

      return restructuredMenu;
    } catch (error) {
      Logger.error(`MenuService: getRestructuredMenu -> ${error}`);
      return undefined;
    }
  }

  public async getMenus(): Promise<Pages | undefined> {
    Logger.info(`MenuService: getMenus -> `);
    try {
      // Get all the data from pagesIndex.json
      const data: Pages | undefined = await this.getItems();

      if (!data || !data.menus) {
        return undefined;
      }

      // Restructure the menus
      const restructuredMenus = this.getRestructuredMenu(
        data.menus,
        data.pages,
      );

      return { metadata: data.metadata, menus: restructuredMenus };

      // Sort the menus by seq
      // const sortedMenu: Menu[] = data.menus.toSorted((a, b) => a.seq - b.seq);
      // const ret: Pages = {
      //   metadata: data.metadata,
      //   items: sortedMenu.map((item) => {
      //     const pages = data.items.filter((x) => x.parentId === item.id);

      //     // Convert the pages to PageSummary
      //     const mapMenuItems: PageSummary[] = pages.map((x) => ({
      //       id: x.id,
      //       name: x.name,
      //       url: x.url ?? '',
      //       seq: x.seq ?? 0,
      //     }));
      //     // Sort Items
      //     const sortedMapMenuItems: PageSummary[] =
      //       item.sort === 'seq'
      //         ? mapMenuItems.toSorted((a, b) => a.seq - b.seq)
      //         : mapMenuItems.toSorted((a, b) => a.name.localeCompare(b.name));

      //     return {
      //       ...item,
      //       pages: sortedMapMenuItems,
      //     };
      //   }),
      // };
      // return ret;
    } catch (error) {
      Logger.error(`MenuService: getMenus --> Error: ${error}`);
      throw error;
    }
  }
}

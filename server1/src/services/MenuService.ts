import { readFile } from 'fs/promises';

import { Logger } from '../utils/Logger.js';
import { Pages } from '../types/Pages.js';
import { MenuItem } from '../types/MenuItem.js';
import { getFilePath } from '../utils/getFilePath.js';
import { Page } from '../types/Page.js';
import { Menu } from 'types/Menu.js';
import { MenuLevel } from 'types/MenuLevel.js';
import { MenuEntry } from 'types/MenuEntry.js';

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

  // Sort the MenuEntry by seq, then name
  private sortMenuEntry(ob1: MenuEntry, ob2: MenuEntry) {
    if (ob1.seq > ob2.seq) {
      return 1;
    } else if (ob1.seq < ob2.seq) {
      return -1;
    }

    // Else go to the 2nd item
    if (ob1.name < ob2.name) {
      return -1;
    } else if (ob1.name > ob2.name) {
      return 1;
    } else {
      // nothing to split them
      return 0;
    }
  }

  // Convert the MenuItems to MenuEntry
  private fillMenu(
    id: number,
    menuItems?: ReadonlyArray<MenuItem>,
  ): MenuEntry[] | undefined {
    if (!menuItems) {
      return undefined;
    }

    // Get the MenuItems for the current parent
    const currMenus: MenuItem[] = menuItems.filter((item) =>
      item.parent?.some((x) => x.id === id),
    );

    // Declare the return array
    const ret: MenuEntry[] = currMenus.map((item) => {
      const x = item.parent.find((x) => x.id === id);
      return {
        id: item.id,
        name: item.name,
        type: 'menu',
        parentId: id,
        seq: x && x.seq ? x.seq : 0,
        sortby: item.sortby || 'name',
        menuItem: item,
        pageItem: undefined,
        items: this.fillMenu(item.id, menuItems),
        url: item.url,
        to: item.to,
        toComplete: item.to,
      };
    });
    return ret;
  }

  // Get the root level and convert the MenuItems to MenuEntry
  private getRootMenu(
    menuItems?: ReadonlyArray<MenuItem>,
  ): MenuEntry[] | undefined {
    try {
      if (!menuItems) {
        return undefined;
      }

      // Get the MenuItems for the current level
      const currMenus: MenuItem[] = menuItems.filter((item) =>
        item.parent?.some((x) => x.id === 0),
      );

      // Declare the return array
      const ret: MenuEntry[] | undefined = this.fillMenu(0, menuItems);
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getRootMenu -> ${error}`);
    }
    return undefined;
  }

  // Convert the MenuItems to MenuEntry
  private getExpandedMenu(
    menuItems?: ReadonlyArray<MenuItem>,
    menuRoot?: ReadonlyArray<MenuEntry>,
  ): MenuEntry[] | undefined {
    try {
      if (!menuItems || !menuRoot) {
        return undefined;
      }

      const ret: MenuEntry[] | undefined = [];
      menuRoot.forEach((item) => {
        const x: MenuEntry[] | undefined = this.fillMenu(item.id, menuItems);
        ret.push({ ...item, items: x });
      });
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getExpandedMenu -> ${error}`);
    }
    return undefined;
  }

  // Add in the pages as Menu Entry
  private getPages(
    items?: ReadonlyArray<MenuEntry> | undefined,
    pages?: ReadonlyArray<Page>,
  ): MenuEntry[] | undefined {
    console.log('items1', items);
    console.log('pages1', pages);
    try {
      if (!items || !pages) {
        return undefined;
      }
      // Declare the return array
      const ret: MenuEntry[] | undefined = [];

      console.log('items', items);

      items.forEach((item) => {
        // Add pages to the menu
        const filteredPages = pages.filter((page) =>
          page.parent?.some((x) => x.id === item.id),
        );

        console.log('item23232', item);

        console.log('filteredPages', filteredPages);
        const temp: MenuEntry[] | undefined = [];

        filteredPages.forEach((page) => {
          const x = page.parent.find((x) => x.id === item.id);
          const y = this.getPages(item.items, pages);

          temp.push({
            id: page.id,
            name: page.name,
            type: 'page',
            parentId: item.id,
            seq: x && x.seq ? x.seq : 0,
            sortby: item.sortby || 'name',
            pageItem: page,
            menuItem: undefined,
            items: y ? item.items?.concat(y) : item.items,
            url: page.url,
            to: page.to,
          });

          console.log('push', temp);
          ret.push({ ...item, items: temp });
        });
      });
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getPages -> ${error}`);
    }
    return undefined;
  }

  public async getMenu(): Promise<Menu | undefined> {
    Logger.info(`MenuService: getMenu -> `);
    try {
      // Get all the data from pagesIndex.json
      const data: Pages | undefined = await this.getItems();

      if (!data) {
        return undefined;
      }

      // Get the root level menu
      const x = this.getRootMenu(data.menuItems);
      // Get child menu items
      const y = this.getExpandedMenu(data.menuItems, x);
      // Add in pages
      const z = this.getPages(y, data.pages);
      console.log('z33', z);
      // Sort all the menu items: mixing menu and pages

      // Fill in URLs

      return {
        metadata: data.metadata,
        items: z,
      };
    } catch (error) {
      Logger.error(`MenuService: getMenu --> Error: ${error}`);
      throw error;
    }
  }
}

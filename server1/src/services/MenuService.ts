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

  // Convert the MenuItems to MenuEntry
  private getExpandedMenu(
    level: number,
    menuItems?: ReadonlyArray<MenuItem>,
  ): MenuEntry[] | undefined {
    try {
      if (!menuItems) {
        return undefined;
      }
      // Declare the return array
      const ret: MenuEntry[] = [];
      // Get the MenuItems for the current level
      const currMenus = menuItems.filter((x) => x.level?.includes(level));
      // Map the current level (0) MenuItem to MenuEntry
      currMenus.forEach((item) => {
        ret.push({
          id: item.id,
          name: item.name,
          seq: 0,
          parentId: 0,
          type: 'menu',
          level: level,
          sortby: item.sortby || 'name',
          pageItem: undefined,
          menuItem: item,
          items: this.getExpandedMenu(level + 1, menuItems),
          url: item.url,
          to: item.to,
        });
      });
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getModifiedMenu -> ${error}`);
    }
    return undefined;
  }

  // Add in the pages as Menu Entry
  private getPages(
    menuItems?: ReadonlyArray<MenuEntry> | undefined,
    pages?: ReadonlyArray<Page>,
  ): MenuEntry[] | undefined {
    try {
      if (!menuItems || !pages) {
        return undefined;
      }
      // Declare the return array
      const ret: MenuEntry[] = [...menuItems];
      menuItems.forEach((item) => {
        // Add pages to the menu
        const filteredPages = pages.filter(
          (x) => x.parentId && x.parentId.includes(item.id),
        );
        filteredPages.forEach((page) => {
          ret.push({
            id: page.id,
            name: page.name,
            seq: 0,
            parentId: item.id,
            type: 'page',
            level: 0,
            sortby: item.sortby || 'name',
            pageItem: page,
            menuItem: undefined,
            url: page.url,
            to: page.to,
          });
        });
        // Recursively add pages to the menu
        item.items = this.getPages(item.items, pages);
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

      return {
        metadata: data.metadata,
        items: this.getPages(
          this.getExpandedMenu(0, data.menuItems),
          data.pages,
        ),
      };
    } catch (error) {
      Logger.error(`MenuService: getMenu --> Error: ${error}`);
      throw error;
    }
  }
}

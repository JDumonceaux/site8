import { readFile } from 'fs/promises';

import { Logger } from '../utils/Logger.js';
import { Pages } from '../types/Pages.js';
import { MenuItem } from '../types/MenuItem.js';
import { getFilePath } from '../utils/getFilePath.js';
import { Page } from '../types/Page.js';
import { Menu } from 'types/Menu.js';
import { MenuEntry } from 'types/MenuEntry.js';
import { MenuEntryFlat } from 'types/MenuEntryFlat.js';

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
  // private sortMenuEntry(ob1: MenuEntry, ob2: MenuEntry) {
  //   if (ob1.seq > ob2.seq) {
  //     return 1;
  //   } else if (ob1.seq < ob2.seq) {
  //     return -1;
  //   }

  //   // Else go to the 2nd item
  //   if (ob1.name < ob2.name) {
  //     return -1;
  //   } else if (ob1.name > ob2.name) {
  //     return 1;
  //   } else {
  //     // nothing to split them
  //     return 0;
  //   }
  // }

  // Convert the MenuItems to MenuEntry
  private getMenuEntry(item: MenuItem | undefined): MenuEntry | undefined {
    if (!item) {
      return undefined;
    }

    return {
      id: item.id,
      name: item.name,
      type: 'menu',
      parentId: 0,
      seq: 0,
      sortby: item.sortby || 'name',
      item: item,
      url: item.url,
      to: item.to,
      toComplete: undefined,
      parent: item.parent,
      menuItems: [],
      pageItems: [],
    } as MenuEntry;
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
      const currItem = {
        ...this.getMenuEntry(item),
        parentId: id,
        seq: x && x.seq ? x.seq : 0,
        menuItems: this.fillMenu(item.id, menuItems),
      } as MenuEntry;
      return currItem;
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

      const ret: MenuEntry[] | undefined = [];
      currMenus.forEach((item) => {
        ret.push({
          ...this.getMenuEntry(item),
          id: item.id,
          name: item.name,
          seq: item.parent.find((x) => x.id === 0)?.seq || 0,
          menuItems: this.fillMenu(item.id, menuItems) || [],
          parent: item.parent,
        } as MenuEntry);
      });
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getRootMenu -> ${error}`);
    }
    return undefined;
  }

  private getPagesAsMenuEntry(
    pages?: ReadonlyArray<Page>,
  ): MenuEntry[] | undefined {
    try {
      if (!pages) {
        return undefined;
      }

      // Declare the return array
      const ret: MenuEntry[] | undefined = [];
      pages.forEach((item) => {
        ret.push({
          id: item.id,
          name: item.name,
          type: 'page',
          parentId: 0,
          seq: 0,
          sortby: 'name',
          item: item,
          url: item.url,
          to: item.to,
          parent: item.parent,
          menuItems: [],
          pageItems: [],
        });
      });
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getPagesAsMenuEntry -> ${error}`);
    }
    return undefined;
  }

  private getMatchedPages(
    item: MenuEntry,
    pages?: ReadonlyArray<MenuEntry>,
  ): MenuEntry[] | undefined {
    try {
      if (!item) {
        return undefined;
      }
      return pages?.filter((page) =>
        page.parent?.some((x) => x.id === item.id),
      );
    } catch (error) {
      Logger.error(`MenuService: getMatchedPages -> ${error}`);
    }
    return undefined;
  }

  private getMatchedEntries(
    menuItems?: ReadonlyArray<MenuEntry>,
    pages?: ReadonlyArray<MenuEntry>,
  ): MenuEntry[] | undefined {
    try {
      if (!menuItems) {
        return undefined;
      }
      if (!pages) {
        return [...menuItems];
      }

      // Declare the return array
      const ret: MenuEntry[] | undefined = [];
      menuItems.forEach((item) => {
        ret.push({
          ...item,
          pageItems: this.getMatchedPages(item, pages) || [],
          menuItems: this.getMatchedEntries(item.menuItems, pages) || [],
        });
      });
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getMatchedEntries -> ${error}`);
    }
    return undefined;
  }

  private getCombinedEntries(
    items?: ReadonlyArray<MenuEntry>,
  ): MenuEntry[] | undefined {
    try {
      if (!items) {
        return undefined;
      }

      // Declare the return array
      const ret: MenuEntry[] | undefined = [];
      items.forEach((item) => {
        const x = this.getCombinedEntries(item.menuItems) || [];
        ret.push({
          ...item,
          items: [...x, ...item.pageItems],
        });
      });
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getMatchedEntries -> ${error}`);
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
      // // Get child menu items
      const y = this.getPagesAsMenuEntry(data.pages);

      // const y = this.getExpandedMenu(data.menuItems, x);
      // Add in pages
      const z = this.getMatchedEntries(x, y);

      const zz = this.getCombinedEntries(z);
      console.log('zz', zz);
      // console.log('z', z);
      // Sort all the menu items: mixing menu and pages

      // Fill in URLs

      return {
        metadata: data.metadata,
        items: zz,
      };
    } catch (error) {
      Logger.error(`MenuService: getMenu --> Error: ${error}`);
      throw error;
    }
  }

  public async getMenuValues(): Promise<MenuEntryFlat[] | undefined> {
    Logger.info(`MenuService: getValues -> `);
    try {
      // Get all the data from pagesIndex.json
      const data: Pages | undefined = await this.getItems();
      if (!data) {
        return undefined;
      }

      return data.menuItems
        ? data.menuItems
            .map((x) => ({
              id: x.id,
              name: x.name,
              to: x.to,
              url: x.url,
            }))
            .sort((a, b) => a.name.localeCompare(b.name))
        : undefined;
    } catch (error) {
      Logger.error(`MenuService: getMenuValues --> Error: ${error}`);
      throw error;
    }
  }
}

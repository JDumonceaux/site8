import { Logger } from '../utils/Logger.js';
import { Pages } from '../types/Pages.js';
import { MenuItem } from '../types/MenuItem.js';
import { Page } from '../types/Page.js';
import { Menu } from '../types/Menu.js';
import {
  MenuEntry,
  sortMenuEntryName,
  sortMenuEntrySeq,
} from '../types/MenuEntry.js';
import { MenuEntryFlat } from '../types/MenuEntryFlat.js';
import { PagesService } from './PagesService.js';

export class MenuService {
  // 1. Get all data
  private async getItems(): Promise<Pages | undefined> {
    return new PagesService().getItems();
  }

  // Convert the MenuItems to MenuEntry
  private getMenuEntry(item: MenuItem | undefined): MenuEntry | undefined {
    if (!item) {
      return undefined;
    }

    return {
      id: item.id,
      name: item.name.trim(),
      type: 'menu',
      parentId: 0,
      seq: 0,
      sortby: item.sortby || 'name',
      item: item,
      url: item.url,
      to: item.to,
      toComplete: item.to,
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
        seq: x?.seq ?? 0,
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
          seq: item.parent.find((x) => x.id === 0)?.seq ?? 0,
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
      const ret: MenuEntry[] = [];
      items.forEach((item) => {
        const x = this.getCombinedEntries(item.menuItems) || [];
        ret.push({
          ...item,
          items: [...x, ...(item.pageItems || [])],
        });
      });
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getCombinedEntries -> ${error}`);
      return undefined;
    }
  }

  private sortMenu(item: MenuEntry): MenuEntry {
    const x =
      item.sortby === 'seq'
        ? item?.items?.sort((a, b) => sortMenuEntrySeq(a, b))
        : item?.items?.sort((a, b) => sortMenuEntryName(a, b));

    return {
      ...item,
      items: x ? [...x] : undefined,
    };
  }

  private fillURL(item: MenuEntry): MenuEntry {
    try {
      const items = item.items?.map((x) => {
        return {
          ...x,
          toComplete:
            x.to && item.toComplete ? `${item.toComplete}/${x.to}` : undefined,
        };
      });

      return {
        ...item,
        items: items ?? undefined,
      };
    } catch (error) {
      Logger.error(`MenuService: fillURL --> Error: ${error}`);
      throw error;
    }
  }

  private trimItem(entry: MenuEntry): MenuEntry {
    try {
      const { item, menuItems, pageItems, parent, ...rest } = entry;
      return {
        ...rest,
        item: undefined,
        menuItems: undefined,
        pageItems: undefined,
        parent: undefined,
      };
    } catch (error) {
      Logger.error(`MenuService: trimItem --> Error: ${error}`);
      throw error;
    }
  }

  private loopItems(
    callback: (item: MenuEntry) => MenuEntry,
    items?: ReadonlyArray<MenuEntry>,
  ): MenuEntry[] | undefined {
    try {
      if (!items) {
        return undefined;
      }

      return items.map((x) => {
        const y = callback(x);
        const updatedItems = this.loopItems(callback, y?.items);
        return {
          ...y,
          items: updatedItems,
        };
      });
    } catch (error) {
      Logger.error(`MenuService: loop items --> Error: ${error}`);
      throw error;
    }
  }

  private loopMenuItems(
    callback: (item: MenuEntry) => MenuEntry | undefined,
    items?: ReadonlyArray<MenuEntry>,
  ): MenuEntry[] | undefined {
    if (!items) {
      return undefined;
    }

    const x = items.map((item) => {
      const y = callback(item);
      const z = this.loopMenuItems(callback, y?.menuItems);
      return {
        ...item,
        items: z,
      };
    });
    return x;
  }

  // 0. Get Menu
  public async getMenu(): Promise<Menu | undefined> {
    Logger.info(`MenuService: getMenu -> `);
    try {
      // Get all the data from pagesIndex.json
      const data: Pages | undefined = await this.getItems();
      if (!data) {
        return undefined;
      }

      // Get the root level menu
      const rootMenu = this.getRootMenu(data.menuItems);
      // Get pages
      const pages = this.getPagesAsMenuEntry(data.items);
      // Add pages to menus
      const menuPages = this.getMatchedEntries(rootMenu, pages);
      // Combine items
      const combinedItems = this.getCombinedEntries(menuPages);
      // Sort all the menu items: mixing menu and pages
      const sortedMenus = this.loopItems(this.sortMenu, combinedItems);
      // Fill in URLs
      const urlMenus = this.loopItems(this.fillURL, sortedMenus);
      // Clean up
      const cleanMenus = this.loopItems(this.trimItem, urlMenus);

      return {
        metadata: data.metadata,
        items: cleanMenus,
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

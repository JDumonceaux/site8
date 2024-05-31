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

  // 1. Get the root level and convert the MenuItems to MenuEntry
  private getRootMenu(
    menuItems?: ReadonlyArray<MenuItem>,
  ): MenuEntry[] | undefined {
    try {
      if (!menuItems) {
        return undefined;
      }

      // Get the MenuItems for the root level
      const currMenus: MenuItem[] = menuItems.filter((item) =>
        item.parent?.some((x) => x.id === 0),
      );

      return currMenus.map((item) => {
        const parent = item.parent.find((x) => x.id === 0);
        return {
          ...this.getMenuEntry(item),
          id: item.id,
          name: item.name,
          seq: parent?.seq ?? 0,
          menuItems: this.fillMenu(item.id, menuItems) || [],
          parent: item.parent,
        } as MenuEntry;
      });
    } catch (error) {
      Logger.error(`MenuService: getRootMenu -> ${error}`);
    }
    return undefined;
  }

  // 2. Get the pages and convert to MenuEntry
  private getPagesAsMenuEntry(
    pages?: ReadonlyArray<Page>,
  ): MenuEntry[] | undefined {
    try {
      if (!pages) {
        return undefined;
      }

      // Convert the pages to MenuEntry
      return pages?.map((item) => {
        return {
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
        };
      });
    } catch (error) {
      Logger.error(`MenuService: getPagesAsMenuEntry -> ${error}`);
    }
    return undefined;
  }

  // 3.5 Get the matched pages
  private getMatchedPages(
    id: number,
    pages?: ReadonlyArray<MenuEntry>,
  ): MenuEntry[] | undefined {
    try {
      // Get items where parent is the current id
      const items = pages?.filter((page) => {
        if (!Array.isArray(page.parent) || page.parent.length === 0) {
          Logger.error(
            `MenuService: getMatchedPages -> parent format is incorrect.`,
          );
          return undefined;
        }
        return page.parent?.some((x) => x.id === id);
      });

      return items?.map((x) => {
        // Find parent match
        const match = x.parent?.find((y) => y.id === id);
        return {
          ...x,
          parentId: id,
          seq: match?.seq ?? 0,
        };
      });
    } catch (error) {
      Logger.error(`MenuService: getMatchedPages -> ${error}`);
    }
    return undefined;
  }

  // 3. Get the matched entries
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
          // 3.5 Get the matched pages
          pageItems: this.getMatchedPages(item.id, pages) || [],
          // Recursively call the function
          menuItems: this.getMatchedEntries(item.menuItems, pages) || [],
        });
      });
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getMatchedEntries -> ${error}`);
    }
    return undefined;
  }

  // 4. Combine the entries
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

  // 5. Sort the menu items
  private sortMenu(item: MenuEntry): MenuEntry {
    const items =
      item.sortby === 'seq'
        ? item?.items?.sort((a, b) => sortMenuEntrySeq(a, b))
        : item?.items?.sort((a, b) => sortMenuEntryName(a, b));

    return {
      ...item,
      items: items ? [...items] : undefined,
    };
  }

  // 6. Fill in the URLs
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

  // 7. Clean up
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

  // Generic loop function
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

  // 0. Get Menu
  public async getMenu(): Promise<Menu | undefined> {
    Logger.info(`MenuService: getMenu -> `);
    try {
      // Get all the data from pagesIndex.json
      const data: Pages | undefined = await this.getItems();
      if (!data) {
        return undefined;
      }

      // 1. Get the root level menu
      const rootMenu = this.getRootMenu(data.menuItems);
      // 2. Get pages
      const pages = this.getPagesAsMenuEntry(data.items);
      // 3. Add pages to menus
      const menuPages = this.getMatchedEntries(rootMenu, pages);
      // 4. Combine items
      const combinedItems = this.getCombinedEntries(menuPages);
      // 5. Sort all the menu items: mixing menu and pages
      const sortedMenus = this.loopItems(this.sortMenu, combinedItems);
      // 6. Fill in URLs
      const urlMenus = this.loopItems(this.fillURL, sortedMenus);
      // 7. Clean up
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

  // 0 Get Menu Values
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

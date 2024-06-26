import { Menu } from '../types/Menu.js';
import { MenuAbbr } from '../types/MenuAbbr.js';
import { MenuItem } from '../types/MenuItem.js';
import { Page } from '../types/Page.js';
import { Pages } from '../types/Pages.js';
import { Logger } from '../utils/Logger.js';
import { PagesService } from './PagesService.js';

type PageAbbr = Pick<Page, 'id' | 'name' | 'to' | 'url' | 'content' | 'type'>;

export class MenuService {
  // 0. Get all data
  public async getItems(): Promise<Pages | undefined> {
    return new PagesService().getItems();
  }

  // 1. Get all the menu items.  Add additional lines for each parent element
  private getExpandedMenu(items?: ReadonlyArray<Page>): MenuItem[] | undefined {
    try {
      if (!items) {
        return undefined;
      }
      const ret: MenuItem[] = [];
      items.forEach((item) => {
        if (
          item.parentItems &&
          item.parentItems.length > 0 &&
          !Array.isArray(item.parentItems)
        ) {
          Logger.error(
            `MenuService: getExpandedMenu -> parentItems is not an array.`,
          );
          return undefined;
        }

        // Shed excess properties from Page
        const temp = item as PageAbbr;
        // Loop through parentItems records
        if (item.parentItems) {
          // Add a new record for each parent
          item.parentItems.forEach((parent) => {
            // Convert parentItems to parent child
            ret.push({
              ...temp,
              parent: {
                id: parent.id,
                seq: parent.seq,
                sortby: parent.sortby,
              },
              line: 0,
              issue: false,
            });
          });
        } else {
          // If no parentItems ...
          if (item.type == 'root') {
            ret.push({
              ...temp,
              parent: { id: 0, seq: 0, sortby: 'name' },
              line: 0,
              issue: false,
            });
          } else {
            // This item has no parent - which is an error.  Issue = true.
            ret.push({
              ...temp,
              parent: {
                id: 0,
                seq: 0,
                sortby: undefined,
              },
              line: 0,
              issue: true,
            });
          }
        }
      });
      return ret.length > 0 ? ret : undefined;
    } catch (error) {
      Logger.error(`MenuService: getExpandedMenu -> ${error}`);
    }
    return undefined;
  }

  // 3. Get ordered menu - Root > Menu > Page
  private getChildren(
    items: ReadonlyArray<MenuItem>,
    parentId: number,
    seq: number = 0,
  ): MenuItem[] | undefined {
    try {
      if (seq > 4) {
        return undefined;
      }
      const ret: MenuItem[] = [];
      const children = items.filter((x) => x.parent.id === parentId);
      children.forEach((x) => {
        ret.push(x);
        const y = this.getChildren(items, x.id, seq + 1);
        if (y) {
          ret.push(...y);
        }
      });
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getChildren -> ${error}`);
    }
    return undefined;
  }

  private getOrderedMenu(
    items: ReadonlyArray<MenuItem>,
    sortBy?: string,
  ): MenuItem[] | undefined {
    try {
      const ret: MenuItem[] = [];
      // Add parent, then add children. Perform recursively.
      // Start with the root menu
      const children = items.filter((x) => x.parent.id === 0);
      children.forEach((x) => {
        // Add this item
        ret.push(x);
        const y = this.getChildren(items, x.id);
        if (y) {
          ret.push(...y);
        }
      });
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getOrderedMenu -> ${error}`);
    }
    return undefined;
  }

  // 2. Get the full menu
  private getFullMenu(items?: ReadonlyArray<MenuItem>): MenuItem[] | undefined {
    try {
      if (!items) {
        return undefined;
      }
      // Get the menu
      const orderedMenu = this.getOrderedMenu(items);
      const missedArr: MenuItem[] = [];
      items?.forEach((x) => {
        const found = orderedMenu?.find((item) => x.id === item.id);
        if (!found) {
          missedArr.push({ ...x, issue: true });
        }
      });
      const ret = orderedMenu?.concat(missedArr);
      // Sequence the items
      return ret?.map((x, index) => ({ ...x, seq: index + 1 }));
    } catch (error) {
      Logger.error(`MenuService: getFullMenu -> ${error}`);
    }
    return undefined;
  }

  // 0. Get Menu
  public async getMenu(): Promise<Menu | undefined> {
    Logger.info(`MenuService: getMenu -> `);
    try {
      // 1. Get all the data from pagesIndex.json
      const data: Pages | undefined = await this.getItems();
      if (!data || !data.items) {
        return undefined;
      }
      const x1 = this.getExpandedMenu(data?.items);
      const ret = this.getFullMenu(x1);
      return {
        metadata: data.metadata,
        items: ret,
      };
    } catch (error) {
      Logger.error(`MenuService: getMenu --> Error: ${error}`);
      throw error;
    }
  }

  // 0 Get Menu Abbr
  public async getMenuAbbr(): Promise<MenuAbbr[] | undefined> {
    Logger.info(`MenuService: getValues -> `);
    try {
      // Get all the data from pagesIndex.json
      const data: Pages | undefined = await this.getItems();
      if (!data) {
        return undefined;
      }
      const ret = data?.items.filter((x) => x.type !== 'page');
      if (!ret) {
        return undefined;
      }

      return ret
        .map((x) => ({
          id: x.id,
          name: x.name,
          to: x.to,
          url: x.url,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      Logger.error(`MenuService: getMenuAbbr --> Error: ${error}`);
      throw error;
    }
  }
}

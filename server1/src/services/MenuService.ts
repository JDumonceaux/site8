import { Logger } from '../utils/Logger.js';
import { Pages } from '../types/Pages.js';
import { Page, sortMenuEntryName, sortMenuEntrySeq } from '../types/Page.js';
import { Menu } from '../types/Menu.js';
import { PagesService } from './PagesService.js';
import { MenuAbbr } from '../types/MenuAbbr.js';
import { MenuItem } from 'types/MenuItem.js';

let index = 0;

export class MenuService {
  // 0. Get all data
  public async getItems(): Promise<Pages | undefined> {
    return new PagesService().getItems();
  }

  // 2. Get the root level
  private getRootMenu(items?: ReadonlyArray<Page>): Page[] | undefined {
    try {
      if (!items) {
        return undefined;
      }

      return items
        .filter((x) => x.type === 'root')
        .map((x) => ({ ...x, tempId: index++, toComplete: x.to, parentId: 0 }));
    } catch (error) {
      Logger.error(`MenuService: getRootMenu -> ${error}`);
    }
    return undefined;
  }

  // 3. Add children
  private addChildren(
    items?: ReadonlyArray<Page>,
    allItems?: ReadonlyArray<Page>,
  ): Page[] | undefined {
    try {
      if (!items || !allItems) {
        return undefined;
      }

      return items?.map((x) => {
        const children = allItems.filter((y) =>
          y.parent?.some((z) => z.id === x.id),
        );

        const children2 = children.map((y) => ({
          ...y,
          parentId: x.id,
          seq: y.parent?.find((a) => a.id === x.id)?.seq ?? 0,
        }));

        return {
          ...x,
          items: this.addChildren(children2, allItems),
        };
      }) as Page[];
    } catch (error) {
      Logger.error(`MenuService: addChildren -> ${error}`);
    }
    return undefined;
  }

  // 4.  Index items
  private indexItems(item: Readonly<Page>): Page {
    if (!item.items) {
      return item;
    }

    const items = item.items?.map((x) => ({
      ...x,
      tempId: index++,
    }));

    return {
      ...item,
      items: items,
    };
  }

  // 6. Sort the menu items
  private sortMenu(item: Readonly<Page>): Page {
    const items =
      item.sortby === 'seq'
        ? item?.items?.sort((a, b) => sortMenuEntrySeq(a, b))
        : item?.items?.sort((a, b) => sortMenuEntryName(a, b));

    return {
      ...item,
      items: items ? [...items] : undefined,
    };
  }

  // 7. Fill in the URLs
  private fillURL(item: Readonly<Page>): Page {
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

  // 8. Map
  private maptoMenuItem(item: Readonly<Page>): MenuItem {
    try {
      const {
        text,
        edit_date,
        create_date,
        file,
        readability_score,
        reading_time,
        parent,
        items,
        ...rest
      } = item;

      const xItems = items
        ? items.map((x) => this.maptoMenuItem(x))
        : undefined;

      const ret: MenuItem = {
        ...rest,
        tempId: item.tempId ?? 0,
        seq: item.seq ?? 0,
        items: xItems,
      };
      return ret;
    } catch (error) {
      Logger.error(`MenuService: trimItem --> Error: ${error}`);
      throw error;
    }
  }

  private maptoMenuItems(items: ReadonlyArray<Page>): MenuItem[] {
    return items.map((x) => this.maptoMenuItem(x));
  }

  // 9. Clean up
  private trimItem(item: Readonly<MenuItem>): MenuItem {
    try {
      return {
        tempId: item.tempId,
        id: item.id,
        parentId: item.parentId,
        name: item.name,
        to: item.to,
        url: item.url,
        toComplete: item.toComplete,
        type: item.type,
        seq: item.seq,
        sortby: item.sortby,
        items: item.items && item.items.length > 0 ? item.items : undefined,
      };
    } catch (error) {
      Logger.error(`MenuService: trimItem --> Error: ${error}`);
      throw error;
    }
  }

  private trimItems(items: ReadonlyArray<MenuItem>): MenuItem[] {
    return items.map((x) => this.trimItem(x));
  }

  // Generic loop function
  private loopItems(
    items: ReadonlyArray<Page>,
    callback: (item: Page) => Page,
  ): Page[] | undefined {
    try {
      return items.map((x) => {
        const y = callback(x);
        const updatedItems = y.items && this.loopItems(y.items, callback);
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

  private flattenItems(
    items: ReadonlyArray<MenuItem> | undefined,
  ): MenuItem[] | undefined {
    if (!items) {
      return undefined;
    }
    const ret: MenuItem[] = [];
    items.forEach((x) => {
      const { items: _extraItems, ...rest } = x;
      ret.push({ ...rest });
      if (x.items) {
        const y = this.flattenItems(x.items);
        if (y) {
          ret.push(...y);
        }
      }
    });
    return ret ? ret.sort((a, b) => a.tempId - b.tempId) : undefined;
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
      index = 1;
      // 2. Get the root level menu
      const rootMenu = this.getRootMenu(data.items);
      // 3. Build Menu Tree
      const x0 = this.addChildren(rootMenu, data.items);
      // 4. Add Index
      const x1 = x0 && this.loopItems(x0, this.indexItems);
      // 6. Sort all the menu items: mixing menu and pages
      const x2 = x1 && this.loopItems(x1, this.sortMenu);
      // 7. Fill in URLs
      const x3 = x2 && this.loopItems(x2, this.fillURL);
      // 8. Map Item to MenuItem
      const x4 = x3 && this.maptoMenuItems(x3);
      // 8. Clean up
      const x5 = x4 && this.trimItems(x4);

      const flat = this.flattenItems(x5);

      return {
        metadata: data.metadata,
        items: x5,
        flat: flat,
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

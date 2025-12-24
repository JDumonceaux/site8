import type { MenuItem } from '../../types/MenuItem.js';
import type { Menus } from '../../types/Menus.js';
import type { PageMenu } from '../../types/PageMenu.js';
import type { Pages } from '../../types/Pages.js';
import type { Parent } from '../../types/Parent.js';

import { Logger } from '../../utils/logger.js';
import { PagesService } from '../pages/PagesService.js';

import { mapPageMenuToMenuItem } from './mapPageMenuToMenuItem.js';

export class MenuService {
  // 0. Get Menu | Admin > Pages
  public async getMenu(): Promise<Menus | undefined> {
    Logger.info(`MenuService: getMenu -> `);
    try {
      // 1. Get all the data from pages.json
      const data: Pages | undefined = await this.getItems();
      if (!data?.items) {
        return undefined;
      }
      const ret = this.buildRecursiveMenu(data.items);
      return {
        items: ret ?? [],
        metadata: data.metadata,
      };
    } catch (error) {
      Logger.error(`MenuService: getMenu --> Error: ${String(error)}`);
      throw error;
    }
  }

  // 2. Build children recursively for a given parent
  private buildChildren(
    parentId: number,
    menus: readonly PageMenu[],
    pages: readonly PageMenu[],
    allItems: readonly PageMenu[],
  ): MenuItem[] | undefined {
    try {
      // Find direct children (both menus and pages)
      const childMenus: MenuItem[] = [];
      const childPages: MenuItem[] = [];

      // Find child menus
      menus.forEach((menu) => {
        menu.parentItems?.forEach((parent) => {
          if (parent.id === parentId) {
            const menuItem = mapPageMenuToMenuItem(menu, parent);
            // Recursively build this menu's children
            const children = this.buildChildren(
              menu.id,
              menus,
              pages,
              allItems,
            );
            const itemWithChildren: MenuItem = children
              ? { ...menuItem, items: children }
              : menuItem;
            childMenus.push(itemWithChildren);
          }
        });
      });

      // Find child pages
      pages.forEach((page) => {
        page.parentItems?.forEach((parent) => {
          if (parent.id === parentId) {
            childPages.push(mapPageMenuToMenuItem(page, parent));
          }
        });
      });

      // Combine and sort children
      const allChildren = [...childMenus, ...childPages];

      if (allChildren.length === 0) {
        return undefined;
      }

      // Sort by parent sortBy preference
      const parent = allItems.find((x) => x.id === parentId);
      const sortBy = parent?.parentItems?.[0]?.sortBy ?? 'name';

      const sorted =
        sortBy === 'seq'
          ? allChildren.toSorted(
              (a, b) => (a.parentItem?.seq ?? 0) - (b.parentItem?.seq ?? 0),
            )
          : allChildren.toSorted((a, b) => a.title.localeCompare(b.title));

      return sorted;
    } catch (error) {
      Logger.error(`MenuService: buildChildren -> ${String(error)}`);
      return undefined;
    }
  }

  // 1. Build recursive menu structure
  private buildRecursiveMenu(
    items?: readonly PageMenu[],
  ): MenuItem[] | undefined {
    try {
      if (!items) {
        return undefined;
      }

      const defaultParent = {
        id: 0,
        seq: 0,
        sortBy: 'name',
      } as Parent;

      // Segment the data
      const rootMenus = items.filter((x) => x.type === 'root');
      const menus = items.filter((x) => x.type === 'menu');
      const pages = items.filter((x) => x.type === 'page');

      // Build root menu items
      const rootMenuItems = rootMenus
        .map((item) =>
          mapPageMenuToMenuItem(item, item.parentItems?.[0] ?? defaultParent),
        )
        .toSorted((a, b) => a.title.localeCompare(b.title));

      // Recursively build children for each root menu
      const menuTree: MenuItem[] = rootMenuItems.map((rootItem) => {
        const children = this.buildChildren(rootItem.id, menus, pages, items);
        return children ? { ...rootItem, items: children } : rootItem;
      });

      // Add orphans (items without parents)
      const menuOrphans = menus
        .filter((x) => !x.parentItems || x.parentItems.length === 0)
        .map((x) => mapPageMenuToMenuItem(x, defaultParent));

      const pageOrphans = pages
        .filter((x) => !x.parentItems || x.parentItems.length === 0)
        .map((x) => mapPageMenuToMenuItem(x, defaultParent));

      const result = [...menuTree, ...menuOrphans, ...pageOrphans];
      return result.length > 0 ? result : undefined;
    } catch (error) {
      Logger.error(`MenuService: buildRecursiveMenu -> ${String(error)}`);
      return undefined;
    }
  }

  // 0. Get all data
  private async getItems(): Promise<Pages | undefined> {
    return new PagesService().getItems();
  }
}

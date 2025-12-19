import { z } from 'zod';

import type { MenuAdd } from '../../types/MenuAdd.js';
import type { MenuItem } from '../../types/MenuItem.js';
import type { Menus } from '../../types/Menus.js';
import type { PageMenu } from '../../types/PageMenu.js';
import type { PagesIndex } from '../../types/PagesIndex.js';
import type { Parent } from '../../types/Parent.js';

import { Logger } from '../../utils/logger.js';
import { cleanUpData } from '../../utils/objectUtil.js';
import { safeParse } from '../../utils/zodHelper.js';
// eslint-disable-next-line import/no-cycle
import { PagesService } from '../pages/PagesService.js';

import { mapPageMenuToMenuItem } from './mapPageMenuToMenuItem.js';

const menuAddSchema = z
  .object({
    id: z.number(),
    name: z
      .string({ message: 'Name must be a string' })
      .min(1, 'Name is required.')
      .max(500, 'Name max length exceeded: 500')
      .trim(),
    parentItems: z
      .object({
        id: z.number(),
        seq: z.number(),
      })
      .array()
      .min(1),
    to: z.string().trim().optional(),
    url: z.string().trim().optional(),
  })
  .refine(
    (data) => data.to ?? data.url,
    'Either to or url should be filled in.',
  );
type addData = z.infer<typeof menuAddSchema>;

export class MenuService {
  // Add item
  public async addItem(item: MenuAdd): Promise<boolean> {
    Logger.info(`MenuService: addItem ->`);

    // Get all items
    const pages = await new PagesService().getItems();
    if (!pages) {
      return Promise.reject(new Error('No items found'));
    }

    // Remove undefined values and sort
    const newItem = cleanUpData<MenuAdd>(item);
    // Validate data
    const valid = safeParse<addData>(menuAddSchema, newItem);
    if (valid.error) {
      throw new Error(`addItem -> ${JSON.stringify(valid.error)}`);
    }

    // Add - Note: This is incomplete as we can't directly write to PagesService
    // TODO: Expose a public write method in PagesService
    return true;
  }

  // 0. Get Menu | Admin > Pages
  public async getMenu(): Promise<Menus | undefined> {
    Logger.info(`MenuService: getMenu -> `);
    try {
      // 1. Get all the data from pagesIndex.json
      const data: PagesIndex | undefined = await this.getItems();
      if (!data?.items) {
        return undefined;
      }
      const ret = this.buildMenu(data.items);
      return {
        items: ret ?? [],
        metadata: data.metadata,
      };
    } catch (error) {
      Logger.error(`MenuService: getMenu --> Error: ${String(error)}`);
      throw error;
    }
  }

  // 1. Get built menu
  private buildMenu(items?: readonly PageMenu[]): MenuItem[] | undefined {
    try {
      if (!items) {
        return undefined;
      }
      // Segment the data
      const rootMenus = items.filter((x) => x.type === 'root');
      const menus = items.filter((x) => x.type === 'menu');
      const pages = items.filter((x) => x.type === 'page');

      const defaultParent = {
        id: 0,
        seq: 0,
        sortBy: 'name',
      } as Parent;

      // Convert root menus to menu items and sort by seq
      const rootMenusTemp = rootMenus
        .map((item) =>
          mapPageMenuToMenuItem(item, item.parentItems?.[0] ?? defaultParent),
        )
        .toSorted((a, b) => a.title.localeCompare(b.title));

      // Loop through root menus
      const arr: MenuItem[] = [];
      rootMenusTemp.forEach((item) => {
        // Add the root menu to the return array
        arr.push(item);
        // Find the children of the root menu
        const ret2: MenuItem[] = [];
        menus.map((menu) => {
          menu.parentItems?.forEach((parent) => {
            if (item.id === parent.id) {
              ret2.push(mapPageMenuToMenuItem(menu, parent));
            }
          });
        });
        // Sort the menu items as specified by parent
        const sorted =
          item.parentItem?.sortBy === 'seq'
            ? ret2.toSorted(
                (a, b) => (a.parentItem?.seq ?? 0) - (b.parentItem?.seq ?? 0),
              )
            : ret2.toSorted((a, b) => a.title.localeCompare(b.title));
        // Add the menu items to the return array
        arr.push(...sorted);
      });

      // Add the page items to the return array
      const menusPlusPages = this.getPages(arr, pages) ?? [];

      // Add in orphans
      const menuOrphans = menus
        .filter((x) => !x.parentItems || x.parentItems.length === 0)
        .map((x) => ({ ...x, issue: 'no parent' }))
        .map((x) => mapPageMenuToMenuItem(x, defaultParent));
      const pageOrphans = pages
        .filter((x) => !x.parentItems || x.parentItems.length === 0)
        .map((x) => ({ ...x, issue: 'no parent' }))
        .map((x) => mapPageMenuToMenuItem(x, defaultParent));

      const ret: MenuItem[] = menusPlusPages.concat(
        ...menuOrphans,
        ...pageOrphans,
      );

      return ret.length > 0 ? ret : undefined;
    } catch (error) {
      Logger.error(`MenuService: buildMenu -> ${String(error)}`);
    }
    return undefined;
  }

  // 0. Get all data
  private async getItems(): Promise<PagesIndex | undefined> {
    return new PagesService().getItems();
  }

  //  2. Add children to the menu
  private getPages(items?: readonly MenuItem[], pages?: readonly PageMenu[]) {
    try {
      if (!items || items.length === 0 || !pages || pages.length === 0) {
        return items;
      }
      const ret: MenuItem[] = [];
      items.forEach((item) => {
        // Add current parent
        ret.push(item);

        const p: MenuItem[] = [];
        pages.forEach((x) => {
          x.parentItems?.forEach((parent) => {
            if (item.id === parent.id) {
              p.push(mapPageMenuToMenuItem(x, parent));
            }
          });
        });

        // Sort items
        const sorted =
          item.parentItem?.sortBy === 'seq'
            ? p.toSorted(
                (a, b) => (a.parentItem?.seq ?? 0) - (b.parentItem?.seq ?? 0),
              )
            : p.toSorted((a, b) => a.title.localeCompare(b.title));
        // Add to return
        ret.push(...sorted);
      });
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getPages --> Error: ${String(error)}`);
      throw error;
    }
  }
}

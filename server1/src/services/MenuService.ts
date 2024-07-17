import { z } from 'zod';
import { mapPageMenuToMenuItem } from '../apis/menu/mappers/mapPageMenuToMenuItem.js';
import { MenuAdd } from '../types/MenuAdd.js';
import { MenuItem } from '../types/MenuItem.js';
import { Menus } from '../types/Menus.js';
import { PageMenu } from '../types/PageMenu.js';
import { Pages } from '../types/Pages.js';
import { PagesIndex } from '../types/PagesIndex.js';
import { Parent } from '../types/Parent.js';
import { Logger } from '../utils/Logger.js';
import { cleanUpData } from '../utils/objectUtil.js';
import { safeParse } from '../utils/zodHelper.js';
import { PagesService } from './PagesService.js';

const menuAddSchema = z
  .object({
    id: z.number(),
    name: z
      .string({
        required_error: 'Name is required.',
        invalid_type_error: 'Name must be a string',
      })
      .max(500, 'Name max length exceeded: 500')
      .trim(),
    to: z.string().trim().optional(),
    url: z.string().trim().optional(),
    parentItems: z
      .object({
        id: z.number(),
        seq: z.number(),
      })
      .array()
      .min(1),
  })
  .refine(
    (data) => data.to ?? data.url,
    'Either to or url should be filled in.',
  );
type addData = z.infer<typeof menuAddSchema>;

export class MenuService {
  // 0. Get all data
  private async getItems(): Promise<PagesIndex | undefined> {
    return new PagesService().getItems();
  }

  // 1. Get built menu
  private buildMenu(items?: ReadonlyArray<PageMenu>): MenuItem[] | undefined {
    try {
      if (!items) {
        return undefined;
      }

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
          mapPageMenuToMenuItem(item, item?.parentItems?.[0] ?? defaultParent),
        )
        .toSorted((a, b) => a.name.localeCompare(b.name) ?? 0);

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
          item.parentItem?.sortBy === 'name'
            ? ret2.toSorted((a, b) => a.name.localeCompare(b.name))
            : ret2.toSorted(
                (a, b) => (a.parentItem?.seq ?? 0) - (b.parentItem?.seq ?? 0),
              );
        // Add the menu items to the return array
        arr.push(...sorted);
      });

      // Add in orphans
      const menuOrphans = menus
        .filter((x) => !x.parentItems || x.parentItems.length === 0)
        .map((x) => ({ ...x, issue: 'no parent' }))
        .map((x) => mapPageMenuToMenuItem(x, defaultParent));
      const pageOrphans = pages
        .filter((x) => !x.parentItems || x.parentItems.length === 0)
        .map((x) => ({ ...x, issue: 'no parent' }))
        .map((x) => mapPageMenuToMenuItem(x, defaultParent));

      const ret: MenuItem[] = arr.concat(...menuOrphans, ...pageOrphans);

      return ret.length > 0 ? ret : undefined;
    } catch (error) {
      Logger.error(`MenuService: buildMenu -> ${error}`);
    }
    return undefined;
  }

  // 2. Get the full menu
  // private getFullMenu(items?: ReadonlyArray<MenuItem>) {
  //   items?.forEach((x) => {
  //     const found = orderedMenu?.find((item) => x.id === item.id);
  //     if (!found) {
  //       missedArr.push({ ...x, issue: true });
  //     }
  //   });
  // }

  // 0. Get Menu | Admin > Pages
  public async getMenu(): Promise<Menus | undefined> {
    Logger.info(`MenuService: getMenu -> `);
    try {
      // 1. Get all the data from pagesIndex.json
      const data: PagesIndex | undefined = await this.getItems();
      if (!data?.items) {
        return undefined;
      }
      const ret = this.buildMenu(data?.items);
      return {
        metadata: data.metadata,
        items: ret,
      };
    } catch (error) {
      Logger.error(`MenuService: getMenu --> Error: ${error}`);
      throw error;
    }
  }

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
      throw new Error(`addItem -> ${valid.error}`);
    }

    // Cast to Page
    const newPage = { ...item } as PageMenu;

    // Add
    const newData: Pages = {
      ...pages,
      items: [...pages.items, { ...newPage }],
    };
    // Write to file
    return new PagesService().writeFile(newData);
  }

  // 0 Get Menu Abbr
  public async getMenuAbbr(): Promise<unknown[] | undefined> {
    return undefined;
  }
}

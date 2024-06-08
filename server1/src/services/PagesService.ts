import { readFile, writeFile } from 'fs/promises';
import { Logger } from '../utils/Logger.js';
import { getFilePath } from '../utils/getFilePath.js';
import { Pages } from '../types/Pages.js';
import { Page } from '../types/Page.js';
import { cleanUpData, getNextId } from '../utils/objectUtil.js';
import { MenuEdit } from '../types/MenuEdit.js';
import { MenuAdd } from '../types/MenuAdd.js';
import { z } from 'zod';
import { safeParse } from '../utils/zodHelper.js';

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
    parent: z
      .object({
        id: z.number(),
        seq: z.number(),
      })
      .array()
      .min(1),
  })
  .refine(
    (data) => data.to || data.url,
    'Either to or url should be filled in.',
  );
type addData = z.infer<typeof menuAddSchema>;

export class PagesService {
  private fileName = 'pagesIndex.json';
  private filePath = '';

  constructor() {
    this.filePath = getFilePath(this.fileName);
  }

  // Get all data
  public async getItems(): Promise<Pages | undefined> {
    Logger.info(`PagesService: getItems ->`);

    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as Pages;
    } catch (error) {
      Logger.error(`PagesService: getItems. Error -> ${error}`);
      return undefined;
    }
  }

  public async getNextId(): Promise<number | undefined> {
    Logger.info(`PagesService: getNextId -> `);

    try {
      const data = await this.getItems();
      return getNextId<Page>(data?.items);
    } catch (error) {
      Logger.error(`PagesService: getNextId. Error -> ${error}`);
      return undefined;
    }
  }

  public async writeFile(data: Pages): Promise<boolean> {
    Logger.info(`PagesService: writeFile -> `);

    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesService: writeFile. Error -> ${error}`);
      return Promise.reject(new Error(`Write file failed. Error: ${error}`));
    }
  }

  public async addItem(item: MenuAdd): Promise<void> {
    Logger.info(`PagesService: addItem ->`);

    try {
      const pages = await this.getItems();
      if (!pages) {
        return Promise.reject(new Error('No items found'));
      }

      // Reformat item
      const itemToAdd: Page = {
        ...item,
        parent: [{ id: item.parentId, seq: item.seq }],
        parentId: undefined,
        seq: 0,
      };

      // Remove undefined values and sort
      const newItem = cleanUpData<Page>(itemToAdd);
      // Validate data
      const result = safeParse<addData>(menuAddSchema, newItem);
      if (result.error) {
        throw new Error(`addItem -> ${result.error}`);
      }

      // Add
      const newData: Pages = {
        ...pages,
        items: [...pages.items, newItem],
      };
      // Write to file
      await this.writeFile(newData);
      return Promise.resolve();
    } catch (error) {
      Logger.error(`PagesService: addItem. Error -> ${error}`);
      return undefined;
    }
  }

  private getUpdatedItem(
    item: MenuEdit | undefined,
    foundItem: Page | undefined,
  ) {
    Logger.info(`PagesService: getUpdatedItem ->`);

    try {
      if (!foundItem || !item) {
        return undefined;
      }

      let newParent: { readonly id: number; readonly seq: number }[] = [];
      if (foundItem.parent) {
        newParent = foundItem.parent.map((x) => {
          if (x.id === item.parentId && item.newParentId && item.newSeq) {
            return { id: item.newParentId, seq: item.newSeq };
          } else {
            return x;
          }
        });
      } else {
        if (item.newParentId && item.newSeq) {
          newParent = [{ id: item.newParentId, seq: item.newSeq }];
        }
      }

      const retItem: Page = {
        ...foundItem,
        parent: newParent,
        sortby: item.sortby,
      };
      return retItem ? cleanUpData(retItem) : undefined;
    } catch (error) {
      Logger.error(`PagesService: getUpdatedItem. Error: -> ${error}`);
      return undefined;
    }
  }

  public async updateItems(items: ReadonlyArray<MenuEdit>): Promise<void> {
    Logger.info(`PagesService: updateItems ->`);

    try {
      const pages = await this.getItems();
      if (!pages || !pages.items) {
        return Promise.reject(new Error('No items found'));
      }

      const retItems = pages.items.map((item) => {
        const updateItem = items.find((x) => x.id === item.id);
        const ret = updateItem
          ? this.getUpdatedItem(updateItem, item)
          : undefined;
        return ret ?? item;
      });

      // Add item
      await this.writeFile({ ...pages, items: retItems });
      return Promise.resolve();
    } catch (error) {
      Logger.error(`PagesService: updateItems. Error -> ${error}`);
      return undefined;
    }
  }

  public async fixAllEntries(): Promise<any> {
    Logger.info(`PagesService: fixAllEntries -> `);

    try {
      const pages = await this.getItems();
      if (!pages || !pages.items) {
        return Promise.reject(new Error('No items found'));
      }
      const data = pages.items.map((item) => {
        const newItem = cleanUpData<Page>(item);
        return newItem;
      });

      const newData = { ...pages, items: data };
      await this.writeFile(newData);
      return Promise.resolve();
    } catch (error) {
      Logger.error(`PagesService: fixAllEntries. Error -> ${error}`);
      return Promise.reject(new Error(`fixAllEntries. Error: ${error}`));
    }
  }

  public async listDuplicates(): Promise<any> {
    Logger.info(`PagesService: listDuplicates -> `);

    try {
      const item = await this.getItems();
      const duplicates = item?.items
        ?.map((x) => x.id?.toString() || x.name)
        .filter((x, i, a) => a.indexOf(x) !== i);
      // Filter out null
      const filtered = duplicates?.filter((x) => x);
      // Convert to string
      return { items: filtered };
    } catch (error) {
      Logger.error(`PagesService: listDuplicates -> ${error}`);
      return Promise.reject(new Error(`List Duplicates. Error: ${error}`));
    }
  }
}

import { readFile, writeFile } from 'fs/promises';
import { z } from 'zod';
import { MenuAdd } from '../types/MenuAdd.js';
import { MenuEdit } from '../types/MenuEdit.js';
import { Page } from '../types/Page.js';
import { Pages } from '../types/Pages.js';
import { ParentSortby } from '../types/ParentSortby.js';
import { Logger } from '../utils/Logger.js';
import { getFilePath } from '../utils/getFilePath.js';
import { isValidArray } from '../utils/helperUtils.js';
import { cleanUpData, getNextId } from '../utils/objectUtil.js';
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

  // Get the next id for the record
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

  // Write to file
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

  // Add item
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
        parentItems: [
          {
            id: item.parent.id,
            seq: item.parent.seq,
            sortby: item.parent.sortby,
          },
        ],
        content: false,
      };
      // Remove undefined values and sort
      const newItem = cleanUpData<Page>(itemToAdd);
      // Validate data
      const result = safeParse<addData>(menuAddSchema, newItem);
      if (result.error) {
        throw new Error(`addItem -> ${result.error}`);
      }

      // Take out text element
      const { text, ...rest } = newItem;

      // Add
      const newData: Pages = {
        ...pages,
        items: [...pages.items, { ...rest }],
      };
      // Write to file
      await this.writeFile(newData);
      return Promise.resolve();
    } catch (error) {
      Logger.error(`PagesService: addItem. Error -> ${error}`);
      return undefined;
    }
  }

  // ?
  private getUpdatedParent(
    updates: MenuEdit[] | undefined,
    currItem: Page | undefined,
  ): ParentSortby[] | undefined {
    Logger.info(`PagesService: getUpdatedParent ->`);

    try {
      if (!currItem || !updates || !isValidArray(updates)) {
        return undefined;
      }

      const newArr: ParentSortby[] = [];
      // Update existing item
      currItem.parentItems?.forEach((item) => {
        // Find the prior record
        const match = updates.find((x) => x.priorParent.id === item.id);

        const update = match && {
          id: match.newParent.id,
          seq: match.newParent.seq,
          sortby: match.newParent.sortby,
        };

        newArr.push(update ?? item);
      });

      //Second Loop through "new items"
      updates.forEach((x) => {
        const found = newArr.find((y) => y.id !== x.id);
        if (!found) {
          newArr.push(x.newParent);
        }
      });

      const filtered =
        currItem.type === 'page'
          ? newArr.map((x) => ({ id: x.id, seq: x.seq }))
          : newArr;
      const sorted = filtered.sort((a, b) => a.id - b.id);

      return sorted.length > 0 ? sorted : undefined;
    } catch (error) {
      Logger.error(`PagesService: getUpdatedParent. Error: -> ${error}`);
    }
    return undefined;
  }

  // Update multiple items in pagesIndex.json
  public async updateItems(items: ReadonlyArray<MenuEdit>): Promise<void> {
    Logger.info(`PagesService: updateItems ->`);

    try {
      const pages = await this.getItems();
      if (!pages || !pages.items) {
        return Promise.reject(new Error('No items found'));
      }

      let countUpdate = 0;
      let countTotal = 0;
      const countIn = items.length;

      // Loop through items from pagesIndex.json
      const retItems = pages.items.map((item) => {
        // Get the updates from the incoming records - could be more than one update per entry.
        const updateItems = items.filter((x) => x.id === item.id);
        // Check for zero length array
        const hasContent = isValidArray(updateItems);
        // Get the updated item or undefined.
        const updatedItem =
          hasContent && this.getUpdatedParent(updateItems, item);

        console.log('updatedItem', updatedItem);

        countUpdate += updatedItem ? 1 : 0;
        countTotal++;
        // Add update (if there is one) or original
        return updatedItem ?? item;
      });
    } catch (error) {
      Logger.error(`PagesService: updateItems. Error -> ${error}`);
      return undefined;
    }
  }

  // Standardize all entries in pagesIndex.json
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

  // List duplicates Ids
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

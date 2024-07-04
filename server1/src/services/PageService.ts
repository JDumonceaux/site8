import { z } from 'zod';
import { Page } from '../types/Page.js';
import { Pages } from '../types/Pages.js';
import { Logger } from '../utils/Logger.js';
import { cleanUpData } from '../utils/objectUtil.js';
import { safeParse } from '../utils/zodHelper.js';
import { PageFileService } from './PageFileService.js';
import { PagesService } from './PagesService.js';

const pageAddSchema = z
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
    (data) => data.to || data.url,
    'Either to or url should be filled in.',
  );
type addData = z.infer<typeof pageAddSchema>;

export class PageService {
  // Get Items
  private async getItems(): Promise<Pages | undefined> {
    return new PagesService().getItems();
  }

  // Write Items
  private async writeItems(newData: Pages): Promise<boolean> {
    return new PagesService().writeFile(newData);
  }

  // Get Item
  public async getItem(id: number): Promise<Page | undefined> {
    Logger.info(`PageService: getItem -> ${id}`);
    // Get the current file
    const items = await this.getItems();
    return items?.items?.find((x) => x.id === id);
  }

  private async getItemWithFile(
    item: Page | undefined,
  ): Promise<Page | undefined> {
    Logger.info(`PageService: getItemWithFile `);

    if (!item || item?.id === 0) {
      throw new Error('getItem -> Item not found');
    }
    // Only get file if it exists
    // const file = item.hasFile
    //   ? await new PageFileService().getFile(item.id)
    //   : undefined;
    const file = await new PageFileService().getFile(item.id);
    return item ? { ...item, text: file } : undefined;
  }

  // Get Item Complete
  public async getItemCompleteByName(name: string): Promise<Page | undefined> {
    Logger.info(`PageService: getItemComplete -> ${name}`);
    const items = await this.getItems();
    const item = items?.items?.find((x) => x.to === name);
    return this.getItemWithFile(item);
  }

  // Get Item Complete
  public async getItemCompleteById(id: number): Promise<Page | undefined> {
    Logger.info(`PageService: getItemComplete -> ${id}`);
    const items = await this.getItems();
    const item = items?.items?.find((x) => x.id === id);
    return this.getItemWithFile(item);
  }

  // Add an item
  public async addItem(item: Page): Promise<number> {
    Logger.info(`PageService: addItem -> `);

    try {
      // Clean up the item
      const updatedItem = cleanUpData<Page>(item);
      if (!updatedItem) {
        throw new Error('addItem -> Invalid item');
      }

      const valid = safeParse<addData>(pageAddSchema, item);
      if (valid.error) {
        throw new Error(`addItem -> ${valid.error}`);
      }

      // Get the current file
      const pages = await this.getItems();
      if (!pages) {
        throw new Error('addItem -> Index missing');
      }

      // Remove id and text from item
      const { text, id, ...rest } = updatedItem;
      const newItem = { id: id, ...rest };
      if (updatedItem.text && updatedItem.text.length > 0) {
        newItem.hasFile = true;
      }
      // Save the new item
      const updatedFile: Pages = {
        ...pages,
        items: [...(pages?.items ?? []), newItem],
      };
      const result = await this.writeItems(updatedFile);
      return result
        ? Promise.resolve(id)
        : Promise.reject(new Error(`Add failed : ${id}`));
    } catch (error) {
      Logger.error(`PageService: addItem. Error -> ${error}`);
      return Promise.reject(new Error('add failed'));
    }
  }

  // Update an item
  public async updateItem(item: Page): Promise<number> {
    Logger.info(`PageService: updateItem -> `);

    try {
      // Clean up the item
      const updatedItem = cleanUpData<Page>(item);
      if (!updatedItem) {
        throw new Error('addItem -> Invalid item');
      }
      // Get the current file
      const pages = await this.getItems();
      if (!pages) {
        throw new Error('addItem -> Index missing');
      }

      // Remove the current item from the item
      const ret = pages?.items?.filter((x) => x.id !== item.id) || [];

      // We don't want to update the text field and create_date so we'll remove them
      const { text, create_date, ...rest } = updatedItem;
      const newItem = { ...rest };
      if (updatedItem.text && updatedItem.text.length > 0) {
        newItem.hasFile = true;
      }

      const updatedFile: Pages = {
        ...pages,
        items: [...ret, newItem],
      };

      const result = await this.writeItems(updatedFile);
      return result
        ? Promise.resolve(item.id)
        : Promise.reject(new Error(`Add failed : ${item.id}`));
    } catch (error) {
      Logger.error(`PageService: updateItem. Error -> ${error}`);
      return Promise.reject(new Error('fail'));
    }
  }

  // Delete an item
  public async deleteItem(id: number): Promise<boolean> {
    Logger.info(`PageService: deleteItem -> `);

    try {
      // Get the current file
      const pages = await this.getItems();
      if (!pages) {
        throw new Error('deleteItem -> Failed to read file');
      }

      const ret = pages?.items?.filter((x) => x.id !== id);

      const updatedFile: Pages = {
        ...pages,
        items: ret ? { ...ret } : [],
      };
      await this.writeItems(updatedFile);
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PageService: deleteItem. Error -> ${error}`);
      return Promise.reject(new Error(`Failed to delete item: ${id}`));
    }
  }
}

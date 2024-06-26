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
    content: z.boolean(),
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

  // Get Item Complete - including content
  public async getItemCompleteByName(name: string): Promise<Page | undefined> {
    Logger.info(`PageService: getItemComplete -> ${name}`);
    const items = await this.getItems();
    const ret = items?.items?.find((x) => x.to === name);
    if (!ret || ret?.id === 0) {
      throw new Error('getItem -> Item not found');
    }
    // Only get file if it exists
    const file = ret.content
      ? await new PageFileService().getFile(ret.id)
      : undefined;
    return ret ? { ...ret, text: file } : undefined;
  }

  // Get Item Complete
  public async getItemCompleteById(id: number): Promise<Page | undefined> {
    Logger.info(`PageService: getItemComplete -> ${id}`);
    const items = await this.getItems();
    const ret = items?.items?.find((x) => x.id === id);
    if (!ret || ret?.id === 0) {
      throw new Error('getItem -> Item not found');
    }
    // Only get file if it exists
    const file = ret.content
      ? await new PageFileService().getFile(ret.id)
      : undefined;
    return ret ? { ...ret, text: file } : undefined;
  }

  // Add an item
  public async addItem(data: Page): Promise<void> {
    Logger.info(`PageService: addItem -> `);

    try {
      // Clean up the data
      const item = cleanUpData<Page>(data);
      if (!item) {
        throw new Error('addItem -> Invalid item');
      }

      const parse = safeParse<addData>(pageAddSchema, data);
      if (parse.error) {
        throw new Error(`addItem -> ${parse.error}`);
      }

      // Get the current file
      const pages = await this.getItems();
      if (!pages) {
        throw new Error('addItem -> Index missing');
      }

      // Remove text property from item
      const { text, ...rest } = item;
      const itemToAdd = { ...rest };
      // Save the new item
      const updatedFile: Pages = {
        ...pages,
        items: [...(pages?.items ?? []), itemToAdd],
      };

      const result = await this.writeItems(updatedFile);
      if (!result) {
        throw new Error('updateItem -> Failed to write file');
      }

      return Promise.resolve();
    } catch (error) {
      Logger.error(`PageService: addItem. Error -> ${error}`);
      return Promise.reject(new Error('add failed'));
    }
  }

  // Update an item
  public async updateItem(data: Page): Promise<void> {
    Logger.info(`PageService: updateItem -> `);

    try {
      // Clean up the data
      const item = cleanUpData<Page>(data);
      if (!item) {
        throw new Error('updateItem -> Invalid item');
      }
      // Get the current file
      const pages = await this.getItems();
      if (!pages) {
        throw new Error('updateItem -> Items missing');
      }

      // Remove the current item from the data
      const ret = pages?.items?.filter((x) => x.id !== item.id) || [];

      // We don't want to update the text field and create_date so we'll remove them
      const { text, create_date, ...rest } = item;
      const itemToAdd = { ...rest };

      const updatedFile: Pages = {
        ...pages,
        items: [...ret, itemToAdd],
      };

      const result = await this.writeItems(updatedFile);
      if (!result) {
        throw new Error('updateItem -> Failed to write file');
      }
      return Promise.resolve();
    } catch (error) {
      Logger.error(`PageService: updateItem. Error -> ${error}`);
      return Promise.reject(new Error('Failed to write file'));
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

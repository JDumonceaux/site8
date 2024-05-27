import { Logger } from '../utils/Logger.js';
import { Page } from '../types/Page.js';
import { Pages } from '../types/Pages.js';
import { PagesService } from './PagesService.js';
import { cleanUpData } from '../utils/objectUtil.js';
import { PageFileService } from './PageFileService.js';
import { z } from 'zod';
import { safeParse } from '../utils/zodHelper.js';

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

export class PageService extends PagesService {
  // Get Item
  public async getItem(id: number): Promise<Page | undefined> {
    Logger.info(`PageService: getItem -> ${id}`);
    // Get the current file
    const items = await this.getItems();
    return items?.items?.find((x) => x.id === id);
  }

  // Get Item Complete
  public async getItemCompleteByName(name: string): Promise<Page | undefined> {
    Logger.info(`PageService: getItemComplete -> ${name}`);
    const items = await this.getItems();
    const ret = items?.items?.find((x) => x.name === name);
    if (!ret || ret?.id === 0) {
      throw new Error('getItem -> Item not found');
    }
    const file = await new PageFileService().getFile(ret.id);
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
    const file = await new PageFileService().getFile(ret.id);
    return ret ? { ...ret, text: file } : undefined;
  }

  // Add an item
  public async addItem(data: Page, idNew: number): Promise<number> {
    Logger.info(`PageService: addItem -> `);

    // Get the current file contents
    try {
      // Clean up the data
      const updatedItem = cleanUpData<Page>(data);
      if (!updatedItem) {
        throw new Error('addItem -> Invalid item');
      }

      const result = safeParse<addData>(pageAddSchema, data);
      if (result.error) {
        throw new Error(`addItem -> ${result.error}`);
      }

      // Get the current file
      const pages = await this.getItems();
      if (!pages) {
        throw new Error('addItem -> Index missing');
      }

      // Remove id and text from item
      const { id, text, ...rest } = updatedItem;
      const newItem = { id: idNew, ...rest };

      // Save the new item
      const updatedFile: Pages = {
        ...pages,
        items: [...(pages?.items ?? []), newItem],
      };
      const ret = await this.writeFile(updatedFile);
      return ret
        ? Promise.resolve(id)
        : Promise.reject(new Error(`Add failed : ${id}`));
    } catch (error) {
      Logger.error(`PageService: addItem -> ${error}`);
      return Promise.reject(new Error('add failed'));
    }
  }

  // Update an item
  public async updateItem(data: Page, file: boolean): Promise<number> {
    Logger.info(`PageService: updateItem -> `);

    try {
      // Clean up the data
      const newItem = cleanUpData<Page>(data);
      if (!newItem) {
        throw new Error('addItem -> Invalid item');
      }
      // Get the current file
      const pages = await this.getItems();
      if (!pages) {
        throw new Error('addItem -> Index missing');
      }

      // Remove the current item from the data
      const ret = pages?.items?.filter((x) => x.id !== data.id) || [];

      // We don't want to update the text field and create_date so we'll remove them
      const { text, create_date, ...rest } = newItem;

      const updatedFile: Pages = {
        ...pages,
        items: [...ret, newItem],
      };

      await this.writeFile(updatedFile);
      return Promise.resolve(data.id);
    } catch (error) {
      Logger.error(`PageService: updateItem -> ${error}`);
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
      await this.writeFile(updatedFile);
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PageService: deleteItem -> ${error}`);
      return Promise.reject(new Error(`Failed to delete item: ${id}`));
    }
  }
}

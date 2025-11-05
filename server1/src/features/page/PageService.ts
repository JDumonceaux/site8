import { z } from 'zod';

import { mapPageMenuToPageText } from './mapPageMenuToPageText.js';
import { PageFileService } from './PageFileService.js';
import { Logger } from '../../lib/utils/logger.js';
import { cleanUpData } from '../../lib/utils/objectUtil.js';
import { safeParse } from '../../lib/utils/zodHelper.js';
import { PagesService } from '../pages/PagesService.js';

import type { PageEdit } from '../../types/Page.js';
import type { PageMenu } from '../../types/PageMenu.js';
import type { Pages } from '../../types/Pages.js';
import type { PageText } from '../../types/PageText.js';

const PAGE_ADD_SCHEMA = z
  .object({
    id: z.number(),
    name: z
      .string({
        message: 'Name is required and must be a string',
      })
      .min(1, 'Name is required.')
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

type AddData = z.infer<typeof PAGE_ADD_SCHEMA>;

export class PageService {
  private readonly pagesService: PagesService;
  private readonly pageFileService: PageFileService;

  constructor() {
    this.pagesService = new PagesService();
    this.pageFileService = new PageFileService();
  }

  private async getItems(): Promise<Pages | undefined> {
    return this.pagesService.getItems();
  }

  private async writeItems(newData: Pages): Promise<boolean> {
    return this.pagesService.writeFile(newData);
  }

  public async getItem(id: number): Promise<PageText | undefined> {
    Logger.info(`PageService: getItem -> ${id}`);

    const items = await this.getItems();
    const item = items?.items?.find((x) => x.id === id);

    return mapPageMenuToPageText(item);
  }

  private async getItemWithFile(
    item: PageMenu | undefined,
  ): Promise<PageText | undefined> {
    Logger.info('PageService: getItemWithFile');

    if (!item || item.id === 0) {
      throw new Error('Item not found');
    }

    const file = await this.pageFileService.getFile(item.id);
    const result = mapPageMenuToPageText(item);

    return result ? { ...result, text: file } : undefined;
  }

  public async getItemCompleteByName(
    name: string,
  ): Promise<PageText | undefined> {
    Logger.info(`PageService: getItemCompleteByName -> ${name}`);

    const items = await this.getItems();
    const item = items?.items?.find((x) => x.to === name);

    return this.getItemWithFile(item);
  }

  public async getItemCompleteById(id: number): Promise<PageText | undefined> {
    Logger.info(`PageService: getItemCompleteById -> ${id}`);

    const items = await this.getItems();
    const item = items?.items?.find((x) => x.id === id);

    return this.getItemWithFile(item);
  }

  public async addItem(item: PageEdit): Promise<number> {
    Logger.info('PageService: addItem');

    try {
      const updatedItem = cleanUpData<PageEdit>(item);

      if (!updatedItem) {
        throw new Error('Invalid item');
      }

      // Transform the item to match the validation schema
      const parentItems = updatedItem.parentItems?.map(({ id, seq }) => ({
        id,
        seq,
      }));

      if (!parentItems || parentItems.length === 0) {
        throw new Error(
          'parentItems is required and must have at least one item',
        );
      }

      const validationData = {
        id: updatedItem.id,
        name: updatedItem.title,
        to: updatedItem.to,
        url: updatedItem.url,
        parentItems,
      };

      const valid = safeParse<AddData>(PAGE_ADD_SCHEMA, validationData);

      if (valid.error) {
        throw new Error(`Validation failed: ${valid.error}`);
      }

      const pages = await this.getItems();

      if (!pages) {
        throw new Error('Index file not found');
      }

      const { text, id, ...rest } = updatedItem;
      const newItem = {
        id,
        ...rest,
        ...(text && text.length > 0 ? { file: true } : {}),
      };

      const updatedFile: Pages = {
        ...pages,
        items: [...(pages.items ?? []), newItem],
      };

      const result = await this.writeItems(updatedFile);

      if (!result) {
        throw new Error(`Failed to add item with id: ${id}`);
      }

      return id;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`PageService: Error adding item - ${errorMessage}`, {
        error,
      });
      throw new Error(`Failed to add item: ${errorMessage}`);
    }
  }

  public async updateItem(item: PageEdit): Promise<number> {
    Logger.info('PageService: updateItem');

    try {
      const updatedItem = cleanUpData<PageEdit>(item);

      if (!updatedItem) {
        throw new Error('Invalid item');
      }

      const pages = await this.getItems();

      if (!pages) {
        throw new Error('Index file not found');
      }

      const filteredItems = pages.items?.filter((x) => x.id !== item.id) ?? [];
      const { text, create_date, ...rest } = updatedItem;

      const newItem = {
        ...rest,
        ...(text && text.length > 0 ? { file: true } : {}),
      };

      const updatedFile: Pages = {
        ...pages,
        items: [...filteredItems, newItem],
      };

      const result = await this.writeItems(updatedFile);

      if (!result) {
        throw new Error(`Failed to update item with id: ${item.id}`);
      }

      return item.id;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`PageService: Error updating item - ${errorMessage}`, {
        error,
      });
      throw new Error(`Failed to update item: ${errorMessage}`);
    }
  }

  public async deleteItem(id: number): Promise<boolean> {
    Logger.info('PageService: deleteItem');

    try {
      const pages = await this.getItems();

      if (!pages) {
        throw new Error('Index file not found');
      }

      const filteredItems = pages.items?.filter((x) => x.id !== id) ?? [];

      const updatedFile: Pages = {
        ...pages,
        items: filteredItems,
      };

      await this.writeItems(updatedFile);

      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`PageService: Error deleting item - ${errorMessage}`, {
        error,
      });
      throw new Error(`Failed to delete item with id: ${id}`);
    }
  }
}

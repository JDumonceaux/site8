import { z } from 'zod';

import type { PageEdit } from '@site8/shared';
import type { PageMenu } from '@site8/shared';
import type { Pages } from '@site8/shared';
import type { PageText } from '../../types/PageText.js';

import { Logger } from '../../utils/logger.js';
import { cleanUpData } from '../../utils/objectUtil.js';
import { safeParse } from '../../utils/zodHelper.js';
import { PagesService } from '../pages/PagesService.js';

import { mapPageMenuToPageText } from './mapPageMenuToPageText.js';
import { PageFileService } from './PageFileService.js';

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

type AddData = z.infer<typeof PAGE_ADD_SCHEMA>;

export class PageService {
  private readonly pageFileService: PageFileService;
  private readonly pagesService: PagesService;

  public constructor() {
    this.pagesService = new PagesService();
    this.pageFileService = new PageFileService();
  }

  public async addItem(item: PageEdit): Promise<number> {
    Logger.info('PageService: addItem');

    try {
      const updatedItem = cleanUpData<PageEdit>(item);

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
        parentItems,
        to: updatedItem.to,
        url: updatedItem.url,
      };

      const valid = safeParse<AddData>(PAGE_ADD_SCHEMA, validationData);

      if (valid.error) {
        throw new Error(`Validation failed: ${valid.error}`);
      }

      const pages = await this.getItems();

      if (!pages) {
        throw new Error('Index file not found');
      }

      const { id, text, ...rest } = updatedItem;
      const newItem = {
        id,
        ...rest,
        ...(text && text.length > 0 ? { file: true } : {}),
      };

      const updatedFile: Pages = {
        ...pages,
        items: [...(pages.items ?? []), newItem],
      };

      await this.writeItems(updatedFile);

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

  public async getItem(id: number): Promise<PageText | undefined> {
    Logger.info(`PageService: getItem -> ${id}`);

    const items = await this.getItems();
    const item = items?.items?.find((x) => x.id === id);

    return mapPageMenuToPageText(item);
  }

  public async getItemCompleteById(id: number): Promise<PageText | undefined> {
    Logger.info(`PageService: getItemCompleteById -> ${id}`);

    const items = await this.getItems();
    const item = items?.items?.find((x) => x.id === id);

    return this.getItemWithFile(item);
  }

  public async getItemCompleteByName(
    name: string,
  ): Promise<PageText | undefined> {
    Logger.info(`PageService: getItemCompleteByName -> ${name}`);

    const items = await this.getItems();
    const item = items?.items?.find((x) => x.to === name);

    return this.getItemWithFile(item);
  }

  public async updateItem(item: PageEdit): Promise<number> {
    Logger.info('PageService: updateItem');

    try {
      const updatedItem = cleanUpData<PageEdit>(item);

      const pages = await this.getItems();

      if (!pages) {
        throw new Error('Index file not found');
      }

      const filteredItems = pages.items?.filter((x) => x.id !== item.id) ?? [];
      const { text, ...rest } = updatedItem;

      const newItem = {
        ...rest,
        ...(text && text.length > 0 ? { file: true } : {}),
      };

      const updatedFile: Pages = {
        ...pages,
        items: [...filteredItems, newItem],
      };

      await this.writeItems(updatedFile);

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

  private async getItems(): Promise<Pages | undefined> {
    return this.pagesService.getItems();
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

  private async writeItems(newData: Pages): Promise<void> {
    await this.pagesService.writeData(newData);
  }
}

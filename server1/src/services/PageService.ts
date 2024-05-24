import { Logger } from '../utils/Logger.js';
import { Page } from '../types/Page.js';
import { Pages } from '../types/Pages.js';
import { PagesService } from './PagesService.js';
import { cleanUpData } from '../utils/objectUtil.js';
import { PageFileService } from './PageFileService.js';

const DEFAULT_METADATA = { title: 'Pages' };

export class PageService extends PagesService {
  // Get Item
  public async getItem(id: number): Promise<Page | undefined> {
    Logger.error(`PageService: getItem -> `);

    try {
      // Get the current file
      const items = await this.getItems();
      const ret = items?.items?.find((x) => x.id === id);
      return ret;
    } catch (error) {
      Logger.error(`PageService: addItem -> ${error}`);
      return Promise.resolve(undefined);
    }
  }

  // Get Item Complete
  public async getItemComplete(id: number): Promise<Page | undefined> {
    Logger.error(`PageService: getItem -> `);

    try {
      const ret = await Promise.all([
        await new PageService().getItem(id),
        await new PageFileService().getFile(id),
      ]);
    } catch (error) {
      Logger.error(`PageService: addItem -> ${error}`);
      return Promise.resolve(undefined);
    }
  }

  // Add an item
  public async addItem(data: Page, idNew: number): Promise<number> {
    Logger.error(`PageService: addItem -> `);

    // Get the current file contents
    try {
      // Clean up the data
      const updatedItem = cleanUpData<Page>(data);
      if (!updatedItem) {
        throw new Error('addItem -> Invalid item');
      }
      // Get the current file
      const items = await this.getItems();

      const { id, ...rest } = updatedItem;
      const newItem = { id: idNew, ...rest };

      // Save the new item
      const updatedFile: Pages = {
        metadata: items?.metadata || DEFAULT_METADATA,
        items: [...(items?.items ?? []), newItem],
      };
      await this.writeFile(updatedFile);
      return Promise.resolve(id);
    } catch (error) {
      Logger.error(`PageService: addItem -> ${error}`);
      return Promise.reject(new Error('add failed'));
    }
  }

  // Update an item
  public async updateItem(data: Page, file: boolean): Promise<number> {
    Logger.error(`PageService: updateItem -> `);

    try {
      // Clean up the data
      const newItem = cleanUpData<Page>(data);
      if (!newItem) {
        throw new Error('addItem -> Invalid item');
      }
      // Get the current file
      const items = await this.getItems();
      // Remove the current item from the data
      const ret = items?.items?.filter((x) => x.id !== data.id) || [];

      // We don't want to update the text field and create_date so we'll remove them
      const { text, create_date, ...rest } = newItem;

      const updatedFile: Pages = {
        metadata: items?.metadata || DEFAULT_METADATA,
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
    Logger.error(`PageService: deleteItem -> `);

    try {
      const items = await this.getItems();
      const ret = items?.items?.filter((x) => x.id !== id);

      const updatedFile: Pages = {
        metadata: items?.metadata || DEFAULT_METADATA,
        items: ret ? { ...ret } : [],
      };
      await this.writeFile(updatedFile);
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PageService: deleteItem -> ${error}`);
      return Promise.resolve(false);
    }
  }

  public async listDuplicates(): Promise<string[] | string | undefined> {
    Logger.error(`PageService: listDuplicates -> `);

    try {
      const item = await this.getItems();
      const duplicates = item?.items
        ?.map((x) => x.id)
        .filter((x, i, a) => a.indexOf(x) !== i);
      // Filter out null
      const filtered = duplicates?.filter((x) => x);
      const ret = filtered?.map((x) => x.toString());

      return ret && ret.length > 0 ? ret : 'No duplicates found';
    } catch (error) {
      Logger.error(`PageService: listDuplicates -> ${error}`);
      return 'No duplicates found';
    }
  }
}

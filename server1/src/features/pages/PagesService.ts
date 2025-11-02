import { readFile, writeFile } from 'fs/promises';
import FilePath from '../files/FilePath.js';
import { isValidArray } from '../../lib/utils/helperUtils.js';
import { Logger } from '../../lib/utils/logger.js';
import { cleanUpData, getNextId } from '../../lib/utils/objectUtil.js';
import { MenuEdit } from '../../types/MenuEdit.js';
import { PageMenu } from '../../types/PageMenu.js';
import { Pages } from '../../types/Pages.js';
import { PagesIndex } from '../../types/PagesIndex.js';
import { ParentSortby } from '../../types/ParentSortby.js';

export class PagesService {
  private readonly FILE_NAME = 'pagesIndex.json';
  private readonly filePath: string;

  constructor() {
    this.filePath = FilePath.getDataDir(this.FILE_NAME);
  }

  public async getItems(): Promise<PagesIndex | undefined> {
    Logger.info('PagesService: getItems');

    try {
      const data = await readFile(this.filePath, { encoding: 'utf8' });

      if (!data?.trim()) {
        Logger.warn('PagesService: No data found');
        return undefined;
      }

      const parsedData = JSON.parse(data) as PagesIndex;
      Logger.info('PagesService: Successfully retrieved items');
      return parsedData;
    } catch (error) {
      if (error instanceof SyntaxError) {
        Logger.error(`PagesService: Invalid JSON - ${error.message}`, {
          error,
        });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        Logger.error(`PagesService: Error reading items - ${errorMessage}`, {
          error,
          filePath: this.filePath,
        });
      }
      return undefined;
    }
  }

  public async getNextId(): Promise<number | undefined> {
    Logger.info('PagesService: getNextId');

    try {
      const data = await this.getItems();
      const nextId = getNextId<PageMenu>(data?.items);

      Logger.info(`PagesService: Next ID is ${nextId ?? 'undefined'}`);
      return nextId;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`PagesService: Error getting next ID - ${errorMessage}`, {
        error,
      });
      return undefined;
    }
  }

  public async writeFile(data: Pages): Promise<boolean> {
    Logger.info('PagesService: writeFile');

    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });

      Logger.info('PagesService: Successfully wrote file');
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`PagesService: Error writing file - ${errorMessage}`, {
        error,
        filePath: this.filePath,
      });
      throw error;
    }
  }

  private getUpdatedParentItems(
    updates: MenuEdit[] | undefined,
    currItem: PageMenu | undefined,
  ): ParentSortby[] | undefined {
    Logger.info('PagesService: getUpdatedParentItems');

    try {
      if (!currItem || !updates || !isValidArray(updates)) {
        return undefined;
      }

      const updatedItems: ParentSortby[] = [];

      currItem.parentItems?.forEach((item) => {
        const match = updates.find((x) => x.priorParent.id === item.id);

        const update = match
          ? {
              id: match.newParent.id,
              seq: match.newParent.seq,
              sortby: match.newParent.sortby,
            }
          : item;

        updatedItems.push(update);
      });

      updates.forEach((update) => {
        const found = updatedItems.find(
          (item) => item.id === update.newParent.id,
        );
        if (!found) {
          updatedItems.push(update.newParent);
        }
      });

      const filtered =
        currItem.type === 'page'
          ? updatedItems.map((x) => ({ id: x.id, seq: x.seq }))
          : updatedItems;

      const sorted = [...filtered].sort((a, b) => a.id - b.id);

      return sorted.length > 0 ? sorted : undefined;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `PagesService: Error updating parent items - ${errorMessage}`,
        { error },
      );
      return undefined;
    }
  }

  public async updateItems(items: ReadonlyArray<MenuEdit>): Promise<void> {
    Logger.info('PagesService: updateItems');

    try {
      const pages = await this.getItems();

      if (!pages?.items) {
        throw new Error('No items found');
      }

      const updatedItems = pages.items.map((item) => {
        const updates = items.filter((x) => x.id === item.id);
        const hasUpdates = isValidArray(updates);
        const updatedParentItems = hasUpdates
          ? this.getUpdatedParentItems(updates, item)
          : undefined;

        return updatedParentItems
          ? { ...item, parentItems: updatedParentItems }
          : item;
      });

      await this.writeFile({ ...pages, items: updatedItems });
      Logger.info('PagesService: Successfully updated items');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`PagesService: Error updating items - ${errorMessage}`, {
        error,
      });
      throw error;
    }
  }

  public async fixAllEntries(): Promise<void> {
    Logger.info('PagesService: fixAllEntries');

    try {
      const pages = await this.getItems();

      if (!pages?.items) {
        throw new Error('No items found');
      }

      const cleanedItems = pages.items.map((item) =>
        cleanUpData<PageMenu>(item),
      );
      const newData = { ...pages, items: cleanedItems };

      await this.writeFile(newData);
      Logger.info('PagesService: Successfully fixed all entries');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`PagesService: Error fixing entries - ${errorMessage}`, {
        error,
      });
      throw error;
    }
  }

  public async listDuplicates(): Promise<{ readonly items: string[] }> {
    Logger.info('PagesService: listDuplicates');

    try {
      const data = await this.getItems();

      if (!data?.items) {
        return { items: [] };
      }

      const allIds = data.items.map((x) => x.id?.toString() ?? x.title);
      const duplicates = allIds.filter((x, i, arr) => arr.indexOf(x) !== i);
      const filtered = [...new Set(duplicates)].filter((x) => x);

      Logger.info(`PagesService: Found ${filtered.length} duplicates`);
      return { items: filtered };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`PagesService: Error listing duplicates - ${errorMessage}`, {
        error,
      });
      throw error;
    }
  }
}

import type { MenuEdit } from '../../types/MenuEdit.js';
import type { PageMenu } from '../../types/PageMenu.js';
import type { Pages } from '../../types/Pages.js';
import type { ParentSortby } from '../../types/ParentSortby.js';

import { BaseDataService } from '../../services/BaseDataService.js';
import { isValidArray } from '../../utils/helperUtils.js';
import { Logger } from '../../utils/logger.js';
import { cleanUpData } from '../../utils/objectUtil.js';
import FilePath from '../files/FilePath.js';

export class PagesService extends BaseDataService<Pages> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('pages.json'),
      serviceName: 'PagesService',
    });
  }

  /**
   * Fixes all entries by cleaning up data
   */
  public override async fixAllEntries(): Promise<void> {
    await super.fixAllEntries<PageMenu>((item) => cleanUpData<PageMenu>(item));
  }

  /**
   * Updates menu items with new parent relationships
   */
  public async updateItems(items: readonly MenuEdit[]): Promise<void> {
    Logger.info('PagesService: updateItems');

    try {
      const pages: Pages | undefined = await this.getItems();

      if (!pages?.items) {
        throw new Error('No items found');
      }

      const updatedItems: PageMenu[] = pages.items.map((item: PageMenu) => {
        const updates = items.filter((x) => x.id === item.id);
        const hasUpdates = isValidArray(updates);
        const updatedParentItems = hasUpdates
          ? this.getUpdatedParentItems(updates, item)
          : undefined;

        if (updatedParentItems) {
          return { ...item, parentItems: updatedParentItems } as PageMenu;
        }
        return item;
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
        error,
      );
      return undefined;
    }
  }
}

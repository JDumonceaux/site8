import type { PageMenu } from '../../types/PageMenu.js';
import type { PageText } from '../../types/PageText.js';

import { Logger } from '../../utils/logger.js';
import { PageFileService } from '../../features/page/PageFileService.js';
import { PagesService } from '../../features/pages/PagesService.js';

export class GenericService {
  /**
   * Finds a page that matches the name and has the specified parent
   */
  private static findPageWithParent(
    pages: readonly PageMenu[],
    parentIds: number[],
  ): PageMenu | undefined {
    for (const page of pages) {
      if (!page.parentItems) {
        continue;
      }

      const hasMatchingParent = page.parentItems.some((parentItem) =>
        parentIds.includes(parentItem.id),
      );

      if (hasMatchingParent) {
        return page;
      }
    }

    return undefined;
  }

  /**
   * Gets file contents for a given page ID
   */
  private static async getFile(id: number): Promise<string | undefined> {
    Logger.info(`GenericService: getFile -> ${id}`);
    return new PageFileService().getFile(id);
  }

  /**
   * Finds all page IDs that match the given parent name
   */
  private static getParentIds(
    parentName: string,
    items: readonly PageMenu[] | undefined,
  ): number[] | undefined {
    if (!items || items.length === 0) {
      Logger.warn(`GenericService: getParentIds -> items is empty`);
      return undefined;
    }

    const matchingParents = items.filter((x) => x.to === parentName);
    if (matchingParents.length === 0) {
      Logger.warn(
        `GenericService: getParentIds -> no parent found for '${parentName}'`,
      );
      return undefined;
    }

    return matchingParents.map((x) => x.id);
  }

  /**
   * Retrieves a page item by parent and name, with optional file content
   */
  public async getItem(
    parent: string,
    name: string,
  ): Promise<PageText | PageMenu | undefined> {
    Logger.info(`GenericService: getItem -> ${parent}/${name}`);

    const data = await new PagesService().getItems();
    if (!data?.items) {
      Logger.warn(`GenericService: getItem -> no data available`);
      return undefined;
    }

    // Find all pages matching the name
    const matchingPages = data.items.filter((x) => x.to === name);
    if (matchingPages.length === 0) {
      Logger.warn(`GenericService: getItem -> no items found for '${name}'`);
      return undefined;
    }

    // If only one match, return it
    if (matchingPages.length === 1) {
      const selectedPage = matchingPages[0] as PageMenu;
      const fileContent = await GenericService.getFile(selectedPage.id);
      if (fileContent) {
        return { ...selectedPage, text: fileContent } as PageText;
      }
      return selectedPage;
    }

    // Multiple matches - try to find by parent context
    // We know matchingPages has at least 2 items at this point
    const firstMatch = matchingPages[0] as PageMenu;
    const parentIds = GenericService.getParentIds(parent, data.items);
    const selectedPage =
      (parentIds
        ? GenericService.findPageWithParent(matchingPages, parentIds)
        : null) ?? firstMatch;

    // Try to get file content
    const fileContent = await GenericService.getFile(selectedPage.id);
    if (fileContent) {
      return { ...selectedPage, text: fileContent } as PageText;
    }

    return selectedPage;
  }
}

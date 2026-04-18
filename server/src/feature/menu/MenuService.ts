import type { IDataService } from '../../services/IDataService.js';
import type { Menus, Pages } from '@site8/shared';

import { Logger } from '../../utils/logger.js';

import { buildRecursiveMenuTree } from './menuTreeBuilder.js';

export class MenuService {
  private readonly pagesService: IDataService<Pages>;

  /**
   * Creates a new MenuService instance with dependency injection
   * @param pagesService - Service for accessing pages data
   */
  public constructor(pagesService: IDataService<Pages>) {
    this.pagesService = pagesService;
  }

  // 0. Get Menu | Admin > Pages
  public async getMenu(): Promise<Menus | undefined> {
    Logger.info(`MenuService: getMenu -> `);
    try {
      const data: Pages | undefined = await this.getItems();
      if (!data?.items) {
        return undefined;
      }
      const menuTree = buildRecursiveMenuTree(data.items);
      return {
        items: menuTree ?? [],
        metadata: data.metadata,
      };
    } catch (error) {
      Logger.error(`MenuService: getMenu --> Error: ${String(error)}`);
      throw error;
    }
  }

  private async getItems(): Promise<Pages | undefined> {
    return this.pagesService.getItems();
  }
}

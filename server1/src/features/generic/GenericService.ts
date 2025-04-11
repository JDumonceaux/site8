import { Logger } from '../../lib/utils/logger.js';
import { PageText } from '../../types/PageText.js';
import { PageMenu } from '../../types/PageMenu.js';
import { PageFileService } from '../page/PageFileService.js';
import { PagesService } from '../pages/PagesService.js';

export class GenericService {
  // Get Item
  public async getItem(
    parent: string,
    name: string,
  ): Promise<PageText | undefined> {
    Logger.info(`GenericService: getItem -> ${parent}/${name}`);
    const items = await new PagesService().getItems();

    // Find items
    const ret = items?.items?.filter((x) => x.to === name);
    if (!ret || ret.length === 0) {
      Logger.warn(`GenericService: getItem -> no items found`);
      return undefined;
    }
    // Find parent id
    const parentIds = this.getParentIds(parent, items?.items);
    if (!parentIds) {
      return ret[0];
    }
    // Find a parent match
    const match = (() => {
      for (const x of ret) {
        if (x.parentItems) {
          for (const p of x.parentItems) {
            for (const id of parentIds) {
              if (p.id === id) {
                return x;
              }
            }
          }
        }
      }
      return ret[0];
    })();

    if (!match) {
      Logger.warn(`GenericService: getItem -> no parent match`);
    }
    // Get file (i.e. contents)
    const file = await this.getFile(match.id);
    if (file) {
      return { ...match, text: file };
    }
    return match;
  }
  // get matching file (i.e. contents)
  private async getFile(id: number): Promise<string | undefined> {
    Logger.info(`GenericService: getFile -> ${id}`);
    const item = await new PageFileService().getFile(id);
    return item;
  }

  // Get ids for possible parents
  private getParentIds(
    parentName: string,
    items: ReadonlyArray<PageMenu> | undefined,
  ): number[] | undefined {
    if (!items || items.length === 0) {
      Logger.warn(`GenericService: getParentId -> items is empty`);
      return undefined;
    }
    const ret = items.filter((x) => x.to === parentName);
    if (!ret || ret.length === 0) {
      Logger.warn(`GenericService: getParentId -> no parent found`);
      return undefined;
    }
    return ret.map((x) => x.id);
  }
}

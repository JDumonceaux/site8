import { Logger } from '../../lib/utils/logger.js';
import { PageText } from '../../types/PageText.js';
import { PagesService } from '../pages/PagesService.js';

export class GenericService {
  // Get Item
  public async getItem(name: string): Promise<PageText | undefined> {
    Logger.info(`GenericService: getItem -> ${name}`);
    const items = await new PagesService().getItems();
    const item = items?.items?.find((x) => x.to === name);
    return this.getItemWithFile(item);
  }
}

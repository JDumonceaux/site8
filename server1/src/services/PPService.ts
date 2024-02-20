import { Logger } from '../utils/Logger.js';
import { IPage } from '../models/IPage.js';
import { PagesService } from './PagesService.js';
import { PageService } from './PageService.js';

export class PPService {
  public async getAllData(id: number): Promise<IPage | undefined> {
    Logger.info(`pageRouter: getAllData ->`);
    const service = new PagesService();
    const service2 = new PageService();

    try {
      const pageSummary = await service.getMetaData(id);
      const text = await service2.getItem(id);
      if (pageSummary) {
        return { ...pageSummary, text: text };
      }
      return undefined;
    } catch (error) {
      Logger.error(`pageRouter: getAllData -> Error: ${error}`);
      throw new Error('Failed to get all data');
    }
  }
}

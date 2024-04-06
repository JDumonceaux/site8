import { Logger } from '../utils/Logger.js';
import { PagesService } from './PagesService.js';
import { PageService } from './PageService.js';

export class PPService {

    async getAllData(id) : <JSON | undefined> {
        Logger.info(`pageRouter: getAllData ->`);
        try {
            const service = new PagesService();
            const pageSummary = await service.getMetaData(id);
            const service2 = new PageService();
            const text = await service2.getItem(id);
            if (pageSummary) {
                return { ...pageSummary, text };
            }
            return undefined;
        }
        catch (error) {
            Logger.error(`pageRouter: getAllData -> Error: ${error}`);
            throw new Error('Failed to get all data');
        }
    }
}

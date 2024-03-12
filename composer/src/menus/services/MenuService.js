import { Logger } from '../utils/Logger.js';
import { PagesService } from './PagesService.js';
export class MenuService {
    async getMenus() {
        Logger.info(`MenuService: getMenus -> `);
        try {
            const service = new PagesService();
            // Get all the data from pages.json
            const data = await service.getItems();
            if (!data) {
                return undefined;
            }
            // Sort the menus by seq
            const sortedMenu = data.menus.toSorted((a, b) => a.seq - b.seq);
            const ret = {
                metadata: data.metadata,
                items: sortedMenu.map((item) => {
                    const pages = data.items.filter((x) => x.parentId === item.id);
                    // Convert the pages to PageSummary
                    const mapMenuItems = pages.map((x) => ({
                        id: x.id,
                        name: x.name,
                        url: x.url ?? '',
                        seq: x.seq ?? 0,
                    }));
                    const sortedMapMenuItems = item.sort === 'seq'
                        ? mapMenuItems.toSorted((a, b) => a.seq - b.seq)
                        : mapMenuItems.toSorted((a, b) => a.name.localeCompare(b.name));
                    return {
                        ...item,
                        items: sortedMapMenuItems,
                    };
                }),
            };
            return ret;
        }
        catch (error) {
            Logger.error(`MenuService: getMenus --> Error: ${error}`);
            throw error;
        }
    }
}

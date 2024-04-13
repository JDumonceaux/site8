import { Logger } from "../utils/Logger.js";
import { Pages } from "types/Pages.js";
import { Menu } from "types/Menu.js";
import { PagesService } from "./PagesService.js";
import { PageSummary } from "types/PageSummary.js";

export class MenuService {
  public async getMenus(): Promise<Pages | undefined> {
    Logger.info(`MenuService: getMenus -> `);
    try {
      const service = new PagesService();
      // Get all the data from pagesIndex.json
      const data = await service.getItems();

      if (!data || !data.menus) {
        return undefined;
      }

      // Sort the menus by seq
      const sortedMenu: Menu[] = data.menus.toSorted((a, b) => a.seq - b.seq);
      const ret: Pages = {
        metadata: data.metadata,
        items: sortedMenu.map((item) => {
          const pages = data.items.filter((x) => x.parentId === item.id);

          // Convert the pages to PageSummary
          const mapMenuItems: PageSummary[] = pages.map((x) => ({
            id: x.id,
            name: x.name,
            url: x.url ?? "",
            seq: x.seq ?? 0,
          }));
          // Sort Items
          const sortedMapMenuItems: PageSummary[] =
            item.sort === "seq"
              ? mapMenuItems.toSorted((a, b) => a.seq - b.seq)
              : mapMenuItems.toSorted((a, b) => a.name.localeCompare(b.name));

          return {
            ...item,
            items: sortedMapMenuItems,
          };
        }),
      };
      return ret;
    } catch (error) {
      Logger.error(`MenuService: getMenus --> Error: ${error}`);
      throw error;
    }
  }
}

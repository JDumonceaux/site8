import { readFile, writeFile } from "fs/promises";

import { Logger } from "../utils/Logger.js";
import { getFilePath } from "../utils/getFilePath.js";
import { Page } from "../types/Page.js";
import { Pages } from "../types/Pages.js";
import { getNextId } from "../utils/objectUtil.js";

export class PagesService {
  private fileName = "pagesIndex.json";
  private filePath = "";

  constructor() {
    this.filePath = getFilePath(this.fileName);
  }

  private getTrimmedPage(obj: Page) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null && v !== "")
    );
  }

  // Get all data
  public async getItems(): Promise<Pages | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: "utf8" });
      return JSON.parse(results) as Pages;
    } catch (error) {
      Logger.error(`PagesService: getItems -> ${error}`);
      return undefined;
    }
  }

  // Get the summary for a page
  public async getMetaData(id: string): Promise<Page | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: "utf8" });

      const jsonData = JSON.parse(results) as Pages;
      const tempId = parseInt(id, 10);
      let ret: Page | undefined = undefined;
      if (isNaN(tempId) && tempId > 0) {
        ret = jsonData.items.find((x) => x.id === tempId);
      } else {
        ret = jsonData.items.find((x) => x.url === id);
      }
      return ret;
    } catch (error) {
      Logger.error(`PagesService: getMetaData -> ${error}`);
      return undefined;
    }
  }

  // Get the next available id
  public async getNextId(): Promise<number | undefined> {
    Logger.info(`getNextId -> `);
    try {
      const item = await this.getItems();
      return getNextId<Page>(data?.items);
    } catch (error) {
      Logger.error(`PagesService: getLastId -> Error: ${error}`);
      return undefined;
    }
  }

  private async writeNewFile(data: Pages): Promise<boolean> {
    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), {
        encoding: "utf8",
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesService: writeFile -> ${error}`);
      return Promise.resolve(false);
    }
  }

  // Add an item
  public async addItem(data: Page, file: boolean): Promise<boolean> {
    try {
      // Get the current file contents
      const results = await readFile(this.filePath, { encoding: "utf8" });
      const jsonData = JSON.parse(results) as Pages;
      const newEntry = data as Omit<Page, "id" | "text">;

      const updatedFile: Pages = {
        metadata: jsonData.metadata,
        menus: jsonData.menus,
        items: [...jsonData.items, { ...newEntry, id: data.id, file: file }],
      };

      await this.writeNewFile(updatedFile);
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesService: addItem -> ${error}`);
      return Promise.resolve(false);
    }
  }

  // Update an item
  public async updateItem(data: Page, file: boolean): Promise<boolean> {
    try {
      // Get the current file contents
      const results = await readFile(this.filePath, { encoding: "utf8" });
      const jsonData = JSON.parse(results) as Pages;
      // Remove the current item from the data
      const ret = jsonData.items.filter((x) => x.id !== data.id);

      const newEntry = data as Omit<Page, "text">;

      const updatedFile: Pages = {
        metadata: jsonData.metadata,
        menus: jsonData.menus,
        items: [...jsonData.items, { ...newEntry, file: file }],
      };

      await this.writeNewFile(updatedFile);
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesService: updateItem -> ${error}`);
      return Promise.resolve(false);
    }
  }

  // Delete an item
  public async deleteItem(id: number): Promise<boolean> {
    try {
      const results = await readFile(this.filePath, { encoding: "utf8" });
      const jsonData = JSON.parse(results) as Pages;
      const ret = jsonData.items.filter((x) => x.id !== id);

      const updatedFile: Pages = {
        metadata: jsonData.metadata,
        menus: jsonData.menus,
        items: { ...ret },
      };
      await this.writeNewFile(updatedFile);
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesService: deleteItem -> ${error}`);
      return Promise.resolve(false);
    }
  }
}

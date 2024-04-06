import { readFile, writeFile } from "fs/promises";
import { Logger } from "../utils/Logger.js";
import { getFilePath } from "../utils/getFilePath.js";
export class PagesService {
  fileName = "pagesIndex.json";
  filePath = "";
  constructor() {
    this.filePath = getFilePath(this.fileName);
  }
  // Get all data
  async getItems() {
    try {
      const results = await readFile(this.filePath, { encoding: "utf8" });
      return JSON.parse(results);
    } catch (error) {
      Logger.error(`PagesService: getItems -> ${error}`);
      return undefined;
    }
  }
  // Get the summary for a page
  async getMetaData(id) {
    try {
      const results = await readFile(this.filePath, { encoding: "utf8" });
      const jsonData = JSON.parse(results);
      return jsonData.items.find((x) => x.id === id);
    } catch (error) {
      Logger.error(`PagesService: getMetaData -> ${error}`);
      return undefined;
    }
  }
  // Get the last id. We'll increase this by one to add the next record
  async getLastId() {
    Logger.info(`getLastId -> `);
    try {
      const results = await readFile(this.filePath, { encoding: "utf8" });
      const data = JSON.parse(results);
      // Check to make sure items isn't undefined
      if (data.items) {
        // Check to make sure it is iterable
        const itr = typeof data.items[Symbol.iterator] === "function";
        if (!itr) {
          Logger.error(
            `PagesService: getLastId -> Error: items is not iterable`
          );
          return undefined;
        }
        const maxItem = data.items.reduce((a, b) => (+a.id > +b.id ? a : b));
        return maxItem ? maxItem.id : undefined;
      } else {
        Logger.error(
          `PagesService: getLastId -> Error: items missing from file`
        );
        return undefined;
      }
    } catch (error) {
      Logger.error(`PagesService: getLastId -> Error: ${error}`);
      return undefined;
    }
  }
  // Add an item
  async addItem(data) {
    try {
      const results = await readFile(this.filePath, { encoding: "utf8" });
      const jsonData = JSON.parse(results);
      const ret = {
        ...jsonData,
        items: [...jsonData.items, { ...data, id: data.id }],
      };
      const retSorted = {
        ...ret,
        items: ret.items.toSorted((a, b) => a.id - b.id),
      };
      // JSON - null = replacer.  2 = tab space
      await writeFile(this.filePath, JSON.stringify(retSorted, null, 2), {
        encoding: "utf8",
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesService: addItem -> ${error}`);
      return Promise.resolve(false);
    }
  }
  // Update an item
  async updateItem(data) {
    try {
      const results = await readFile(this.filePath, { encoding: "utf8" });
      const jsonData = JSON.parse(results);
      const ret = jsonData.items.filter((x) => x.id !== data.id);
      await writeFile(
        this.filePath,
        // JSON - null = replacer.  2 = tab space
        JSON.stringify({ ...ret, data }, null, 2),
        {
          encoding: "utf8",
        }
      );
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesService: updateItem -> ${error}`);
      return Promise.resolve(false);
    }
  }
  // Delete an item
  async deleteItem(id) {
    try {
      const results = await readFile(this.filePath, { encoding: "utf8" });
      const jsonData = JSON.parse(results);
      const ret = jsonData.items.filter((x) => x.id !== id);
      // JSON - null = replacer.  2 = tab space
      await writeFile(this.filePath, JSON.stringify(ret, null, 2), {
        encoding: "utf8",
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`PagesService: deleteItem -> ${error}`);
      return Promise.resolve(false);
    }
  }
}

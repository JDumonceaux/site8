import { readFile, writeFile } from 'fs/promises';
import { IPage } from '../models/IPage.js';
import { IPages } from '../models/IPages.js';
import { Logger } from '../utils/Logger.js';
import { getFilePath } from 'utils/getFilePath.js';

export class PagesService {
  fileName = 'pages.json';
  filePath = '';

  constructor() {
    this.filePath = getFilePath(this.fileName);
  }

  // Get the summary for a page
  public async getMetaData(id: number) {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      const jsonData = JSON.parse(results) as IPages;
      const item = jsonData.items.find((x) => x.id === id);
      return { ...jsonData.metadata, item: item };
    } catch (error) {
      Logger.debug(`getMetaData -> ${error}`);
      return undefined;
    }
  }

  // Get the last id
  public async getLastId(): Promise<number | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      const jsonData = JSON.parse(results) as IPages;

      const maxItem = jsonData.items.reduce((a, b) => (+a.id > +b.id ? a : b));
      return maxItem ? maxItem.id : undefined;
    } catch (error) {
      Logger.debug(`getLastId -> ${error}`);
      return undefined;
    }
  }

  // Add an item
  public async addItem(id: number, data: IPage) {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      const jsonData = JSON.parse(results) as IPages;
      const ret = {
        ...jsonData,
        items: [...jsonData.items, { ...data, id: id }],
      };

      const retSorted = ret.items.sort((a, b) => a.id - b.id);

      await writeFile(this.filePath, JSON.stringify(retSorted, null, 2), {
        encoding: 'utf8',
      });
      return null;
    } catch (error) {
      Logger.debug(`addItem -> ${error}`);
      return null;
    }
  }

  // Update an item
  public async updateItem(data: IPage) {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      const jsonData = JSON.parse(results) as IPages;
      const ret = jsonData.items.filter((x) => x.id !== data.id);
      await writeFile(
        this.filePath,
        JSON.stringify({ ...ret, data }, null, 2),
        {
          encoding: 'utf8',
        },
      );
      return null;
    } catch (error) {
      Logger.debug(`updateItem -> ${error}`);
      return null;
    }
  }

  // Delete an item
  public async deleteItem(id: number) {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      const jsonData = JSON.parse(results) as IPages;
      const ret = jsonData.items.filter((x) => x.id !== id);
      await writeFile(this.filePath, JSON.stringify(ret, null, 2), {
        encoding: 'utf8',
      });
      return null;
    } catch (error) {
      Logger.debug(`deleteItem -> ${error}`);
      return null;
    }
  }
}

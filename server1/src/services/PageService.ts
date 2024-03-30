import { readFile, writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { getFilePath } from '../utils/getFilePath.js';
import { Logger } from '../utils/Logger.js';
import { Page } from '../types/Page.js';
import { Pages } from 'types/Pages.js';

export class PageService {
  private fileName = 'pages.json';
  private filePath = '';

  constructor() {
    this.filePath = getFilePath(this.fileName);
  }

  public async getItem(id: number): Promise<string> {
    Logger.info(`PageService: getItem -> `);
    try {
      const filePath = getFilePath(`page${id.toString()}-en.txt`);
      return await readFile(filePath, 'utf8');
    } catch (error) {
      Logger.error(`PageService: getItem --> Error: ${error}`);
      throw new Error(`getItem -> Failed to read file: ${error}`);
    }
  }

  // Get the summary for a page
  public async getMetaData(id: string): Promise<Page | undefined> {
    Logger.info(`PagesService: getMetaData -> `);

    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });

      const jsonData = JSON.parse(results) as Pages;
      const tempId = parseInt(id, 10);
      let ret: Page | undefined = undefined;
      Logger.info(`PagesService: getMetaData -> ${tempId}`);
      if (Number.isInteger(tempId) && tempId > 0) {
        Logger.info(`PagesService: getMetaData -> x.id`);
        ret = jsonData.items.find((x) => x.id === tempId);
      } else {
        Logger.info(`PagesService: getMetaData -> x.url`);
        ret = jsonData.items.find((x) => x.url === id);
      }
      return ret;
    } catch (error) {
      Logger.error(`PagesService: getMetaData -> ${error}`);
      return undefined;
    }
  }

  public async getAllData(id: string): Promise<Page | undefined> {
    Logger.info(`pageRouter: getAllData ->`);

    try {
      const pageSummary = await this.getMetaData(id);
      if (!pageSummary) {
        Logger.error(`pageRouter: getAllData -> Page not found: ${id}`);
        return undefined;
      }

      Logger.info(`pageRouter: getFile -> ${pageSummary.file}`);
      if (pageSummary?.file) {
        Logger.info(`pageRouter: getFile -> ${pageSummary.file}`);
        const text = await this.getItem(pageSummary.id);
        if (pageSummary) {
          return { ...pageSummary, text };
        }
      } else {
        return { ...pageSummary };
      }
    } catch (error) {
      Logger.error(`pageRouter: getAllData -> Error: ${error}`);
      throw new Error('Failed to get all data');
    }
    return undefined;
  }

  public async addItem(data: Page): Promise<void> {
    Logger.info(`PageService: addItem -> `);
    if (data.text === undefined || data.text.trim().length === 0) {
      return Promise.reject(new Error('addItem -> Text is required'));
    }
    try {
      const filePath = getFilePath(`page${data.id.toString()}-en.txt`);
      Logger.info(`PageService: writeFile -> ${filePath}`);
      return await writeFile(filePath, data.text, 'utf8');
    } catch (error) {
      Logger.error(`PageService: addItem --> Error: ${error}`);
      throw new Error(`addItem -> Failed to read file: ${error}`);
    }
  }

  public async updateItem(data: Page): Promise<void> {
    Logger.info(`PageService: updateItem -> `);
    const fileName = `page${data.id.toString()}-en.txt`;
    const filePath = getFilePath(fileName);
    if (data.text === undefined || data.text.trim().length === 0) {
      return Promise.reject(new Error('updateItem -> Text is required'));
    }
    if (data.long_title === undefined || data.long_title.trim().length === 0) {
      return Promise.reject(new Error('updateItem -> Long Title is required'));
    }
    try {
      return await writeFile(filePath, data?.text || '', {
        encoding: 'utf8',
        flag: 'w',
      });
    } catch (error) {
      Logger.error(`PageService: updateItem --> Error: ${error}`);
      throw new Error(`updateItem -> Failed to update file: ${error}`);
    }
  }

  public async deleteItem(id: number): Promise<void> {
    Logger.info(`PageService: deleteItem -> `);
    const fileName = `page${id.toString()}-en.txt`;
    const filePath = getFilePath(fileName);
    try {
      if (existsSync(filePath)) {
        return await unlink(filePath);
      } else {
        throw new Error(`deleteItem -> File does not exist: ${fileName}`);
      }
    } catch (error) {
      Logger.error(`PageService: deleteItem --> Error: ${error}`);
      Logger.error(`Failed to delete file: ${error}`);
      throw error;
    }
  }
}

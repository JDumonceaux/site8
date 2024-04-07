import { readFile, writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { getFilePath } from '../utils/getFilePath.js';
import { Logger } from '../utils/Logger.js';
import { Page } from '../types/Page.js';
import { Pages } from '../types/Pages.js';

export class PageService {
  private fileName = 'pagesIndex.json';
  private filePath = '';

  constructor() {
    this.filePath = getFilePath(this.fileName);
  }

  private getFileName(id: number): string {
    return getFilePath(`page${id.toString()}-en.txt`);
  }

  public async getItem(id: number): Promise<string> {
    Logger.info(`PageService: getItem id: -> ${id}`);
    const filePath = this.getFileName(id);
    Logger.info(`PageService: getItem filePath: -> ${filePath}`);
    return readFile(filePath, 'utf8');
  }

  private async saveItem(id: number, text: string) {
    Logger.info(`PageService: saveItem -> `);
    // https://nodejs.org/api/fs.html#file-system-flags
    // 'w': Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
    return writeFile(this.getFileName(id), text || '', {
      encoding: 'utf8',
      flag: 'w',
    });
  }

  // Get the summary for a page
  public async getMetaData(id: string): Promise<Page | undefined> {
    Logger.info(`PageService: getMetaData -> `);

    const results = await readFile(this.filePath, { encoding: 'utf8' });
    const jsonData = JSON.parse(results) as Pages;
    const tempId = parseInt(id, 10);
    let ret: Page | undefined = undefined;
    if (Number.isInteger(tempId) && tempId > 0) {
      ret = jsonData.items.find((x) => x.id === tempId);
    } else {
      ret = jsonData.items.find((x) => x.url === id);
    }
    return ret;
  }

  // Get all data for a page
  public async getAllData(id: string): Promise<Page | undefined> {
    Logger.info(`PageService getAllData ->`);

    const pageSummary = await this.getMetaData(id);
    if (!pageSummary) {
      return Promise.reject(
        new Error('PageService getAllData -> Page not found: ${id}'),
      );
    }

    Logger.info(`PageService: getFile -> ${pageSummary.file}`);
    if (pageSummary?.file) {
      Logger.info(`PageService: getFile -> ${pageSummary.file}`);
      const text = await this.getItem(pageSummary.id);
      if (pageSummary) {
        return { ...pageSummary, text };
      }
    } else {
      return { ...pageSummary };
    }
  }

  public async addItem(id: number, text: string | undefined): Promise<void> {
    Logger.info(`PageService: addItem -> `);
    if (text === undefined) {
      return Promise.reject(new Error('addItem -> Text is required'));
    }
    return this.saveItem(id, text);
  }

  public async updateItem(id: number, text: string | undefined): Promise<void> {
    Logger.info(`PageService: updateItem -> `);
    return this.saveItem(id, text || '');
  }

  public async deleteItem(id: number): Promise<void> {
    Logger.info(`PageService: deleteItem -> `);
    const filePath = this.getFileName(id);

    if (id === undefined || id === 0) {
      return Promise.reject(new Error('deleteItem -> ID is required'));
    }
    try {
      if (existsSync(filePath)) {
        return await unlink(filePath);
      } else {
        throw new Error(`deleteItem -> File does not exist: ${filePath}`);
      }
    } catch (error) {
      Logger.error(`PageService: deleteItem --> Error: ${error}`);
      Logger.error(`Failed to delete file: ${error}`);
      throw error;
    }
  }
}

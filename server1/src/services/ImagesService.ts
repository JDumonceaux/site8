import { readFile, writeFile } from 'fs/promises';
import { Image } from '../types/Image.js';
import { Images } from '../types/Images.js';
import { Logger } from '../utils/Logger.js';
import { getFilePath } from '../utils/getFilePath.js';
import { cleanUpData, getNextId } from '../utils/objectUtil.js';
import { ImagesFileService } from './ImagesFileService.js';

export class ImagesService {
  private fileName = 'images.json';
  private filePath = '';

  constructor() {
    this.filePath = getFilePath(this.fileName);
  }

  // Get all data
  public async readFile(): Promise<Images | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as Images;
    } catch (error) {
      Logger.error(`ImagesService: readFile -> ${error}`);
    }
    return undefined;
  }

  // Write to file
  private async writeFile(data: Readonly<Images>): Promise<boolean> {
    Logger.info(`ImagesService: writeFile -> `);

    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`ImagesService: writeFile. Error -> ${error}`);
      return Promise.reject(new Error(`Write file failed. Error: ${error}`));
    }
  }

  // Update  file
  private async updateFile(data: ReadonlyArray<Images>): Promise<boolean> {
    Logger.info(`ImagesService: updateFile -> `);

    try {
      const file = await readFile(this.filePath, { encoding: 'utf8' });
      const prev = JSON.parse(file) as Images;
      const updated = JSON.stringify({ ...prev, items: data }, null, 2);
      await writeFile(this.filePath, updated, {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`ImagesService: updateFile. Error -> ${error}`);
      return Promise.reject(new Error(`Write file failed. Error: ${error}`));
    }
  }

  // Get all data
  public async getItems(): Promise<Images | undefined> {
    return this.readFile();
  }

  public async loadNewItems(path = 'sort'): Promise<Images | undefined> {
    try {
      // Get new images from 'sort' directory
      const images = await new ImagesFileService().getItemsFromDirectory(path);
      // Get current items
      const prev = await this.readFile();
      if (!prev) {
        throw new Error('loadNewItems > Index file not loaded');
      }

      // Make sure item isn't already in the list
      const filteredItems = images?.items?.filter(
        (x) => !prev.items?.find((y) => y.fileName === x.fileName),
      );

      // Add new items to existing
      const newItems = prev?.items?.concat(filteredItems ?? []);

      // Update the item id
      const updatedItems: Image[] = [];
      newItems?.forEach((item) => {
        if (!item.id || item.id === 0) {
          const id = getNextId<Image>(newItems) || 0;
          const newItem = cleanUpData<Image>({ ...item, id });
          updatedItems.push(newItem);
        } else {
          updatedItems.push(item);
        }
      });
      const data = { ...prev, items: updatedItems };
      await this.writeFile(data);
      return data;
    } catch (error) {
      Logger.error(`ImagesService: loadNewItems -> ${error}`);
    }
    return undefined;
  }

  protected async getNextId(): Promise<number | undefined> {
    try {
      const data = await this.readFile();
      return getNextId<Image>(data?.items);
    } catch (error) {
      Logger.error(`ImagesService: getItems -> ${error}`);
      return undefined;
    }
  }

  public async fixNames(): Promise<boolean> {
    try {
      const item = await this.readFile();

      const fixedItems = item?.items?.map((x) => ({
        ...x,
        src: x.src ? x.src.toLowerCase() : x.src,
        fileName: x.fileName ? x.fileName.toLowerCase() : x.fileName,
      }));

      const data: Images = {
        metadata: item?.metadata ?? { title: 'Images' },
        items: fixedItems,
      };

      await this.writeFile(data);
      return true;
    } catch (error) {
      Logger.error(`ImagesService: fixNames -> ${error}`);
      return false;
    }
  }

  public async listDuplicates(): Promise<string[] | string | undefined> {
    try {
      const item = await this.readFile();

      const duplicates = item?.items
        ?.map((x) => x.fileName)
        .filter((x, i, a) => a.indexOf(x) !== i);

      // Filter out null
      const filtered = duplicates?.filter((x) => x);

      return filtered && filtered.length > 0 ? filtered : 'No duplicates found';
    } catch (error) {
      Logger.error(`ImagesService: listDuplicates -> ${error}`);
      return 'No duplicates found';
    }
  }
}

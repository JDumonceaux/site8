import { readFile, writeFile } from 'fs/promises';
import { Logger } from '../utils/Logger.js';
import { getFilePath } from '../utils/getFilePath.js';
import { Images } from '../types/Images.js';
import { Image } from 'types/Image.js';

export class ImagesService {
  private fileName = 'images.json';
  private filePath = '';

  constructor() {
    this.filePath = getFilePath(this.fileName);
  }

  // Get all data
  public async getItems(): Promise<Images | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as Images;
    } catch (error) {
      Logger.error(`ImagesService: getItems -> ${error}`);
      return undefined;
    }
  }

  protected async writeNewFile(data: Images): Promise<boolean> {
    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`ImagesService: writeFile -> ${error}`);
      return Promise.resolve(false);
    }
  }

  protected async getNextId(): Promise<number | undefined> {
    try {
      const data = await this.getItems();

      return this.findFreeId(data?.items);
    } catch (error) {
      Logger.error(`ImagesService: getItems -> ${error}`);
      return undefined;
    }
  }

  // Get Next available Id
  private findFreeId(
    items: ReadonlyArray<Image> | undefined,
  ): number | undefined {
    try {
      // Check to make sure pages isn't undefined
      if (items) {
        const sortedArray = items.toSorted((a, b) => a.id - b.id);

        // Start with the first id in the sorted array
        let nextId = sortedArray[0].id;
        // Iterate through the array to find the missing id
        for (const element of sortedArray) {
          // Check if the current object's id is not equal to the nextId
          if (element.id !== nextId) {
            return nextId; // Found the gap
          }
          nextId++; // Move to the next expected id
        }

        // If no gaps were found, the next free id is one greater than the last object's id
        return nextId;
      } else {
        Logger.error(
          `ImagesService: findFreeId -> Error: Items missing from file`,
        );
        return undefined;
      }
    } catch (error) {
      Logger.error(`ImagesService: findFreeId -> Error: ${error}`);
      return undefined;
    }
  }

  public async fixNames(): Promise<boolean> {
    try {
      const item = await this.getItems();

      const fixedItems = item?.items?.map((x) => ({
        ...x,
        src: x.src ? x.src.toLowerCase() : x.src,
        fileName: x.fileName ? x.fileName.toLowerCase() : x.fileName,
      }));

      const data: Images = {
        metadata: item?.metadata ?? { title: 'Images' },
        items: fixedItems,
      };

      await this.writeNewFile(data);
      return true;
    } catch (error) {
      Logger.error(`ImagesService: fixNames -> ${error}`);
      return false;
    }
  }

  public async listDuplicates(): Promise<string[] | string | undefined> {
    try {
      const item = await this.getItems();

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

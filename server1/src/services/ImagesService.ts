import { readFile, writeFile } from 'fs/promises';
import { ImageEdit } from 'types/ImageEdit.js';
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
  public async writeFile(data: Readonly<Images>): Promise<boolean> {
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

  // Get all data
  public async getItems(): Promise<Images | undefined> {
    return this.readFile();
  }

  public async loadNewItems(): Promise<Images | undefined> {
    try {
      // Get new images from 'sort' directory
      const images = await new ImagesFileService().getItemsFromSortDirectory();
      // Get current items
      const prev = await this.readFile();
      if (!prev) {
        throw new Error('loadNewItems > Index file not loaded');
      }

      const items = prev.items;
      // Make sure item isn't already in the list
      const newItems = images?.items?.filter(
        (x) => !items?.find((y) => y.fileName === x.fileName),
      );
      // Get duplicate items
      const duplicateImages = images?.items?.filter((x) =>
        items?.find((y) => y.fileName === x.fileName),
      );
      // Get the next id - assume there are no gaps in the id sequence
      // that we want to fill in.  If there are gaps, we can fill
      // these in when we add a single image.
      const nextId =
        items?.sort((a, b) => a.id - b.id)[items?.length - 1].id ?? 0;

      // One time clean up of the data
      // const cleanedItems: Image[] | undefined = prev.items?.map((item) => {
      //   return cleanUpData<Image>({
      //     ...item,
      //     edit_date: new Date(),
      //     create_date: new Date(),
      //   });
      // });

      // Update the data
      let id = nextId;
      const updatedItems: Image[] | undefined = newItems?.map((item) => {
        return cleanUpData<Image>({
          ...item,
          id: id++,
          edit_date: new Date(),
          create_date: new Date(),
          src:
            item.folder && item.folder.length > 0
              ? `${item.folder}/${item.fileName}`
              : item.fileName,
        });
      });

      // Add new items to existing
      const combinedItems = updatedItems ? items?.concat(updatedItems) : items;

      const sortedData = combinedItems?.sort((a, b) => a.id - b.id);
      // Write back file
      const data = { ...prev, items: sortedData };
      await this.writeFile(data);
      // Return items + duplicates
      return { ...data, duplicateImages };
    } catch (error) {
      Logger.error(`ImagesService: loadNewItems -> ${error}`);
    }
    return undefined;
  }

  public async getNextId(): Promise<number | undefined> {
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

  public async updateItems(items: ImageEdit[] | undefined): Promise<boolean> {
    try {
      if (!items) {
        return false;
      }
      const images = await this.readFile();
      if (!images || !images.items) {
        return false;
      }

      // Get the updated records
      const updatedItems: Image[] = images.items.map((item) => {
        const currItem = items.find((x) => x.id === item.id);
        return currItem
          ? {
              ...currItem,
              ...item,
              originalFolder: currItem.folder,
              src: currItem.folder
                ? `${currItem.folder}/${currItem.fileName}`
                : currItem.fileName,
            }
          : item;
      });

      // Move the files to a new directory
      await new ImagesFileService().moveItems(updatedItems);

      // Remove multiple items
      const data: Image[] = images.items.map((x) => {
        const newItem = updatedItems.find((y) => y.id === x.id);
        return newItem ? newItem : x;
      });
      console.log('data', data);
      //await this.writeFile({ ...images, items: data });
      return true;
    } catch (error) {
      Logger.error(`ImagesService: updateItem -> ${error}`);
    }
    return false;
  }
}

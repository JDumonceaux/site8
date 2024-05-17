import { readdir } from 'fs/promises';
import { Logger } from '../utils/Logger.js';

import { Images } from 'types/Images.js';
import { Image } from 'types/Image.js';

export class ImagesFileService {
  private filePath =
    'C:\\Users\\jdumo\\Documents\\0Projects\\site8\\client\\public\\images';

  // Get all data
  public async getItems(): Promise<Images | undefined> {
    try {
      console.log('xxx');
      const items = await readdir(this.filePath, { recursive: true });
      console.log('items', items.length);
      const ret: Image[] = items.map((file, index) => {
        return {
          id: index,
          name: file,
          src: `/images/${file}`,
        };
      }) as Image[];

      const results: Images = {
        metadata: { title: 'Images' },
        items: ret,
      };

      return results;
    } catch (error) {
      Logger.error(`ImagesService: getItems -> ${error}`);
      return undefined;
    }
  }
}

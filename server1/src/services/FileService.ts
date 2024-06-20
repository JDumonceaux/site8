import { readFile } from 'fs/promises';
import { Logger } from '../utils/Logger.js';
import { getFilePath } from '../utils/getFilePath.js';

export class FileService {
  // private ROOT = '/data';

  public async getFile(fileName: string): Promise<string | undefined> {
    Logger.info(`FileService: getFile -> ${fileName}`);

    try {
      const filePath = getFilePath(fileName);
      // GOOD: Verify that the file path is under the root directory
      // const tempFilePath = fs.realpathSync(path.resolve(this.ROOT, filePath));
      // if (!tempFilePath.startsWith(this.ROOT)) {
      //   return undefined;
      // }

      return readFile(filePath, { encoding: 'utf8' });
    } catch (error) {
      Logger.error(`FileService: getFile: ${fileName} --> Error: ${error}`);
      return undefined;
    }
  }
}

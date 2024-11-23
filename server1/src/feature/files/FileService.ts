import fs from 'fs';
import { readFile } from 'fs/promises';
import { getDataDir } from '../../lib/utils/FilePath.js';
import { Logger } from '../../lib/utils/logger.js';

export class FileService {
  public async getFile(fileName: string): Promise<string | undefined> {
    Logger.info(`FileService: getFile -> ${fileName}`);

    try {
      const filePath = getDataDir(fileName);

      // GOOD: Verify that the file path is under the root directory
      const tempFilePath = fs.realpathSync(filePath);
      if (!tempFilePath.startsWith(__dirname)) {
        Logger.error(
          `FileService: getFile: ${fileName} --> Invalid file path: ${filePath}`,
        );
        return undefined;
      }

      return readFile(filePath, { encoding: 'utf8' });
    } catch (error) {
      Logger.error(`FileService: getFile: ${fileName} --> Error: ${error}`);
      return undefined;
    }
  }
}

import { existsSync, mkdirSync, realpathSync, writeFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { Logger } from '../../utils/logger.js';

import FilePath from './FilePath.js';

export class FileService {
  public createFolder(folderPath: string): boolean {
    Logger.info(`FileService: createFolder -> ${folderPath}`);
    try {
      // Validate path is within allowed directory
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Literal empty string
      const allowedDir = realpathSync(FilePath.getDataDir(''));

      // Try to resolve path, fallback to original if it doesn't exist yet
      let pathToCheck: string;
      try {
        // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Need to validate path
        pathToCheck = realpathSync(folderPath);
      } catch {
        // Path doesn't exist yet, use original
        pathToCheck = folderPath;
      }

      if (!pathToCheck.startsWith(allowedDir)) {
        throw new Error('Access denied: Invalid folder path');
      }

      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Path validated above
      if (existsSync(pathToCheck)) {
        return true;
      }
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Path validated above
      mkdirSync(pathToCheck, { recursive: true });
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `FileService: createFolder: ${folderPath} --> Error: ${errorMessage}`,
      );
      throw new Error(`Create folder failed. Error: ${errorMessage}`);
    }
  }

  public async getDataFile(fileName: string): Promise<string | undefined> {
    Logger.info(`FileService: getDataFile -> ${fileName}`);
    try {
      // Strip any directory components to prevent path traversal
      const safeFileName = path.basename(fileName);
      const dataDir = FilePath.getDataDir('');
      const filePath = path.join(dataDir, safeFileName);

      // Verify resolved path is within allowed directory
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Path validated above
      const resolvedPath = realpathSync(filePath);
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Literal empty string
      const allowedDir = realpathSync(dataDir);

      if (!resolvedPath.startsWith(allowedDir)) {
        Logger.error(
          `FileService: getDataFile: ${fileName} --> Invalid file path: ${filePath}`,
        );
        return undefined;
      }

      // eslint-disable-next-line security/detect-non-literal-fs-filename -- Path validated above
      return await readFile(resolvedPath, { encoding: 'utf8' });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `FileService: getDataFile: ${fileName} --> Error: ${errorMessage}`,
      );
      return undefined;
    }
  }

  public async getFile(filePath: string): Promise<string | undefined> {
    Logger.info(`FileService: getFile -> ${filePath}`);
    try {
      // Prevent path traversal attacks
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Need to validate path
      const resolvedPath = realpathSync(filePath);
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Literal empty string
      const allowedDir = realpathSync(FilePath.getDataDir(''));

      if (!resolvedPath.startsWith(allowedDir)) {
        Logger.error(
          `FileService: getFile: ${filePath} --> Invalid file path attempt: ${resolvedPath}`,
        );
        throw new Error('Access denied: Invalid file path');
      }

      // eslint-disable-next-line security/detect-non-literal-fs-filename -- Path validated above
      return await readFile(resolvedPath, { encoding: 'utf8' });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(
        `FileService: getFile: ${filePath} --> Error: ${errorMessage}`,
      );
      return undefined;
    }
  }

  public async readFile<T>(filePath: string): Promise<T> {
    try {
      // Validate path is within allowed directory
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Need to validate path
      const resolvedPath = realpathSync(filePath);
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Literal empty string
      const allowedDir = realpathSync(FilePath.getDataDir(''));

      if (!resolvedPath.startsWith(allowedDir)) {
        throw new Error('Access denied: Invalid file path');
      }

      // eslint-disable-next-line security/detect-non-literal-fs-filename -- Path validated above
      const data = await readFile(resolvedPath, { encoding: 'utf8' });
      return JSON.parse(data) as T;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`FileService: readFile -> ${errorMessage}`);
      throw new Error(`Read file failed. Error: ${errorMessage}`);
    }
  }

  public async writeFile(data: unknown, filePath: string): Promise<boolean> {
    try {
      Logger.info(`FileService: writeFile -> ${filePath}`);

      // Validate path is within allowed directory
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Need to validate path
      const resolvedPath = realpathSync(filePath);
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Literal empty string
      const allowedDir = realpathSync(FilePath.getDataDir(''));

      if (!resolvedPath.startsWith(allowedDir)) {
        throw new Error('Access denied: Invalid file path');
      }

      // eslint-disable-next-line security/detect-non-literal-fs-filename -- Path validated above
      await writeFile(resolvedPath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`FileService: writeFile -> Error: ${errorMessage}`);
      throw new Error(`Write file failed. Error: ${errorMessage}`);
    }
  }

  public writeFileSync(data: unknown, filePath: string): boolean {
    try {
      Logger.info(`FileService: writeFileSync -> ${filePath}`);

      // Validate path is within allowed directory
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Need to validate path
      const resolvedPath = realpathSync(filePath);
      // eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync -- Literal empty string
      const allowedDir = realpathSync(FilePath.getDataDir(''));

      if (!resolvedPath.startsWith(allowedDir)) {
        throw new Error('Access denied: Invalid file path');
      }

      // eslint-disable-next-line security/detect-non-literal-fs-filename
      writeFileSync(resolvedPath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
        flag: 'w',
      });
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Logger.error(`FileService: writeFileSync -> Error: ${errorMessage}`);
      throw new Error(`Write file failed. Error: ${errorMessage}`);
    }
  }
}

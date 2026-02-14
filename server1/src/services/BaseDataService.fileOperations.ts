import type { CacheManager } from './CacheManager.js';
import type { DataValidator } from './DataValidator.js';
import type { ErrorHandler } from './ErrorHandler.js';

export type BaseDataFileDeps<T> = {
  cacheManager: CacheManager<T>;
  errorHandler: ErrorHandler;
  filePath: string;
  fileService: {
    readFile<TData>(filePath: string): Promise<TData>;
    writeFile<TData>(data: TData, filePath: string): Promise<boolean | void>;
  };
  validator: DataValidator<T>;
};

export const readValidatedDataFile = async <T>(
  deps: BaseDataFileDeps<T>,
): Promise<T> => {
  try {
    const cachedData = deps.cacheManager.get();
    if (cachedData) {
      return cachedData;
    }

    deps.errorHandler.info(`Reading file from ${deps.filePath}`);
    const rawData = await deps.fileService.readFile<unknown>(deps.filePath);

    if (!rawData) {
      throw new Error('File data is undefined or null');
    }

    const data = deps.validator.validate(rawData);
    deps.cacheManager.set(data);
    deps.errorHandler.info('Successfully loaded data');
    return data;
  } catch (error) {
    return deps.errorHandler.handle(error, `reading file at ${deps.filePath}`);
  }
};

export const writeValidatedDataFile = async <T>(
  deps: BaseDataFileDeps<T>,
  data: T,
): Promise<void> => {
  try {
    deps.validator.validate(data);
    await deps.fileService.writeFile(data, deps.filePath);
    deps.cacheManager.invalidate();
    deps.errorHandler.info(`Successfully wrote data to ${deps.filePath}`);
  } catch (error) {
    deps.errorHandler.handle(error, `writing file at ${deps.filePath}`);
  }
};

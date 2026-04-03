/**
 * Interface for data services that manage JSON data files.
 * Provides abstraction for dependency injection and testing.
 *
 * @template T - The data type this service manages
 */
export type IDataService<T> = {
  /**
   * Gets all items from the data file
   * @returns The data from the file
   */
  getItems: () => Promise<T>;

  /**
   * Gets the next available ID from items array
   * @returns Next available ID
   */
  getNextId: () => Promise<number>;

  /**
   * Writes data to the file
   * @param data - Data to write
   */
  writeData: (data: T) => Promise<void>;
};

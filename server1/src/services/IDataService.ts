/**
 * Interface for data services that manage JSON data files.
 * Provides abstraction for dependency injection and testing.
 *
 * @template T - The data type this service manages
 */
export interface IDataService<T> {
  /**
   * Gets all items from the data file
   * @returns The data from the file or undefined on error
   */
  getItems(): Promise<T | undefined>;

  /**
   * Gets the next available ID from items array
   * @returns Next available ID or undefined on error
   */
  getNextId(): Promise<number | undefined>;

  /**
   * Writes data to the file
   * @param data - Data to write
   */
  writeData(data: T): Promise<void>;
}

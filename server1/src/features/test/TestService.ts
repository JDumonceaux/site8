import type { Test, TestFile } from '../../types/TestFile.js';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import { getFileService } from '../../utils/ServiceFactory.js';

import {
  addItemToFile,
  buildUpdatedItem,
  findItemIndex,
  groupExists,
  hasGroupsAndItems,
  hasItems,
  removeItemFromFile,
  updateItemInFile,
} from './testServiceHelpers.js';

/**
 * Service for managing individual test items
 */
export class TestService extends BaseDataService<TestFile> {
  private static readonly TESTS_FILE_PATH = FilePath.getDataDir('tests.json');

  public constructor() {
    super({
      filePath: TestService.TESTS_FILE_PATH,
    });
  }

  private async loadTestFile(): Promise<TestFile> {
    const fileService = getFileService();
    return fileService.readFile<TestFile>(TestService.TESTS_FILE_PATH);
  }

  private async saveTestFile(testFile: TestFile): Promise<void> {
    const fileService = getFileService();
    await fileService.writeFile(testFile, TestService.TESTS_FILE_PATH);
    this.invalidateCache();
  }

  /**
   * Adds a new test item to the tests.json file
   *
   * @param itemData - The test item data
   * @param groupId - The group ID where the item should be placed
   * @returns Promise<number | null> - The new item ID or null if failed
   */
  public async addItem(
    itemData: Omit<Test, 'id'>,
    groupId: number,
  ): Promise<number | null> {
    try {
      Logger.info(`TestService: addItem: Adding new item to group ${groupId}`);

      const testFile = await this.loadTestFile();

      if (!hasGroupsAndItems(testFile)) {
        Logger.error('TestService: addItem: Invalid file structure');
        return null;
      }

      if (!groupExists(testFile, groupId)) {
        Logger.error(`TestService: addItem: Target group ${groupId} not found`);
        return null;
      }

      const { file, newId } = addItemToFile(testFile, itemData, groupId);
      await this.saveTestFile(file);

      Logger.info(`TestService: addItem: Successfully added item ${newId}`);
      return newId;
    } catch (error) {
      Logger.error(`TestService: addItem --> Error: ${String(error)}`);
      return null;
    }
  }

  /**
   * Deletes a test item from the tests.json file
   *
   * @param itemId - The ID of the test item to delete
   * @returns Promise<boolean> - true if successful, false otherwise
   */
  public async deleteItem(itemId: number): Promise<boolean> {
    try {
      Logger.info(`TestService: deleteItem: Deleting item ${itemId}`);

      const testFile = await this.loadTestFile();

      if (!hasItems(testFile)) {
        Logger.error('TestService: deleteItem: Invalid file structure');
        return false;
      }

      const updatedTestFile = removeItemFromFile(testFile, itemId);
      if (!updatedTestFile) {
        Logger.error(
          `TestService: deleteItem: Item ${itemId} not found in file`,
        );
        return false;
      }

      await this.saveTestFile(updatedTestFile);

      Logger.info(
        `TestService: deleteItem: Successfully deleted item ${itemId}`,
      );
      return true;
    } catch (error) {
      Logger.error(`TestService: deleteItem --> Error: ${String(error)}`);
      return false;
    }
  }

  /**
   * Gets a single test item by ID
   *
   * @param itemId - The ID of the test item to retrieve
   * @returns Promise<Test | null> - The test item or null if not found
   */
  public async getItem(itemId: number): Promise<Test | null> {
    try {
      Logger.info(`TestService: getItem: Retrieving item ${itemId}`);

      const testFile = await this.loadTestFile();

      if (!hasItems(testFile)) {
        Logger.error('TestService: getItem: Invalid file structure');
        return null;
      }

      const item = testFile.items.find((testItem) => testItem.id === itemId);

      if (!item) {
        Logger.info(`TestService: getItem: Item ${itemId} not found`);
        return null;
      }

      Logger.info(
        `TestService: getItem: Successfully retrieved item ${itemId}`,
      );
      return item;
    } catch (error) {
      Logger.error(`TestService: getItem --> Error: ${String(error)}`);
      return null;
    }
  }

  /**
   * Updates a single test item in the tests.json file
   * Handles moving items between groups if groupId changes
   *
   * @param itemId - The ID of the test item to update
   * @param updatedData - The updated test item data
   * @param newGroupId - The group ID where the item should be placed
   * @returns Promise<boolean> - true if successful, false otherwise
   */
  public async updateItem(
    itemId: number,
    updatedData: Partial<Test>,
    newGroupId: number,
  ): Promise<boolean> {
    try {
      Logger.info(`TestService: updateItem: Updating item ${itemId}`);

      const testFile = await this.loadTestFile();

      if (!hasGroupsAndItems(testFile)) {
        Logger.error('TestService: updateItem: Invalid file structure');
        return false;
      }

      const itemIndex = findItemIndex(testFile, itemId);

      if (itemIndex === -1) {
        Logger.error(
          `TestService: updateItem: Item ${itemId} not found in file`,
        );
        return false;
      }

      if (!groupExists(testFile, newGroupId)) {
        Logger.error(
          `TestService: updateItem: Target group ${newGroupId} not found`,
        );
        return false;
      }

      const existingItem = testFile.items[itemIndex];
      if (!existingItem) {
        Logger.error(
          `TestService: updateItem: Item at index ${itemIndex} is undefined`,
        );
        return false;
      }

      const hasGroupMembership = existingItem.groupId === newGroupId;
      const updatedItem = buildUpdatedItem(
        existingItem,
        updatedData,
        newGroupId,
      );

      if (!hasGroupMembership) {
        Logger.info(
          `TestService: updateItem: Moved item ${itemId} to group ${newGroupId}`,
        );
      }

      const updatedTestFile = updateItemInFile(
        testFile,
        itemIndex,
        updatedItem,
      );
      await this.saveTestFile(updatedTestFile);

      Logger.info(
        `TestService: updateItem: Successfully updated item ${itemId}`,
      );
      return true;
    } catch (error) {
      Logger.error(`TestService: updateItem --> Error: ${String(error)}`);
      return false;
    }
  }
}

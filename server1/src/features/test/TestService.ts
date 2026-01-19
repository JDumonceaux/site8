import type { TestFile } from '../../types/TestFile.js';
import type { Test } from '@site8/shared';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import { getFileService } from '../../utils/ServiceFactory.js';

type TestWithGroupIds = Test & {
  groupIds?: { id: number; seq: number }[];
};

/**
 * Service for managing individual test items
 */
export class TestService extends BaseDataService<TestFile> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('tests.json'),
    });
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

      const fileService = getFileService();
      const testFile: TestFile = await fileService.readFile<TestFile>(
        FilePath.getDataDir('tests.json'),
      );

      if (!testFile.items || !testFile.groups) {
        Logger.error('TestService: addItem: Invalid file structure');
        return null;
      }

      // Verify the target group exists
      const targetGroup = testFile.groups.find((group) => group.id === groupId);

      if (!targetGroup) {
        Logger.error(`TestService: addItem: Target group ${groupId} not found`);
        return null;
      }

      // Find the highest item ID
      let maxId = 0;
      for (const item of testFile.items) {
        if (item.id > maxId) {
          maxId = item.id;
        }
      }
      const newId = maxId + 1;

      // Create new item
      const newItem = {
        ...itemData,
        groupIds: [
          {
            id: groupId,
            seq: (itemData as TestWithGroupIds).groupIds?.[0]?.seq ?? 1,
          },
        ],
        id: newId,
      };

      // Create updated test file
      const updatedTestFile: TestFile = {
        ...testFile,
        items: [...testFile.items, newItem],
        metadata: {
          ...testFile.metadata,
          lastUpdated: new Date().toISOString().split('T')[0],
        },
      };

      // Write the updated file back
      await fileService.writeFile(
        updatedTestFile,
        FilePath.getDataDir('tests.json'),
      );

      // Invalidate cache
      this.invalidateCache();

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

      const fileService = getFileService();
      const testFile: TestFile = await fileService.readFile<TestFile>(
        FilePath.getDataDir('tests.json'),
      );

      if (!testFile.items) {
        Logger.error('TestService: deleteItem: Invalid file structure');
        return false;
      }

      // Find the item to delete
      const itemIndex = testFile.items.findIndex((item) => item.id === itemId);

      if (itemIndex === -1) {
        Logger.error(
          `TestService: deleteItem: Item ${itemId} not found in file`,
        );
        return false;
      }

      // Create updated test file with item removed
      const updatedItems = [
        ...testFile.items.slice(0, itemIndex),
        ...testFile.items.slice(itemIndex + 1),
      ];

      const updatedTestFile: TestFile = {
        ...testFile,
        items: updatedItems,
        metadata: {
          ...testFile.metadata,
          lastUpdated: new Date().toISOString().split('T')[0],
        },
      };

      // Write the updated file back
      await fileService.writeFile(
        updatedTestFile,
        FilePath.getDataDir('tests.json'),
      );

      // Invalidate cache
      this.invalidateCache();

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
   * @returns Promise<TestWithGroupIds | null> - The test item or null if not found
   */
  public async getItem(itemId: number): Promise<TestWithGroupIds | null> {
    try {
      Logger.info(`TestService: getItem: Retrieving item ${itemId}`);

      const fileService = getFileService();
      const testFile: TestFile = await fileService.readFile<TestFile>(
        FilePath.getDataDir('tests.json'),
      );

      if (!testFile.items) {
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
      return item as TestWithGroupIds;
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

      const fileService = getFileService();
      const testFile: TestFile = await fileService.readFile<TestFile>(
        FilePath.getDataDir('tests.json'),
      );

      if (!testFile.items || !testFile.groups) {
        Logger.error('TestService: updateItem: Invalid file structure');
        return false;
      }

      // Find the item to update
      const itemIndex = testFile.items.findIndex((item) => item.id === itemId);

      if (itemIndex === -1) {
        Logger.error(
          `TestService: updateItem: Item ${itemId} not found in file`,
        );
        return false;
      }

      // Verify the target group exists
      const targetGroup = testFile.groups.find(
        (group) => group.id === newGroupId,
      );

      if (!targetGroup) {
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

      // Create updated item
      const updatedItem = {
        ...existingItem,
        comments: updatedData.comments ?? existingItem.comments,
        name: updatedData.name ?? existingItem.name,
        tags: updatedData.tags ?? existingItem.tags,
      };

      // Handle group membership changes
      const currentGroupIds = existingItem.groupIds ?? [];
      const hasGroupMembership = currentGroupIds.some(
        (ref) => ref.id === newGroupId,
      );

      if (!hasGroupMembership) {
        // Add new group membership (replace existing or add new)
        updatedItem.groupIds = [
          {
            id: newGroupId,
            seq: 1,
          },
        ];

        Logger.info(
          `TestService: updateItem: Moved item ${itemId} to group ${newGroupId}`,
        );
      } else {
        // Keep existing group memberships
        updatedItem.groupIds = currentGroupIds;
      }

      // Create mutable copy of items array with the updated item
      const updatedItems = [...testFile.items];
      updatedItems[itemIndex] = updatedItem;

      // Create updated test file
      const updatedTestFile: TestFile = {
        ...testFile,
        items: updatedItems,
        metadata: {
          ...testFile.metadata,
          lastUpdated: new Date().toISOString().split('T')[0],
        },
      };

      // Write the updated file back
      await fileService.writeFile(
        updatedTestFile,
        FilePath.getDataDir('tests.json'),
      );

      // Invalidate cache
      this.invalidateCache();

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

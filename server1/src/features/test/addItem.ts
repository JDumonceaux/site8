import type { Test } from '../../types/TestFile.js';
import type { Request, Response } from 'express';

import { badRequest, ok } from '../../lib/http/ResponseHelper.js';
import { Logger } from '../../utils/logger.js';
import { getTestService } from '../../utils/ServiceFactory.js';

type AddTestItemRequest = {
  readonly groupId: number;
  readonly item: Omit<Test, 'id'>;
};

/**
 * Handles POST requests to add a new test item
 *
 * @param req - Express request containing item data and groupId in body
 * @param res - Express response with new item ID or error object
 */
export const addItem = async (
  req: Request,
  res: Response<{ id: number } | { error: string }>,
): Promise<void> => {
  try {
    Logger.info('Test:addItem: Processing add request');

    const { groupId, item } = req.body as AddTestItemRequest;

    if (!groupId || typeof groupId !== 'number') {
      badRequest(res, 'Invalid request: groupId is required');
      return;
    }

    if (!item || typeof item !== 'object') {
      badRequest(res, 'Invalid request: item data is required');
      return;
    }

    if (!item.name || typeof item.name !== 'string') {
      badRequest(res, 'Invalid request: item name is required');
      return;
    }

    const service = getTestService();
    const newId = await service.addItem(item, groupId);

    if (newId === null) {
      badRequest(res, 'Failed to add item');
      return;
    }

    Logger.info(`Test:addItem: Successfully added item ${newId}`);
    ok(res, { id: newId }, 'Test: Add Item');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`Test:addItem: Failed to process request`, {
      error: errorMessage,
    });
    res.status(500).json({ error: errorMessage });
  }
};

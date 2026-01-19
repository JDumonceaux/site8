import type { Test } from '@site8/shared';
import type { Request, Response } from 'express';

import { badRequest, ok } from '../../lib/http/ResponseHelper.js';
import { Logger } from '../../utils/logger.js';
import { getTestService } from '../../utils/ServiceFactory.js';

type UpdateTestItemRequest = {
  readonly groupId: number;
  readonly item: Partial<Test>;
};

/**
 * Handles PUT requests to update a single test item
 * Updates test name, comments, tags, and can move the item to a different group
 *
 * @param req - Express request containing itemId in params and updated data in body
 * @param res - Express response with boolean result on success or error object
 */
export const updateItem = async (
  req: Request,
  res: Response<boolean | { error: string }>,
): Promise<void> => {
  try {
    const itemId = Number.parseInt(req.params.id as string, 10);

    if (Number.isNaN(itemId)) {
      badRequest(res, 'Invalid item ID');
      return;
    }

    Logger.info(
      `Test:updateItem: Processing update request for item ${itemId}`,
    );

    const { groupId, item } = req.body as UpdateTestItemRequest;

    if (!groupId || typeof groupId !== 'number') {
      badRequest(res, 'Invalid request: groupId is required');
      return;
    }

    if (!item || typeof item !== 'object') {
      badRequest(res, 'Invalid request: item data is required');
      return;
    }

    const service = getTestService();
    const success = await service.updateItem(itemId, item, groupId);

    if (success) {
      Logger.info(`Test:updateItem: Successfully updated item ${itemId}`);
      ok(res, true, 'Test: Update Item');
    } else {
      badRequest(res, 'Failed to update item');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`Test:updateItem: Failed to process request`, {
      error: errorMessage,
    });
    res.status(500).json({ error: errorMessage });
  }
};

import type { Request, Response } from 'express';

import { badRequest, ok } from '../../lib/http/ResponseHelper.js';
import { Logger } from '../../utils/logger.js';
import { getTestService } from '../../utils/ServiceFactory.js';

/**
 * Handles DELETE requests to remove a single test item
 *
 * @param req - Express request containing itemId in params
 * @param res - Express response with boolean result on success or error object
 */
export const deleteItem = async (
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
      `Test:deleteItem: Processing delete request for item ${itemId}`,
    );

    const service = getTestService();
    const success = await service.deleteItem(itemId);

    if (success) {
      Logger.info(`Test:deleteItem: Successfully deleted item ${itemId}`);
      ok(res, true, 'Test: Delete Item');
    } else {
      badRequest(res, 'Failed to delete item');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`Test:deleteItem: Failed to process request`, {
      error: errorMessage,
    });
    res.status(500).json({ error: errorMessage });
  }
};

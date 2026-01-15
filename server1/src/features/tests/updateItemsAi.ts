import type { Request, Response } from 'express';
import type { Tests } from '@site8/shared';

import { Logger } from '../../utils/logger.js';
import { getTestsAiService } from '../../utils/ServiceFactory.js';
import { badRequest, ok } from '../../lib/http/ResponseHelper.js';

/**
 * Handles PUT requests to update AI test items
 * Updates test names, comments, tags, and reorders items based on seq values
 * Note: IDs are immutable and cannot be changed
 *
 * @param req - Express request containing Tests object with updated sections/groups/items
 * @param res - Express response with boolean result on success or error object
 */
export const updateItemsAi = async (
  req: Request,
  res: Response<boolean | { error: string }>,
): Promise<void> => {
  try {
    Logger.info('Tests:updateItemsAi: Processing update request');

    const updatedData = req.body as Tests;

    if (!updatedData || !updatedData.sections) {
      badRequest(res, 'Invalid request: sections array is required');
      return;
    }

    const service = getTestsAiService();
    const success = await service.updateItems(updatedData);

    if (success) {
      Logger.info('Tests:updateItemsAi: Successfully updated data');
      ok(res, true, 'Tests: Update Items AI');
    } else {
      badRequest(res, 'Failed to update items');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`Tests:updateItemsAi: Failed to process request`, {
      error: errorMessage,
    });
    res.status(500).json({ error: errorMessage });
  }
};

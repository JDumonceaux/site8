import type { Request, Response } from 'express';

import { badRequest, notFound, ok } from '../../lib/http/ResponseHelper.js';
import { Logger } from '../../utils/logger.js';
import { getTestService } from '../../utils/ServiceFactory.js';

/**
 * Handles GET requests to retrieve a single test item
 *
 * @param req - Express request containing itemId in params
 * @param res - Express response with test item or error object
 */
export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemId = Number.parseInt(req.params.id as string, 10);

    if (Number.isNaN(itemId)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      badRequest(res, 'Invalid item ID');
      return;
    }

    Logger.info(`Test:getItem: Processing get request for item ${itemId}`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const service = getTestService();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const item = await service.getItem(itemId);

    if (!item) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      notFound(res, `Item ${itemId} not found`);
      return;
    }

    Logger.info(`Test:getItem: Successfully retrieved item ${itemId}`);
    ok(res, item, 'Test: Get Item');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`Test:getItem: Failed to process request`, {
      error: errorMessage,
    });
    res.status(500).json({ error: errorMessage });
  }
};

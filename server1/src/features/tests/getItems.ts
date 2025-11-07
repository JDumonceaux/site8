import { Logger } from '../../lib/utils/logger.js';
import { getTestsService } from '../../lib/utils/ServiceFactory.js';

import type { Tests } from '../../types/Tests.js';
import type { Request, Response } from 'express';

export const getItems = async (
  req: Request,
  res: Response<Tests>,
): Promise<void> => {
  try {
    Logger.info('Tests: Fetching items', { query: req.query });

    const service = getTestsService();
    const items = await service.getItems();

    if (!items) {
      Logger.warn('Tests: No items found');
      res
        .status(404)
        .json({ items: [], metadata: { title: 'No test items found' } });
      return;
    }

    Logger.info(
      `Tests: Successfully retrieved ${items.items?.length ?? 0} items`,
    );
    res.status(200).json(items);
  } catch (error) {
    Logger.error('Tests: Get Items error:', error);
    res.sendStatus(500);
  }
};

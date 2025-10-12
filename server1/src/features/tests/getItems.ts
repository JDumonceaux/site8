import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Tests } from '../../types/Tests.js';
import { getTestsService } from '../../lib/utils/ServiceFactory.js';

export const getItems = async (
  req: Request,
  res: Response<Tests>,
  next: NextFunction,
): Promise<void> => {
  try {
    Logger.info('Tests: Fetching items', { query: req.query });

    const service = getTestsService();
    const items = await service.getItems();

    if (!items) {
      Logger.warn('Tests: No items found');
      res.status(404).json({ message: 'No test items found' } as Tests);
      return;
    }

    Logger.info(
      `Tests: Successfully retrieved ${items.items?.length ?? 0} items`,
    );
    res.status(200).json(items);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`Tests: Error fetching items - ${errorMessage}`, { error });
    next(error);
  }
};

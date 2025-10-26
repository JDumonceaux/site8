import type { Request, Response } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Pages } from '../../types/Pages.js';
import { getPagesService } from '../../lib/utils/ServiceFactory.js';

export const getItems = async (
  _req: Request,
  res: Response<Pages>,
): Promise<void> => {
  try {
    Logger.info('Pages: Get Items called');

    const service = getPagesService();
    const response = await service.getItems();

    if (!response) {
      Logger.warn('Pages: No items found');
      res
        .status(404)
        .json({ items: [], metadata: { title: 'No pages found' } });
      return;
    }

    Logger.info(
      `Pages: Successfully retrieved ${response.items?.length ?? 0} items`,
    );
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`Pages: Error fetching items - ${errorMessage}`, { error });
    res.sendStatus(500);
  }
};

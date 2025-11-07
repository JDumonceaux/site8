import { Logger } from '../../lib/utils/logger.js';
import { getPhotosService } from '../../lib/utils/ServiceFactory.js';

import type { Photos } from '../../types/Photos.js';
import type { Request, Response } from 'express';

export const getItems = async (
  _req: Request,
  res: Response<Photos>,
): Promise<void> => {
  try {
    Logger.info('Photos: Fetching items');

    const service = getPhotosService();
    const items = await service.getItems();

    if (!items) {
      Logger.warn('Photos: No items found');
      res.status(404).json({
        title: 'No photos found',
        items: [],
        sets: [],
        metadata: { title: 'No photos found' },
      });
      return;
    }

    Logger.info('Photos: Successfully retrieved items');
    res.status(200).json(items);
  } catch (error) {
    Logger.error('Photos: Get Items error:', error);
    res.sendStatus(500);
  }
};

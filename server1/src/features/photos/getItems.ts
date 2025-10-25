import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Photos } from '../../types/Photos.js';
import { getPhotosService } from '../../lib/utils/ServiceFactory.js';

export const getItems = async (
  _req: Request,
  res: Response<Photos>,
  next: NextFunction,
): Promise<void> => {
  try {
    Logger.info('Photos: Fetching items');

    const service = getPhotosService();
    const items = await service.getItems();

    if (!items) {
      Logger.warn('Photos: No items found');
      res.status(404).json({ message: 'No photos found' } as unknown as Photos);
      return;
    }

    Logger.info('Photos: Successfully retrieved items');
    res.status(200).json(items);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`Photos: Error fetching items - ${errorMessage}`, { error });
    return next(error);
  }
};

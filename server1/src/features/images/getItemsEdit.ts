import { Request, Response } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Images } from '../../types/Images.js';
import { getImagesService } from '../../lib/utils/ServiceFactory.js';

export const getItemsEdit = async (
  _req: Request,
  res: Response<Images>,
): Promise<void> => {
  Logger.info('Images: Get Items Edit called');

  try {
    const service = getImagesService();
    const response = await service.getItemsEdit();
    if (response) {
      res.status(200).json(response);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    // Optionally log error or handle with error middleware
    // Logger.error(error);
    res.sendStatus(500);
  }
};

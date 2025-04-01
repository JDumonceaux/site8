import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Images } from '../../types/Images.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const getItems = async (
  req: Request,
  res: Response<Images>,
  next: NextFunction,
): Promise<Response<Images> | void> => {
  Logger.info('Images: Get Items called');

  try {
    const service = ServiceFactory.getImagesService();
    const response = await service.getItems();
    return response ? res.status(200).json(response) : res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { getImagesService } from '../../lib/utils/ServiceFactory.js';

export const getListDuplicates = async (
  _req: Request,
  res: Response<string | string[]>,
  next: NextFunction,
): Promise<Response<string | string[]> | void> => {
  Logger.info('Images: Get List Duplicates called');

  try {
    const service = getImagesService();
    const response = await service.listDuplicates();
    return response ? res.status(200).json(response) : res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

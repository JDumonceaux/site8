import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const getReindex = async (
  _req: Request,
  res: Response<boolean>,
  next: NextFunction,
): Promise<Response<boolean> | void> => {
  Logger.info('Images: Get Reindex called');

  try {
    const service = ServiceFactory.getImagesService();
    const result = await service.fixIndex();
    return result ? res.status(200).json(result) : res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

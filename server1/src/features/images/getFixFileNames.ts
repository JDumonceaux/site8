import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { getImagesService } from '../../lib/utils/ServiceFactory.js';

export const getFixFileNames = async (
  _req: Request,
  res: Response<boolean>,
  next: NextFunction,
): Promise<Response<boolean> | void> => {
  Logger.info('Images: Get Fix File Names called');

  try {
    const service = getImagesService();
    const result = await service.fixNames();
    return result ? res.status(200).json(result) : res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

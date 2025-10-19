import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { getImagesFileService } from '../../lib/utils/ServiceFactory.js';

export const getFolders = async (
  _req: Request,
  res: Response<string[] | undefined>,
  next: NextFunction,
): Promise<Response<string[] | undefined> | void> => {
  Logger.info('Images: Get Folders called');

  try {
    const service = getImagesFileService();
    const folders = await service.getFolders();

    return folders ? res.status(200).json(folders) : res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

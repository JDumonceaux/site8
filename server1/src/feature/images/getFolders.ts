import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ImagesFileService } from './ImagesFileService.js';

export const getFolders = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<string[] | undefined>,
  next: NextFunction,
) => {
  Logger.info(`Images: Get Folders called:`);

  const service = new ImagesFileService();
  await service
    .getFolders()
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(204).send();
      }
    })
    .catch((error: Error) => {
      next(error);
    });
};

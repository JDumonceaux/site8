import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ImagesFileService } from './ImagesFileService.js';

export const getFixFileNames = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean>,
  next: NextFunction,
) => {
  Logger.info(`Images: Get Fix File Names called:`);

  const service = new ImagesFileService();
  await service
    .fixNames()
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

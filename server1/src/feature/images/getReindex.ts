import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ImagesService } from './ImagesService.js';

export const getReindex = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean>,
  next: NextFunction,
) => {
  Logger.info(`Images: Get Reindex called:`);

  const service = new ImagesService();
  await service
    .fixIndex()
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        // res.status(204).json({ error: Errors.NO_CONTENT });
      }
    })
    .catch((error: Error) => {
      next(error);
    });
};

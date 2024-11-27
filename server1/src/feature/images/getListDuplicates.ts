import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ImagesService } from './ImagesService.js';

export const getListDuplicates = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<string | string[]>,
  next: NextFunction,
) => {
  Logger.info(`Images: Get List Duplicates called:`);

  const service = new ImagesService();
  await service
    .listDuplicates()
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

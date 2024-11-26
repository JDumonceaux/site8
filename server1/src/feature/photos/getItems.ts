import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { PhotosService } from './PhotosService.js';
import { Photos } from '../../types/Photos.js';

export const getItems = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Photos>,
  next: NextFunction,
) => {
  Logger.info(`Photos: Get Items called`);

  const service = new PhotosService();

  await service
    .getItems()
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.json(response);
      }
    })
    .catch((error: Error) => {
      next(error);
    });
};

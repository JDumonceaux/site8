import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Images } from '../../types/Images.js';
import { ImagesService } from './ImagesService.js';

export const getItemsEdit = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Images>,
  next: NextFunction,
) => {
  Logger.info(`Images: Get Items Edit called:`);

  const service = new ImagesService();
  await service
    .getItemsEdit()
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

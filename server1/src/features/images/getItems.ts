import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Images } from '../../types/Images.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const getItems = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Images>,
  next: NextFunction,
) => {
  Logger.info(`Images: Get Items called:`);

  const service = ServiceFactory.getImagesService();
  await service
    .getItems()
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

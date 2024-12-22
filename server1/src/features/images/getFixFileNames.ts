import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const getFixFileNames = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean>,
  next: NextFunction,
) => {
  Logger.info(`Images: Get Fix File Names called:`);

  const service = ServiceFactory.getImagesService();
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

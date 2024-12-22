import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const listDuplicates = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<unknown>,
  next: NextFunction,
) => {
  Logger.info(`Pages: List Duplicates called`);

  const service = ServiceFactory.getPagesService();

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

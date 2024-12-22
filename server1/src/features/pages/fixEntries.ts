import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const fixEntries = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<unknown>,
  next: NextFunction,
) => {
  Logger.info(`Pages: Fix Entries called`);

  const service = ServiceFactory.getPagesService();

  await service
    .fixAllEntries()
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

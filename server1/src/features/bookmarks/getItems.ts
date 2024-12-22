import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Bookmarks } from '../../types/Bookmarks.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const getItems = async (
  _req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Bookmarks>,
  next: NextFunction,
) => {
  Logger.info(`Bookmarks: Get Items called: `);

  const service = ServiceFactory.getBookmarksService();
  await service
    .getAllItems()
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

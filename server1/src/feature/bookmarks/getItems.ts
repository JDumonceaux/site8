import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { BookmarksService } from './BookmarksService.js';
import { Bookmarks } from '../../types/Bookmarks.js';

export const getItems = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Bookmarks>,
  next: NextFunction,
) => {
  Logger.info(`Bookmarks: Get Items called: `);

  const service = new BookmarksService();
  await service
    .getAllItems()
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

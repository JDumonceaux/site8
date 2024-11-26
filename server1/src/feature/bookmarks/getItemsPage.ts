import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { BookmarksService } from './BookmarksService.js';
import { Bookmarks } from '../../types/Bookmarks.js';

export const getItemsPage = async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response<Bookmarks>,
  next: NextFunction,
) => {
  const { id } = req.params;

  Logger.info(`Bookmarks: Get ItemsPage called: `);

  const service = new BookmarksService();
  await service
    .getBookmarksForPage(id)
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

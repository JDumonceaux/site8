import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { BookmarksService } from './BookmarksService.js';
import { BookmarksTags } from '../../types/BookmarksTags.js';

export const getTags = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<BookmarksTags>,
  next: NextFunction,
) => {
  Logger.info(`Bookmarks: Get Tags called: `);

  const service = new BookmarksService();
  await service
    .getAllItemsByTag()
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

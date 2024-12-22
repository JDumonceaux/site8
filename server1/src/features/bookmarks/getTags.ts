import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { BookmarksTags } from '../../types/BookmarksTags.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const getTags = async (
  _req: Request<unknown, unknown, unknown, unknown>,
  res: Response<BookmarksTags>,
  next: NextFunction,
) => {
  Logger.info(`Bookmarks: Get Tags called: `);

  const service = ServiceFactory.getBookmarksService();
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

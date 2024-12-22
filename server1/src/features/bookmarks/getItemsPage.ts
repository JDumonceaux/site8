import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Bookmarks } from '../../types/Bookmarks.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const getItemsPage = async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response<Bookmarks>,
  next: NextFunction,
) => {
  const { id } = req.params;

  Logger.info(`Bookmarks: Get ItemsPage called: `);

  const service = ServiceFactory.getBookmarksService();
  await service
    .getBookmarksForPage(id)
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

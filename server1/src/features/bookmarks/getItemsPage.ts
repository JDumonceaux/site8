import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Bookmarks } from '../../types/Bookmarks.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const getItemsPage = async (
  req: Request<{ id: string }>,
  res: Response<Bookmarks>,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    Logger.info('Bookmarks: Get ItemsPage called');

    const service = ServiceFactory.getBookmarksService();
    const bookmarks = await service.getBookmarksForPage(id);

    if (!bookmarks) {
      return res.status(204).send();
    }

    return res.status(200).json(bookmarks);
  } catch (error) {
    next(error);
  }
};

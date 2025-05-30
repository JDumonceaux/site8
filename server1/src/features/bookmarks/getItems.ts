import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Bookmarks } from '../../types/Bookmarks.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const getItems = async (
  _req: Request,
  res: Response<Bookmarks>,
  next: NextFunction,
) => {
  try {
    Logger.info('Bookmarks: Get Items called');

    const service = ServiceFactory.getBookmarksService();
    const bookmarks = await service.getAllItems();

    if (!bookmarks) {
      return res.status(204).send();
    }

    return res.status(200).json(bookmarks);
  } catch (error) {
    next(error);
  }
};

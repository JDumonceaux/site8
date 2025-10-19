import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { BookmarksTags } from '../../types/BookmarksTags.js';
import { getBookmarksService } from '../../lib/utils/ServiceFactory.js';

export const getTags = async (
  _req: Request,
  res: Response<BookmarksTags>,
  next: NextFunction,
) => {
  try {
    Logger.info('Bookmarks: Get Tags called');
    const service = getBookmarksService();
    const tags = await service.getAllItemsByTag();

    if (!tags) {
      return res.status(204).send();
    }

    return res.status(200).json(tags);
  } catch (error) {
    Logger.error('Bookmarks: Get Tags failed', { error });
    return next(error);
  }
};

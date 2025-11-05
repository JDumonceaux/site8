import { Logger } from '../../lib/utils/logger.js';
import { getBookmarksService } from '../../lib/utils/ServiceFactory.js';

import type { BookmarksTags } from '../../types/BookmarksTags.js';
import type { Request, Response } from 'express';

export const getTags = async (
  _req: Request,
  res: Response<BookmarksTags>,
): Promise<void> => {
  try {
    Logger.info('Bookmarks: Get Tags called');
    const service = getBookmarksService();
    const tags = await service.getAllItemsByTag();

    if (!tags) {
      res.sendStatus(204);
      return;
    }
    res.status(200).json(tags);
  } catch (error) {
    Logger.error('Bookmarks: Get Tags failed', { error });
    res.sendStatus(500);
  }
};

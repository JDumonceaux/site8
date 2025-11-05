import { Logger } from '../../lib/utils/logger.js';
import { getBookmarksService } from '../../lib/utils/ServiceFactory.js';

import type { Bookmarks } from '../../types/Bookmarks.js';
import type { Request, Response } from 'express';

export const getItems = async (
  _req: Request,
  res: Response<Bookmarks>,
): Promise<void> => {
  try {
    Logger.info('Bookmarks: Get Items called');

    const service = getBookmarksService();
    const bookmarks = await service.getAllItems();

    if (!bookmarks) {
      res.sendStatus(204);
      return;
    }
    res.status(200).json(bookmarks);
  } catch (error) {
    Logger.error('Bookmarks: Get Items failed', { error });
    res.sendStatus(500);
  }
};

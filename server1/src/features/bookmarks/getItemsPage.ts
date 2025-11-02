import type { Request, Response } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Bookmarks } from '../../types/Bookmarks.js';
import { getBookmarksService } from '../../lib/utils/ServiceFactory.js';

export const getItemsPage = async (
  req: Request,
  res: Response<Bookmarks>,
): Promise<void> => {
  try {
    const { id } = req.params;
    Logger.info('Bookmarks: Get ItemsPage called');

    if (!id) {
      res.status(400).json({ error: 'Invalid ID' } as unknown as Bookmarks);
      return;
    }

    const service = getBookmarksService();
    const bookmarks = await service.getBookmarksForPage(id);

    if (!bookmarks) {
      res.sendStatus(204);
      return;
    }
    res.status(200).json(bookmarks);
  } catch (error) {
    Logger.error('Bookmarks: Get ItemsPage failed', { error });
    res.sendStatus(500);
  }
};

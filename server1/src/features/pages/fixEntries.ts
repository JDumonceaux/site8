import { Logger } from '../../lib/utils/logger.js';
import { getPagesService } from '../../lib/utils/ServiceFactory.js';

import type { Request, Response } from 'express';

export const fixEntries = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    Logger.info('Pages: Fix Entries called');

    const service = getPagesService();
    await service.fixAllEntries();

    Logger.info('Pages: Successfully fixed all entries');
    res.status(200).json({ message: 'Successfully fixed all entries' });
  } catch (error) {
    Logger.error('Pages: Fix Entries error:', error);
    res.sendStatus(500);
  }
};

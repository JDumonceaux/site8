import { Logger } from '../../lib/utils/logger.js';
import { getPagesService } from '../../lib/utils/ServiceFactory.js';

import type { MenuEdit } from '../../types/MenuEdit.js';
import type { Request, Response } from 'express';

export const patchItem = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response,
): Promise<void> => {
  const data = req.body as MenuEdit[];

  Logger.info(`Menu: Put Items called: `);

  if (Object.keys(data).length === 0) {
    res.status(400).json({ error: 'No data found' });
    return;
  }

  try {
    const service = getPagesService();
    await service.updateItems(data);
    res.sendStatus(200);
  } catch (error) {
    Logger.error('Menu: Patch Item error:', error);
    res.sendStatus(500);
  }
};

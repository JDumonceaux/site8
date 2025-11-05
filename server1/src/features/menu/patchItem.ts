import { Logger } from '../../lib/utils/logger.js';
import { getPagesService } from '../../lib/utils/ServiceFactory.js';

import type { MenuEdit } from '../../types/MenuEdit.js';
import type { Request, Response } from 'express';

export const patchItem = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean>,
): Promise<void> => {
  const data = req.body as MenuEdit[];

  Logger.info(`Menu: Put Items called: `);

  if (!data) {
    res.sendStatus(400);
    return;
  }
  try {
    const service = getPagesService();
    await service.updateItems(data);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

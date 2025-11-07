import { Logger } from '../../lib/utils/logger.js';
import { getMenuService } from '../../lib/utils/ServiceFactory.js';

import type { Menus } from '../../types/Menus.js';
import type { Request, Response } from 'express';

export const getItems = async (
  _req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Menus>,
): Promise<void> => {
  Logger.info(`Menu: Get Items called: `);

  const service = getMenuService();

  try {
    const response = await service.getMenu();
    if (response) {
      res.status(200).json(response);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    Logger.error('Menu: Get Items error:', error);
    res.sendStatus(500);
  }
};

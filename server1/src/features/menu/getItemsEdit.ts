import type { Request, Response } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Menus } from '../../types/Menus.js';
import { getMenuService } from '../../lib/utils/ServiceFactory.js';

export const getItemsEdit = async (
  _req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Menus>,
): Promise<void> => {
  Logger.info(`Menu: Get Items Edit called: `);

  const service = getMenuService();

  try {
    const response = await service.getMenu();
    if (response) {
      res.status(200).json(response);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

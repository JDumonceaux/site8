import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Menus } from '../../types/Menus.js';
import { MenuService } from './MenuService.js';

export const getItemsEdit = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Menus>,
  next: NextFunction,
) => {
  Logger.info(`Menu: Get Items Edit called: `);

  const service = new MenuService();

  await service
    .getMenu()
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(204).send();
      }
    })
    .catch((error: Error) => {
      next(error);
    });
};

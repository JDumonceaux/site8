import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Menus } from '../../types/Menus.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const getItems = async (
  _req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Menus>,
  next: NextFunction,
) => {
  Logger.info(`Menu: Get Items called: `);

  const service = ServiceFactory.getMenuService();

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

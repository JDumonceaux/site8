import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ItemAdd } from '../../types/ItemAdd.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const putItems = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean>,
  next: NextFunction,
) => {
  const data = req.body as ItemAdd[];

  Logger.info(`Items: Put Items called: `);

  if (!data) {
    throw new Error('No data to change.');
  }

  const service = ServiceFactory.getItemsService();

  await service
    .putItems(data)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.json(response);
      }
    })
    .catch((error: Error) => {
      next(error);
    });
};

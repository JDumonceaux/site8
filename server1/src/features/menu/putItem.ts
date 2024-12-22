import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { MenuAdd } from '../../types/MenuAdd.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const putItem = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean>,
  next: NextFunction,
) => {
  const data = req.body as MenuAdd;

  Logger.info(`Menu: Put Items called: `);

  const service = ServiceFactory.getPagesService();
  const service2 = ServiceFactory.getMenuService();

  if (!data) {
    // res.status(400).json({ error: 'No data found' });
  }

  // Get next id
  const idNew = (await service.getNextId()) ?? 0;
  if (!idNew || idNew === 0) {
    // res.status(400).json({ error: 'Next Id not found.' });
  }

  await service2
    .addItem({ ...data, id: idNew })
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      }
    })
    .catch((error: Error) => {
      next(error);
    });

  next();
};

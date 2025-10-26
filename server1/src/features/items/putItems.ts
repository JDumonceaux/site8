import type { Request, Response } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ItemAdd } from '../../types/ItemAdd.js';
import { getItemsService } from '../../lib/utils/ServiceFactory.js';

export const putItems = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean>,
): Promise<void> => {
  const data = req.body as ItemAdd[];

  Logger.info(`Items: Put Items called: `);

  if (!data) {
    throw new Error('No data to change.');
  }

  const service = getItemsService();

  try {
    const response = await service.putItems(data);
    if (response) {
      res.status(200).json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

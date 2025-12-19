import { Logger } from '../../utils/logger.js';
import { getItemsService } from '../../utils/ServiceFactory.js';

import type { ItemAdd } from '../../types/ItemAdd.js';
import type { Request, Response } from 'express';

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
    Logger.error('Items: Put Items error:', error);
    res.sendStatus(500);
  }
};

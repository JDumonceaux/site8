import type { Request, Response } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Items } from '../../types/Items.js';
import { getItemsService } from '../../lib/utils/ServiceFactory.js';

export const getItems = async (
  _req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Items>,
): Promise<void> => {
  Logger.info(`Items: Get Items called: `);

  const service = getItemsService();

  try {
    const response = await service.getItems();
    if (response) {
      res.status(200).json(response);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

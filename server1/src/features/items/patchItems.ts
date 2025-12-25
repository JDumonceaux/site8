import type { Request, Response } from 'express';

import type { ItemEdit } from '../../types/ItemEdit.js';

import { Logger } from '../../utils/logger.js';
import { getItemsService } from '../../utils/ServiceFactory.js';

export const patchItems = (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean | string>,
): void => {
  const data = req.body as ItemEdit[];

  Logger.info(`Items: Patch Items called: `);

  if (!Array.isArray(data) || data.length === 0) {
    res.status(400).send('No valid data to change.');
    return;
  }

  const service = getItemsService();

  try {
    const response = service.patchItems(data);
    if (response) {
      res.status(200).send();
    } else {
      res.status(500).send('Edit failed');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error('Items: Patch Items error:', errorMessage);
    res.status(500).send(errorMessage);
  }
};

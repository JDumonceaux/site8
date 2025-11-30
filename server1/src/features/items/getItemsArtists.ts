import { getItemsService } from '../../lib/utils/ServiceFactory.js';

import { Logger } from '../../lib/utils/logger.js';

import type { Items } from '../../types/Items.js';
import type { Request, Response } from 'express';

export const getItemsArtists = async (
  _req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Items>,
): Promise<void> => {
  try {
    Logger.info('Fetching items and artists from the service.');

    const service = getItemsService();
    const response = await service.getItems();

    if (response) {
      Logger.info('Successfully retrieved items.');
      res.status(200).json(response);
    } else {
      Logger.info('No items found.');
      res.sendStatus(204);
    }
  } catch (error: unknown) {
    Logger.error('Items: Get Items Artists error:', error);
    res.sendStatus(500);
  }
};

import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ItemsService } from './ItemsService.js';
import { Items } from '../../types/Items.js';

export const getItemsArtists = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Items>,
  next: NextFunction,
) => {
  Logger.info(`Items: Get Items Artists called: `);

  const service = new ItemsService();

  await service
    .getItems()
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

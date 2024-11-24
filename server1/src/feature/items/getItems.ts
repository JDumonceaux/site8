import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ItemsService } from './ItemsService.js';
import { Items } from '../../types/Items.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestParams {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestQuery {}

export const getItems = async (
  req: Request<IRequestParams, unknown, unknown, IRequestQuery>,
  res: Response<Items>,
  next: NextFunction,
) => {
  Logger.info(`Items: Get Items called: `);

  const service = new ItemsService();

  await service
    .getItems()
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

import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { PagesService } from './PagesService.js';
import { Pages } from '../../types/Pages.js';

export const getItems = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Pages>,
  next: NextFunction,
) => {
  Logger.info(`Pages: Get Items called`);

  const service = new PagesService();

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

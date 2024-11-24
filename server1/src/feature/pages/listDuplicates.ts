import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { PagesService } from './PagesService.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestParams {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestQuery {}

export const listDuplicates = async (
  req: Request<IRequestParams, unknown, unknown, IRequestQuery>,
  res: Response<unknown>,
  next: NextFunction,
) => {
  Logger.info(`Pages: List Duplicates called`);

  const service = new PagesService();

  await service
    .listDuplicates()
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

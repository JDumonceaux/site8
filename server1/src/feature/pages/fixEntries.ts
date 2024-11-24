import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { PagesService } from './PagesService.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestParams {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestQuery {}

export const fixEntries = async (
  req: Request<IRequestParams, unknown, unknown, IRequestQuery>,
  res: Response<unknown>,
  next: NextFunction,
) => {
  Logger.info(`Pages: Fix Entries called`);

  const service = new PagesService();

  await service
    .fixAllEntries()
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

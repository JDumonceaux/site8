import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { PagesService } from './PagesService.js';
import { Pages } from '../../types/Pages.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestParams {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestQuery {}

export const getItems = async (
  req: Request<IRequestParams, unknown, unknown, IRequestQuery>,
  res: Response<Pages>,
  next: NextFunction,
) => {
  // const { requestConfig } = res.locals;
  // const { includeArriveDetails, onlyConventionalAccounts } =      req.query ;

  Logger.info(`Pages: Get Items called`);

  const service = new PagesService();

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

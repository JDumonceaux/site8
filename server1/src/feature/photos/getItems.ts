import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { PhotosService } from './PhotosService.js';
import { Photos } from '../../types/Photos.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestParams {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestQuery {}

export const getItems = async (
  req: Request<IRequestParams, unknown, unknown, IRequestQuery>,
  res: Response<Photos>,
  next: NextFunction,
) => {
  // const { requestConfig } = res.locals;
  // const { includeArriveDetails, onlyConventionalAccounts } =      req.query ;

  Logger.info(`Photos: Get Items called`);

  const service = new PhotosService();

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

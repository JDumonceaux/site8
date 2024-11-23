import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { TestsService } from './TestsService.js';
import { Tests } from '../../types/Tests.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestParams {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestQuery {}

export const getItems = async (
  req: Request<IRequestParams, unknown, unknown, IRequestQuery>,
  res: Response<Tests>,
  next: NextFunction,
) => {
  Logger.info(`Tests: Get Items controller called`);

  const service = new TestsService();

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

import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Tests } from '../../types/Tests.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestParams {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestQuery {}

export const getItems = async (
  req: Request<IRequestParams, unknown, unknown, IRequestQuery>,
  res: Response<Tests>,
  next: NextFunction,
) => {
  Logger.info(`Tests: Get Items called`);

  const service = ServiceFactory.getTestsService();

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

import { NextFunction, Request, Response } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

const service = ServiceFactory.getBuildService();

export const buildFeature = async (
  _req: Request<unknown>,
  res: Response<unknown>,
  next: NextFunction,
) => {
  Logger.debug(`Build Feature called`);

  await service
    .build('artist2')
    .then((response: unknown) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(204).send();
      }
    })
    .catch((error: unknown) => {
      next(error);
      res.status(500).send('Error building feature');
    });
};

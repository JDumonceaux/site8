import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Artists } from '../../types/Artists.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const getItems = async (
  _req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Artists>,
  next: NextFunction,
) => {
  Logger.info(`Artists: Get Artists called: `);

  const service = ServiceFactory.getArtistsService();

  await service
    .getArtists()
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

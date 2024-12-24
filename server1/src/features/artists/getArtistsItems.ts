import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';
import { ArtistsItems } from '../../types/ArtistsItems.js';

export const getArtistsItems = async (
  _req: Request<unknown, unknown, unknown, unknown>,
  res: Response<ArtistsItems>,
  next: NextFunction,
) => {
  Logger.info(`Items: Get Artists Items called: `);

  const service = ServiceFactory.getArtistsService();

  await service
    .getArtistsItems()
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

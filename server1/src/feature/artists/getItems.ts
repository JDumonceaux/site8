import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ArtistsService } from './ArtistsService.js';
import { Artists } from '../../types/Artists.js';

export const getItems = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Artists>,
  next: NextFunction,
) => {
  Logger.info(`Artists: Get Artists called: `);

  const service = new ArtistsService();

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

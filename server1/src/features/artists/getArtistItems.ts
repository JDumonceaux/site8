import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';
import { ArtistItems } from '../..//types/ArtistItems.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';

export const getArtistItems = async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response<ArtistItems>,
  next: NextFunction,
) => {
  Logger.info(`Items: Get Artist Items called: `);

  const service = ServiceFactory.getArtistsService();
  const id = req.params.id;
  const { id: idNum } = parseRequestId(id.trim());

  await service
    .getArtistItems(idNum || 0)
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

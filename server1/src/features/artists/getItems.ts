import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Artists } from '../../types/Artists.js';
import { getArtistsService } from '../../lib/utils/ServiceFactory.js';

export const getItems = async (
  _req: Request,
  res: Response<Artists>,
  next: NextFunction,
) => {
  try {
    Logger.info('Artists: Get Artists called');

    const service = getArtistsService();
    const artists = await service.getArtists();

    if (!artists) {
      return res.status(204).send();
    }

    return res.status(200).json(artists);
  } catch (error) {
    Logger.error('Artists: Get Artists failed', { error });
    return next(error);
  }
};

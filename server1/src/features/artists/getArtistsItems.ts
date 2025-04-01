import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';
import { ArtistsItems } from '../../types/ArtistsItems.js';

export const getArtistsItems = async (
  _req: Request,
  res: Response<ArtistsItems>,
  next: NextFunction,
) => {
  try {
    Logger.info('Items: Get Artists Items called');

    const service = ServiceFactory.getArtistsService();
    const artistsItems = await service.getArtistsItems();

    if (!artistsItems) {
      return res.status(204).send();
    }

    return res.status(200).json(artistsItems);
  } catch (error) {
    next(error);
  }
};

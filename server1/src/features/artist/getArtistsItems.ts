import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { getArtistsService } from '../../lib/utils/ServiceFactory.js';
import { ArtistsItems } from '../../types/ArtistsItems.js';

const getArtistsItems = async (
  _req: Request,
  res: Response<ArtistsItems>,
  next: NextFunction,
): Promise<Response<ArtistsItems> | void> => {
  try {
    Logger.info('Items: Get Artists Items called');

    const service = getArtistsService();
    const artistsItems = await service.getArtistsItems();

    if (!artistsItems) {
      return res.status(204).send();
    }

    return res.status(200).json(artistsItems);
  } catch (error) {
    Logger.error('Items: Get Artists Items failed', { error });
    return next(error);
  }
};

export default getArtistsItems;

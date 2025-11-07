import { Logger } from '../../lib/utils/logger.js';
import { getArtistsService } from '../../lib/utils/ServiceFactory.js';

import type { ArtistsItems } from '../../types/ArtistsItems.js';
import type { Request, Response } from 'express';

const getArtistsItems = async (
  _req: Request,
  res: Response<ArtistsItems>,
): Promise<void> => {
  try {
    Logger.info('Items: Get Artists Items called');

    const service = getArtistsService();
    const artistsItems = await service.getArtistsItems();

    // if the service returns an empty array respond with 204 No Content
    if (Array.isArray(artistsItems) && artistsItems.length === 0) {
      res.sendStatus(204);
      return;
    }
    res.status(200).json(artistsItems);
  } catch (error) {
    Logger.error('Items: Get Artists Items failed', error);
    res.sendStatus(500);
  }
};

export default getArtistsItems;

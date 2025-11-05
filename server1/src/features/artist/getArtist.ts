import { Logger } from '../../lib/utils/logger.js';
import { getArtistsService } from '../../lib/utils/ServiceFactory.js';

import type { Artists } from '../../types/Artists.js';
import type { Request, Response } from 'express';

export const getArtist = async (
  _req: Request,
  res: Response<Artists>,
): Promise<void> => {
  try {
    Logger.info('Artists: Get Artists called');

    const service = getArtistsService();
    const artists = await service.getArtists();

    if (!artists) {
      res.status(204).send();
      return;
    }

    res.status(200).json(artists);
  } catch (error) {
    Logger.error('Artists: Get Artists failed', { error });
    res.sendStatus(500);
  }
};

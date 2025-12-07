import type { Request, Response } from 'express';

import type { MusicItems } from '../../types/MusicItems.js';

import { Logger } from '../../lib/utils/logger.js';
import { getMusicService } from '../../lib/utils/ServiceFactory.js';

export const getItems = async (
  _req: Request<unknown, unknown, unknown, unknown>,
  res: Response<MusicItems>,
): Promise<void> => {
  Logger.info('Music: Get Items called');

  const service = getMusicService();

  try {
    const response = await service.getItems();
    if (response) {
      res.status(200).json(response);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error('Music: Get Items error:', errorMessage);
    res.sendStatus(500);
  }
};

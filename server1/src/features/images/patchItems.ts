import type { Request, Response } from 'express';

import type { Images } from '@site8/shared';

import { Logger } from '../../utils/logger.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

export const patchItems = async (
  req: Request,
  res: Response<Images>,
): Promise<void> => {
  const data = req.body as Images;

  Logger.info(`Images: Patch Images called: `);

  try {
    const service = getImagesService();
    await service.updateItems(data.items);
    res.sendStatus(200);
  } catch (error) {
    Logger.error('Images: Patch Items error:', error);
    res.sendStatus(500);
  }
};

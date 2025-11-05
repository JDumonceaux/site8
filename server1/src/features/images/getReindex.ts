import { Logger } from '../../lib/utils/logger.js';
import { getImagesService } from '../../lib/utils/ServiceFactory.js';

import type { Request, Response } from 'express';

export const getReindex = async (
  _req: Request,
  res: Response<boolean>,
): Promise<void> => {
  Logger.info('Images: Get Reindex called');

  try {
    const service = getImagesService();
    const result = await service.fixIndex();
    if (result) {
      res.status(200).json(result);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    // Optionally log error or handle with error middleware
    // Logger.error(error);
    res.sendStatus(500);
  }
};

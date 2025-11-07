import { Logger } from '../../lib/utils/logger.js';
import { getImagesService } from '../../lib/utils/ServiceFactory.js';

import type { Request, Response } from 'express';

export const getFixFileNames = async (
  _req: Request,
  res: Response<boolean>,
): Promise<void> => {
  Logger.info('Images: Get Fix File Names called');

  try {
    const service = getImagesService();
    const result = await service.fixNames();
    if (result) {
      res.status(200).json(result);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    Logger.error('Images: Get Fix File Names error:', error);
    res.sendStatus(500);
  }
};

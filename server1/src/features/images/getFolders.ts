import { Logger } from '../../lib/utils/logger.js';
import { getImagesFileService } from '../../lib/utils/ServiceFactory.js';

import type { Request, Response } from 'express';

export const getFolders = async (
  _req: Request,
  res: Response<string[] | undefined>,
): Promise<void> => {
  Logger.info('Images: Get Folders called');

  try {
    const service = getImagesFileService();
    const folders = await service.getFolders();
    if (folders) {
      res.status(200).json(folders);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    Logger.error('Images: Get Folders error:', error);
    res.sendStatus(500);
  }
};

import { Logger } from '../../lib/utils/logger.js';
import { getImagesService } from '../../lib/utils/ServiceFactory.js';

import type { Request, Response } from 'express';

export const getListDuplicates = async (
  _req: Request,
  res: Response<string | string[]>,
): Promise<void> => {
  Logger.info('Images: Get List Duplicates called');

  try {
    const service = getImagesService();
    const response = await service.listDuplicates();
    if (response) {
      res.status(200).json(response);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    Logger.error('Images: Get List Duplicates error:', error);
    res.sendStatus(500);
  }
};

import { Request, Response } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { getImagesService } from '../../lib/utils/ServiceFactory.js';

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
    // Optionally log error or handle with error middleware
    // Logger.error(error);
    res.sendStatus(500);
  }
};

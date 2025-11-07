import { Logger } from '../../lib/utils/logger.js';
import { getPagesService } from '../../lib/utils/ServiceFactory.js';

import type { Request, Response } from 'express';

type DuplicatesResponse = {
  readonly items: string[];
};

export const listDuplicates = async (
  _req: Request,
  res: Response<DuplicatesResponse>,
): Promise<void> => {
  try {
    Logger.info('Pages: List duplicates called');

    const service = getPagesService();
    const response = await service.listDuplicates();

    Logger.info(`Pages: Found ${response.items.length} duplicates`);
    res.status(200).json(response);
  } catch (error) {
    Logger.error('Pages: List Duplicates error:', error);
    res.sendStatus(500);
  }
};

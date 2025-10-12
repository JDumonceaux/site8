import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { getPagesService } from '../../lib/utils/ServiceFactory.js';

type DuplicatesResponse = {
  readonly items: string[];
};

export const listDuplicates = async (
  req: Request,
  res: Response<DuplicatesResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    Logger.info('Pages: List duplicates called');

    const service = getPagesService();
    const response = await service.listDuplicates();

    Logger.info(`Pages: Found ${response.items.length} duplicates`);
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`Pages: Error listing duplicates - ${errorMessage}`, {
      error,
    });
    next(error);
  }
};

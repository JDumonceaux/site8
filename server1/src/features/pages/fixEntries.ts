import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { getPagesService } from '../../lib/utils/ServiceFactory.js';

export const fixEntries = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    Logger.info('Pages: Fix Entries called');

    const service = getPagesService();
    await service.fixAllEntries();

    Logger.info('Pages: Successfully fixed all entries');
    res.status(200).json({ message: 'Successfully fixed all entries' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`Pages: Error fixing entries - ${errorMessage}`, { error });
    next(error);
  }
};

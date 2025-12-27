import type { NextFunction, Request, Response } from 'express';

import { Logger } from '../../utils/logger.js';
import { getBuildService } from '../../utils/ServiceFactory.js';

const service = getBuildService();

export const buildFeature = async (
  _req: Request<unknown>,
  res: Response<unknown>,
  next: NextFunction,
): Promise<void> => {
  Logger.debug('Build Feature called');
  try {
    await service.build('artist2');
    res.status(200).json({ message: 'Build completed successfully' });
  } catch (error) {
    Logger.error('Error building feature', error);
    next(error);
    return;
  }
};

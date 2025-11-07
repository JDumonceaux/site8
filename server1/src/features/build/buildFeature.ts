import { Logger } from '../../lib/utils/logger.js';
import { getBuildService } from '../../lib/utils/ServiceFactory.js';

import type { NextFunction, Request, Response } from 'express';

const service = getBuildService();

export const buildFeature = async (
  _req: Request<unknown>,
  res: Response<unknown>,
  next: NextFunction,
): Promise<void> => {
  Logger.debug('Build Feature called');
  try {
    const response = await service.build('artist2');
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    Logger.error('Error building feature', error);
    next(error);
    return;
  }
};

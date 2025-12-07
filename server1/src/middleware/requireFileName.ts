import type { NextFunction, Request, Response } from 'express';

import { Logger } from '../lib/utils/logger.js';

export const requireFileName = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const { filename } = req.params;

  Logger.debug(`Require file name middleware received value=${filename}`);

  if (!filename) {
    Logger.warn(`Missing file name parameter`);
    _res.status(400).json({ message: 'File name is required' });
    return;
  }

  next();
};

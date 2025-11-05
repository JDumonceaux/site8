import { Logger } from '../lib/utils/logger.js';

import type { NextFunction, Request, Response } from 'express';

export const requireFileName = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { filename } = req.params;

  Logger.debug(`Require file name middleware received value=${filename}`);

  if (!filename) {
    Logger.warn(`Missing file name parameter`);
    return _res.status(400).json({ message: 'File name is required' });
  }

  next();
};

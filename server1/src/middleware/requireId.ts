import type { RequestHandler } from 'express';

import { Logger } from '../lib/utils/logger.js';

export const requireId: RequestHandler = (req, res, next): void => {
  const { id } = req.params;

  Logger.debug(`Require id middleware received value=${id}`);

  if (typeof id !== 'string' || id.trim() === '') {
    Logger.warn(`Missing or empty id parameter`);
    res.status(400).json({ message: 'Id is required' });
    return;
  }

  next();
};

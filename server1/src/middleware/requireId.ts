import { Logger } from '../lib/utils/logger.js';

import type { RequestHandler } from 'express';

export const requireId: RequestHandler = (req, res, next) => {
  const { id } = req.params;

  Logger.debug(`Require id middleware received value=${id}`);

  if (typeof id !== 'string' || id.trim() === '') {
    Logger.warn(`Missing or empty id parameter`);
    return res.status(400).json({ message: 'Id is required' });
  }

  next();
};

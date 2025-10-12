import { NextFunction, Request, Response } from 'express';
import { Logger } from '../lib/utils/logger.js';

export const requireId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  Logger.debug(`Require id middleware received value=${id}`);

  if (!id?.trim()) {
    Logger.warn(`Missing or empty id parameter`);
    return res.status(400).json({ message: 'Id is required' });
  }

  next();
};

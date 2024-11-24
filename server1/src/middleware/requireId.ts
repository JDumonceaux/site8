import { NextFunction, Request, Response } from 'express';
import { Logger } from '../lib/utils/logger.js';

export const requireId = (req: Request, _res: Response, next: NextFunction) => {
  const { id } = req.params;

  Logger.debug(`Require id middleware received value=${id}`);

  if (id) {
    next();
  } else {
    next(new Error('Filename is required'));
  }
};

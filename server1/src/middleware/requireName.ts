import { NextFunction, Request, Response } from 'express';
import { Logger } from '../lib/utils/logger.js';

export const requireName = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name } = req.params;

  Logger.debug(`Require id middleware received value=${name}`);

  if (name) {
    next();
  } else {
    res.status(400).json({ message: 'Name is required' });
  }
};

import { NextFunction, Request, Response } from 'express';
import { Logger } from 'lib/utils/logger.js';

export const requireFileName = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  //eslint-disable-next-line
  const { filename } = req.params;

  Logger.debug(`Require file name middleware received value=${filename}`);

  if (filename) {
    next();
  } else {
    next(new Error('Filename is required'));
  }
};

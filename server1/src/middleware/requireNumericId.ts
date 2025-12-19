import type { NextFunction, Request, Response } from 'express';

import { Logger } from '../utils/logger.js';

export const requireNumericId = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { id } = req.params;

  Logger.debug(`Require numeric id middleware received value=${id}`);

  if (!id?.trim()) {
    Logger.warn(`Missing or empty id parameter`);
    res.status(400).json({ message: 'Id is required' });
  }

  const numericId = Number(id);

  if (isNaN(numericId) || numericId <= 0 || !Number.isInteger(numericId)) {
    Logger.warn(`Invalid numeric id parameter: ${id}`);
    res.status(400).json({
      message: 'Id must be a positive integer',
    });
    return;
  }

  next();
};

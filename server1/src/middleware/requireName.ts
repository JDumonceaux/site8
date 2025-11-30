import { Logger } from '../lib/utils/logger.js';

import type { NextFunction, Request, Response } from 'express';

const MAX_NAME_LENGTH = 255;

export const requireName = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name } = req.params;

  Logger.debug(`Require name middleware received value=${name}`);

  if (!name?.trim()) {
    Logger.warn(`Missing or empty name parameter`);
    res.status(400).json({ message: 'Name is required' });
    return;
  }

  if (name.length > MAX_NAME_LENGTH) {
    Logger.warn(`Name parameter too long: ${name.length} characters`);
    res.status(400).json({
      message: `Name must not exceed ${MAX_NAME_LENGTH} characters`,
    });
    return;
  }

  next();
};

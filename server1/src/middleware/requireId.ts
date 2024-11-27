import { NextFunction, Request, Response } from 'express';
import { Logger } from '../lib/utils/logger.js';

export const requireId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  Logger.debug(`Require id middleware received value=${id}`);

  if (id) {
    next();
  } else {
    // const { id: idNum, isValid } = parseRequestId(id.trim());
    // if (!isValid || !idNum) {
    //   Logger.info(`Image: Get Item -> invalid param id: ${id}`);
    //   next({ message: Responses.INVALID_ID });
    //   return;
    // }

    res.status(400).json({ message: 'Id is required' });
  }
};

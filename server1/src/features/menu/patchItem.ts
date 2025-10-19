import { Request, Response, NextFunction } from 'express';
import { MenuEdit } from '../../types/MenuEdit.js';
import { Logger } from '../../lib/utils/logger.js';
import { getPagesService } from '../../lib/utils/ServiceFactory.js';

export const patchItem = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean>,
  next: NextFunction,
) => {
  const data = req.body as MenuEdit[];

  Logger.info(`Menu: Put Items called: `);

  if (!data) {
    res.status(500);
  } else {
    const service = getPagesService();

    await service
      .updateItems(data)
      .then((_response) => {
        // if (response) {
        //   res.status(200).json(response);
        // }
      })
      .catch((error: Error) => {
        return next(error);
      });
  }
  next();
};

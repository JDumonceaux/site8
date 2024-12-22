import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Image } from '../../types/Image.js';
import { PreferHeader } from '../../lib/utils/constants.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const patchItem = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Image>,
  next: NextFunction,
) => {
  const Prefer = req.get('Prefer');
  const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
  const data: Image = req.body as Image;

  Logger.info(`Image: Patch Item called: `);

  if (!data) {
    res.status(500);
  } else {
    const service = ServiceFactory.getImageService();

    await service
      .updateItem(data)
      .then((response) => {
        if (response) {
          res.status(200);
        }
      })
      .catch((error: Error) => {
        next(error);
      });
  }

  if (returnRepresentation) {
    next(`/image/${data.id}`);
  }
  next();
};

import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ImageService } from './ImageService.js';
import { Image } from '../../types/Image.js';
import { PreferHeader } from '../../lib/utils/constants.js';

export const putItem = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<Image>,
  next: NextFunction,
) => {
  const Prefer = req.get('Prefer');
  const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
  const data: Image = req.body as Image;

  Logger.info(`Image: Put Item called: `);

  if (!data) {
    res.status(500);
  } else {
    const service = new ImageService();

    await service
      .addItem(data)
      .then((_response) => {
        // if (response) {
        //   res.status(200).json(response);
        // } else {
        //   res.json(response);
        // }
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

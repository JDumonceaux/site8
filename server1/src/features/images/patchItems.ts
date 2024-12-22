import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Images } from '../../types/Images.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';
export const patchItems = async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response<Images>,
  next: NextFunction,
) => {
  //const Prefer = req.get('Prefer');
  //const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
  const data = req.body as Images;

  Logger.info(`Images: Patch Images called: `);

  if (!data) {
    res.status(500);
  } else {
    const service = ServiceFactory.getImagesService();
    await service
      .updateItems(data.items)
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

  // if (returnRepresentation) {
  //   const ret = await service.getItem(id);
  //   // 201 Created
  //   res.status(201).json(ret);
  // } else {
  //   res.status(201).json({ results: Responses.SUCCESS });
  // }
};

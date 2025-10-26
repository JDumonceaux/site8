import type { Request, Response } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Images } from '../../types/Images.js';
import { getImagesService } from '../../lib/utils/ServiceFactory.js';

export const patchItems = async (
  req: Request,
  res: Response<Images>,
): Promise<void> => {
  //const Prefer = req.get('Prefer');
  //const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
  const data = req.body as Images;

  Logger.info(`Images: Patch Images called: `);

  if (!data) {
    res.sendStatus(400);
    return;
  }
  try {
    const service = getImagesService();
    await service.updateItems(data.items);
    res.sendStatus(200);
  } catch (error) {
    // Optionally log error or handle with error middleware
    // Logger.error(error);
    res.sendStatus(500);
  }

  // if (returnRepresentation) {
  //   const ret = await service.getItem(id);
  //   // 201 Created
  //   res.status(201).json(ret);
  // } else {
  //   res.status(201).json({ results: Responses.SUCCESS });
  // }
};

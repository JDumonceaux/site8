import type { Request, Response } from 'express';

import type { Images } from '../../types/Images.js';

import { Logger } from '../../utils/logger.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

export const patchItems = async (
  req: Request,
  res: Response<Images>,
): Promise<void> => {
  //const Prefer = req.get('Prefer');
  //const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
  const data = req.body as Images;

  Logger.info(`Images: Patch Images called: `);

  try {
    const service = getImagesService();
    await service.updateItems(data.items);
    res.sendStatus(200);
  } catch (error) {
    Logger.error('Images: Patch Items error:', error);
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

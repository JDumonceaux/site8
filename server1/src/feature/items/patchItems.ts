import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ItemsService } from './ItemsService.js';
import { ItemEdit } from '../../types/ItemEdit.js';

export const patchItems = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean | string>,
  next: NextFunction,
) => {
  const data = req.body as ItemEdit[];

  Logger.info(`Items: Patch Items called: `);

  if (!data) {
    throw new Error('No data to change.');
  }

  const service = new ItemsService();

  await service
    .patchItems(data)
    .then((response) => {
      if (response) {
        res.status(200).send();
      } else {
        throw new Error(`Edit failed `);
      }
    })
    .catch((error: Error) => {
      next(error);
    });

  // if (returnRepresentation) {
  //   const ret = await service.getItem(id);
  //   // 201 Created
  //   res.status(201).json(ret);
  // } else {
  //   res.status(201).json({ results: Responses.SUCCESS });
  // }
};

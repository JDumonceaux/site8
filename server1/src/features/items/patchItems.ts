import type { Request, Response } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ItemEdit } from '../../types/ItemEdit.js';
import { getItemsService } from '../../lib/utils/ServiceFactory.js';

export const patchItems = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean | string>,
): Promise<void> => {
  const data = req.body as ItemEdit[];

  Logger.info(`Items: Patch Items called: `);

  if (!data) {
    throw new Error('No data to change.');
  }

  const service = getItemsService();

  await service
    .patchItems(data)
    .then((response) => {
      if (response) {
        res.status(200).send();
      } else {
        throw new Error(`Edit failed `);
      }
    })
    .catch((_error: Error) => {
      res.sendStatus(500);
    });

  // if (returnRepresentation) {
  //   const ret = await service.getItem(id);
  //   // 201 Created
  //   res.status(201).json(ret);
  // } else {
  //   res.status(201).json({ results: Responses.SUCCESS });
  // }
};

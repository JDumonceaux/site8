import { Request, Response, NextFunction } from 'express';

import { GenericService } from './GenericService.js';
import { Logger } from '../../lib/utils/logger.js';
import { PageText } from '../../types/PageText.js';
import { RESPONSES } from '@/lib/utils/constants.js';

export const getItemByName = async (
  req: Request<{ parent: string; name: string }, unknown, unknown, unknown>,
  res: Response<PageText | any>,
  next: NextFunction,
) => {
  const { name, parent } = req.params;
  Logger.info(`Generic: getItemByName called: ${parent}/${name}`);

  if (!name) {
    Logger.info(`Generic: getItemByName -> invalid param: ${parent}/${name}`);
    res.status(400).json({ error: RESPONSES.INVALID_PARAM });
    return;
  }

  const service = new GenericService();

  try {
    const response = await service.getItem(parent, name);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    Logger.error(`Generic: getItemByName -> error: ${String(error)}`);
    next(error);
  }
};

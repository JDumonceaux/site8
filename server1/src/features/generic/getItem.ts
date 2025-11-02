import type { Request, Response } from 'express';

import { GenericService } from './GenericService.js';
import { Logger } from '../../lib/utils/logger.js';
import { PageText } from '../../types/PageText.js';
import { RESPONSES } from '@/lib/utils/constants.js';

export const getItemByName = async (
  req: Request,
  res: Response<PageText | any>,
): Promise<void> => {
  const { name, parent } = req.params;
  Logger.info(`Generic: getItemByName called: ${parent}/${name}`);

  if (!name || !parent) {
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
      res.sendStatus(204);
    }
  } catch (error) {
    Logger.error(`Generic: getItemByName -> error: ${String(error)}`);
    res.sendStatus(500);
  }
};

import { RESPONSES } from '../../lib/utils/constants.js';

import { GenericService } from './GenericService.js';
import { Logger } from '../../lib/utils/logger.js';

import type { Request, Response } from 'express';

export const getItemByName = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, parent } = req.params;
  const actualParent = parent || 'generic';
  Logger.info(`Generic: getItemByName called: ${actualParent}/${name}`);

  if (!name) {
    Logger.info(
      `Generic: getItemByName -> invalid param: ${actualParent}/${name}`,
    );
    res.status(400).json({ error: RESPONSES.INVALID_PARAM });
    return;
  }

  const service = new GenericService();

  try {
    const response = await service.getItem(actualParent, name);
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

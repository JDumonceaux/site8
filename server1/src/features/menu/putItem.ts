import { Logger } from '../../utils/logger.js';
import { getPagesService, getMenuService } from '../../utils/ServiceFactory.js';

import type { MenuAdd } from '../../types/MenuAdd.js';
import type { Request, Response } from 'express';

export const putItem = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean | { error: string }>,
): Promise<void> => {
  const data = req.body as MenuAdd;

  Logger.info(`Menu: Put Items called: `);

  const service = getPagesService();
  const service2 = getMenuService();

  if (Object.keys(data).length === 0) {
    res.status(400).json({ error: 'No data found' });
    return;
  }

  // Get next id
  const idNew = (await service.getNextId()) ?? 0;
  if (!idNew || idNew === 0) {
    res.status(400).json({ error: 'Next Id not found.' });
    return;
  }

  try {
    const response = await service2.addItem({ ...data, id: idNew });
    if (response) {
      res.status(200).json(response);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    Logger.error('Menu: Put Item error:', error);
    res.sendStatus(500);
  }
};

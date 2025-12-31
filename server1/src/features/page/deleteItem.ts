import type { Request, Response } from 'express';

import { parseRequestId } from '../../utils/helperUtils.js';
import { Logger } from '../../utils/logger.js';
import {
  getPageFileService,
  getPageService,
} from '../../utils/ServiceFactory.js';

export const deleteItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.body;

  Logger.info(`Page: Delete Item called: ${id}`);

  if (!id) {
    res.status(400).json({ message: 'Invalid ID' } as unknown);
    return;
  }

  const { id: idNum, isValid } = parseRequestId(id.toString().trim());
  if (!isValid || typeof idNum !== 'number') {
    Logger.info(`Page: Delete Item -> invalid body id: ${id}`);
    res.status(400).json({ error: 'Invalid id' });
    return;
  }

  const service = getPageService();
  const fileService = getPageFileService();

  try {
    await Promise.all([
      Promise.try(() => service.deleteItem(idNum)),
      Promise.try(() => fileService.deleteFile(idNum)),
    ]);
    res.sendStatus(200);
  } catch (error) {
    Logger.info(
      `Page: Delete Item -> error deleting id ${idNum}: ${(error as Error).message}`,
    );
    res.sendStatus(500);
  }
};

import type { Request, Response } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import {
  getPageFileService,
  getPageService,
} from '../../lib/utils/ServiceFactory.js';

export const deleteItem = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  Logger.info(`Page: Delete Item called: ${id}`);

  const { id: idNum, isValid } = parseRequestId(id.trim());
  if (!isValid || typeof idNum !== 'number') {
    Logger.info(`Page: Delete Item -> invalid param id: ${id}`);
    res.status(400).json({ error: 'Invalid id' });
    return;
  }

  const service = getPageService();
  const fileService = getPageFileService();

  try {
    await Promise.all([
      service.deleteItem(idNum),
      fileService.deleteFile(idNum),
    ]);
    res.sendStatus(200);
  } catch (error) {
    Logger.info(
      `Page: Delete Item -> error deleting id ${idNum}: ${(error as Error).message}`,
    );
    res.sendStatus(500);
  }
};

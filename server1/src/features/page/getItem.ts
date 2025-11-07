import { PageService } from './PageService.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import { Logger } from '../../lib/utils/logger.js';

import type { PageText } from '../../types/PageText.js';
import type { Request, Response } from 'express';

export const getItem = async (
  req: Request,
  res: Response<PageText>,
): Promise<void> => {
  const { id } = req.params;

  Logger.info(`Page: Get Item called: ${id}`);

  if (!id) {
    res.status(400).json({ message: 'Invalid ID' } as unknown as PageText);
    return;
  }

  const { id: idNum, isValid } = parseRequestId(id.trim());
  if (!isValid || !idNum) {
    Logger.info(`pageRouter: get by id -> invalid param: ${id}`);
    // res.status(400).json({ error: Responses.INVALID_ID });
    return;
  }

  const service = new PageService();

  try {
    const response = await service.getItemCompleteById(idNum);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    Logger.error('Page: Get Item error:', error);
    res.sendStatus(500);
  }
};

import { Request, Response, NextFunction } from 'express';

import { PageService } from './PageService.js';
import { Logger } from '../../lib/utils/logger.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import { PageText } from '../../types/PageText.js';

export const getItem = async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response<PageText>,
  next: NextFunction,
) => {
  const { id } = req.params;

  Logger.info(`Page: Get Item called: ${id}`);

  const { id: idNum, isValid } = parseRequestId(id.trim());
  if (!isValid || !idNum) {
    Logger.info(`pageRouter: get by id -> invalid param: ${id}`);
    // res.status(400).json({ error: Responses.INVALID_ID });
    return;
  }

  const service = new PageService();

  await service
    .getItemCompleteById(idNum)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(204).send();
      }
    })
    .catch((error: Error) => {
      return next(error);
    });
};

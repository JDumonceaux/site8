import { Request, Response, NextFunction } from 'express';

import { PageService } from './PageService.js';
import { Logger } from '../../lib/utils/logger.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import { PageFileService } from './PageFileService.js';

export const deleteItem = async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response<boolean>,
  next: NextFunction,
) => {
  const { id } = req.params;

  Logger.info(`Page: Delete Item called: ${id}`);

  const { id: idNum, isValid } = parseRequestId(id.trim());
  if (!isValid || !idNum) {
    Logger.info(`Page: Delete Item -> invalid param id: ${id}`);
    //res.status(400).json({ error: Responses.INVALID_ID });
    return res.end();
  }

  const service = new PageService();
  const fileService = new PageFileService();
  await Promise.all([service.deleteItem(idNum), fileService.deleteFile(idNum)])
    .then((response) => {
      if (response) {
        //res.status(200).json(response);
      } else {
        res.json(response);
      }
    })
    .catch((error: Error) => {
      next(error);
    });
};

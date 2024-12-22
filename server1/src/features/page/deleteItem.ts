import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

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

  const service = ServiceFactory.getPageService();
  const fileService = ServiceFactory.getPageFileService();
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

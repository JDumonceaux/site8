import { Request, Response, NextFunction } from 'express';

import { PageService } from './PageService.js';
import { Logger } from '../../lib/utils/logger.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import { PageText } from '../../types/PageText.js';

interface IRequestParams {
  id: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestQuery {}

export const getItem = async (
  req: Request<IRequestParams, unknown, unknown, IRequestQuery>,
  res: Response<PageText>,
  next: NextFunction,
) => {
  const { id } = req.params;

  Logger.info(`Page: Get Item controller called: ${id}`);

  const { id: idNum, isValid } = parseRequestId(id.trim());
  if (!isValid || !idNum) {
    Logger.info(`pageRouter: get by id -> invalid param: ${id}`);
    //res.status(400).json({ error: Responses.INVALID_ID });
    return res.end();
  }

  const service = new PageService();

  await service
    .getItemCompleteById(idNum)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.json(response);
      }
    })
    .catch((error: Error) => {
      next(error);
    });
};

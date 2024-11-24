import { NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import { ImageService } from './ImageService.js';

interface IRequestParams {
  id: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestQuery {}

export const deleteItem = async (
  req: Express.Request,
  res: Express.Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  Logger.info(`Image: Delete Item called: ${id}`);

  const { id: idNum, isValid } = parseRequestId(id.trim());
  if (!isValid || !idNum) {
    Logger.info(`Image: Delete by id -> invalid param: ${id}`);
    //res.status(400).json({ error: Responses.INVALID_ID });
    return res.end();
  }

  const service = new ImageService();

  await service
    .getItem(idNum)
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

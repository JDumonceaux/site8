import { NextFunction, Request, Response } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import { ImageService } from './ImageService.js';
import { Image } from '../../types/Image.js';
import { Responses } from '../../lib/utils/constants.js';

export const deleteItem = async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response<Image | Error>,
  next: NextFunction,
) => {
  const { id } = req.params;

  Logger.info(`Image: Delete Item called: ${id}`);

  const { id: idNum, isValid } = parseRequestId(id.trim());
  if (!isValid || !idNum) {
    Logger.info(`Image: Delete invalid param -> id: ${id}`);
    res.status(400).send(new Error(Responses.INVALID_ID));
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

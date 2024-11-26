import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import { ImageService } from './ImageService.js';
import { Image } from '../../types/Image.js';
import { Responses } from '../../lib/utils/constants.js';

//import { Responses } from '../../lib/utils/constants.js';

// app.get('/users/:id', (req: Request<
//   { id: string }, // ParamsDictionary
//   any,            // req.body
//   any,            // req.locals
//   { page?: string }, // QueryString.ParsedQs
//   Record<string, any> // req.headers
// >, res: Response) => {

export const getItem = async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response<Image>,
  next: NextFunction,
) => {
  const { id } = req.params;

  Logger.info(`Image: Get Item called: ${id}`);

  const { id: idNum, isValid } = parseRequestId(id.trim());
  if (!isValid || !idNum) {
    Logger.info(`Image: Get Item -> invalid param id: ${id}`);
    next({ message: Responses.INVALID_ID });
    return;
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

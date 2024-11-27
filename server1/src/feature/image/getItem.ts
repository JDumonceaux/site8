import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ImageService } from './ImageService.js';
import { Image } from '../../types/Image.js';

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

  const tempId = Number.parseInt(id);

  const service = new ImageService();
  await service
    .getItem(tempId)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(204).send();
      }
    })
    .catch((error: Error) => {
      next(error);
    });
};

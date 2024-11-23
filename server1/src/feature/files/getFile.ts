import { NextFunction, Request, Response } from 'express';
import { Responses } from '..//../lib/utils/constants.js';
import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';
type Params = {
  filename: string;
};

const service = ServiceFactory.getFileService();

export const getFile = async (
  req: Request<Params>,
  res: Response<unknown>,
  next: NextFunction,
) => {
  Logger.debug(`Get File controller called`);
  const { filename } = req.params;

  await service
    .getFile(filename.trim() + '.json')
    .then((response: unknown) => {
      if (!response) {
        res.status(404).json({ message: Responses.NOT_FOUND });
      }
      res.status(200).json(response);
    })
    .catch((error: unknown) => {
      next(error);
    });
};

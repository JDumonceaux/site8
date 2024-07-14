import { NextFunction, Request, Response } from 'express';
import { ServiceFactory } from '../../../utils/ServiceFactory.js';

import { Responses } from '../../../utils/Constants.js';
import { Logger } from '../../../utils/Logger.js';

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
    .then((response) => {
      if (!response) {
        res.status(404).json({ message: Responses.NOT_FOUND });
      }
      res.status(200).json(response);
    })
    .catch((error: Error) => {
      next(error);
    });
};

import { NextFunction, Request, Response } from 'express';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';
import { Responses } from '../../lib/utils/constants.js';
import { Logger } from '../../lib/utils/logger.js';

type Params = {
  filename: string;
};

const service = ServiceFactory.getMenuService();

export const getMenu = async (
  req: Request<Params>,
  res: Response<unknown>,
  next: NextFunction,
) => {
  Logger.debug(`Get Menu called`);

  await service
    .getMenu()
    .then((response) => {
      if (!response) {
        res.status(404).json({ message: Responses.NOT_FOUND });
      }
      res.status(200).json(response);
    })
    .catch((error: unknown) => {
      next(error);
    });
};

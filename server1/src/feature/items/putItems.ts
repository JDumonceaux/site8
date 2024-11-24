import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { ItemsService } from './ItemsService.js';
import { Items } from '../../types/Items.js';
//import { PreferHeader } from '.../../../lib/utils/constants.js';

interface IRequestParams {
  id: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestQuery {}

export const putItems = async (
  req: Request<IRequestParams, unknown, unknown, IRequestQuery>,
  res: Response<Items>,
  next: NextFunction,
) => {
  //const Prefer = req.get('Prefer');
  //const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
  const data: Items | unknown = req.body;

  Logger.info(`Items: Put Items called: `);

  if (!data) {
    res.status(500);
  } else {
    const service = new ItemsService();

    await service
      .addItems(data)
      .then((_response) => {
        // if (response) {
        //   res.status(200).json(response);
        // } else {
        //   res.json(response);
        // }
      })
      .catch((error: Error) => {
        next(error);
      });
  }
};

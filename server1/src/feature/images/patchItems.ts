import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../lib/utils/logger.js';
import { Images } from '../../types/Images.js';
import { ImagesService } from './ImagesService.js';

//import { PreferHeader } from '.../../../lib/utils/constants.js';

interface IRequestParams {
  id: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestQuery {}

export const patchItems = async (
  req: Request<IRequestParams, unknown, unknown, IRequestQuery>,
  res: Response<Images>,
  next: NextFunction,
) => {
  //const Prefer = req.get('Prefer');
  //const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
  const data: Images | unknown = req.body;

  Logger.info(`Images: Patch Images called: `);

  if (!data) {
    res.status(500);
  } else {
    const service = new ImagesService();

    const ret = await service
      .updateItems(data.items)
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

  // if (returnRepresentation) {
  //   const ret = await service.getItem(id);
  //   // 201 Created
  //   res.status(201).json(ret);
  // } else {
  //   res.status(201).json({ results: Responses.SUCCESS });
  // }
};

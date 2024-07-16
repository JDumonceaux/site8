import express, { Request, Response } from 'express';

import { PhotosService } from '../services/PhotosService.js';
import { Responses } from '../utils/Constants.js';
import { Logger } from '../utils/Logger.js';

export const photosRouter = express.Router();

photosRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const service = new PhotosService();
    const ret = await service.getItems();

    if (!ret) {
      res.status(404).json({ message: Responses.NOT_FOUND });
      return res.end();
    }
    res.status(200).json(ret);
  } catch (error) {
    Logger.error(`photosRouter: get -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

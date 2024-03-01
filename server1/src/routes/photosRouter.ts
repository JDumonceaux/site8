import express, { Request, Response } from 'express';

import { Logger } from '../utils/Logger.js';
import { PhotosService } from '../services/PhotosService.js';

export const photosRouter = express.Router();

photosRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const service = new PhotosService();
    const data = await service.getItems();
    res.json(data);
  } catch (error) {
    Logger.error(`photosouter: get -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

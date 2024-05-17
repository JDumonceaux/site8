import express, { Request, Response } from 'express';

import { Logger } from '../utils/Logger.js';
import { ImagesService } from '../services/ImagesService.js';
import { ImagesFileService } from '../services/ImagesFileService.js';

export const imagesRouter = express.Router();

imagesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const images = await new ImagesService().getItems();
    res.json(images);
  } catch (error) {
    Logger.error(`imagesRouter: get -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

imagesRouter.get('/scan', async (_req: Request, res: Response) => {
  try {
    const images = await new ImagesFileService().getItems();
    res.json(images);
  } catch (error) {
    Logger.error(`imagesRouter: get -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

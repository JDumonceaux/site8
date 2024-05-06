import express, { Request, Response } from 'express';

import { Logger } from '../utils/Logger.js';
import { ImageService } from '../services/ImageService.js';

export const imagesRouter = express.Router();

imagesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const images = await new ImageService().getItems();
    res.json(images);
  } catch (error) {
    Logger.error(`imagesRouter: get -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

import express, { Request, Response } from 'express';

import { ImageEdit } from 'types/ImageEdit.js';
import { ImagesFileService } from '../services/ImagesFileService.js';
import { ImagesService } from '../services/ImagesService.js';
import { Logger } from '../utils/Logger.js';

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
    const images = await new ImagesFileService().getMatchedItems();
    res.json(images);
  } catch (error) {
    Logger.error(`imagesRouter: scan -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

imagesRouter.get('/folders', async (_req: Request, res: Response) => {
  try {
    const folders = await new ImagesFileService().getFolders();
    res.json(folders);
  } catch (error) {
    Logger.error(`imagesRouter: scan -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Scan the 'sort' directory for new items and load into images.json
imagesRouter.get('/new', async (_req: Request, res: Response) => {
  try {
    const images = await new ImagesService().loadNewItems();
    res.json(images);
  } catch (error) {
    Logger.error(`imagesRouter: new -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

imagesRouter.get('/fix-file-names', async (_req: Request, res: Response) => {
  try {
    //const ret = await new ImagesFileService().fixNames();
    const ret = true;
    res.json(ret);
  } catch (error) {
    Logger.error(`imagesRouter: fixNames -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

imagesRouter.get('/fix-index', async (_req: Request, res: Response) => {
  try {
    //const ret = await new ImagesService().fixNames();
    const ret = true;
    res.json(ret);
  } catch (error) {
    Logger.error(`imagesRouter: fixNames -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

imagesRouter.get('/list-duplicates', async (_req: Request, res: Response) => {
  try {
    //const ret = await new ImagesService().listDuplicates();
    const ret = true;
    res.json(ret);
  } catch (error) {
    Logger.error(`imagesRouter: listDuplicates -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

imagesRouter.patch('/', async (req: Request, res: Response) => {
  try {
    const items: ImageEdit[] = req.body;

    const ret = await new ImagesService().updateItems(items);
    res.json(ret);
  } catch (error) {
    Logger.error(`imagesRouter: patch -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

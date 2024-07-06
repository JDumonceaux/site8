import express, { Request, Response } from 'express';

import { ImagesEdit } from 'types/ImagesEdit.js';
import { Errors } from 'utils/Constants.js';
import { ImagesFileService } from '../services/ImagesFileService.js';
import { ImagesService } from '../services/ImagesService.js';
import { Logger } from '../utils/Logger.js';

export const imagesRouter = express.Router();

imagesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    // Get all records from images.json
    const images = await new ImagesService().getItems();
    images
      ? res.status(200).json(images)
      : res.status(204).json({ error: Errors.NO_CONTENT });
  } catch (error) {
    Logger.error(`imagesRouter: get -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Get all images from the 'sort' folder that need to be categorized
imagesRouter.get('/file', async (_req: Request, res: Response) => {
  try {
    const images = await new ImagesService().getItemsToFile();
    images
      ? res.status(200).json(images)
      : res.status(204).json({ error: Errors.NO_CONTENT });
  } catch (error) {
    Logger.error(`imagesRouter: get -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

imagesRouter.get('/scan', async (_req: Request, res: Response) => {
  try {
    const images = await new ImagesFileService().getNewItems();
    images
      ? res.status(200).json(images)
      : res.status(204).json({ error: Errors.NO_CONTENT });
  } catch (error) {
    Logger.error(`imagesRouter: scan -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

imagesRouter.get('/folders', async (_req: Request, res: Response) => {
  try {
    const folders = await new ImagesFileService().getFolders();
    folders
      ? res.status(200).json(folders)
      : res.status(204).json({ error: Errors.NO_CONTENT });
  } catch (error) {
    Logger.error(`imagesRouter: scan -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Scan the 'sort' directory for new items and load into images.json
imagesRouter.get('/new', async (_req: Request, res: Response) => {
  try {
    const images = await new ImagesService().loadNewItems();
    images
      ? res.status(200).json(images)
      : res.status(204).json({ error: Errors.NO_CONTENT });
  } catch (error) {
    Logger.error(`imagesRouter: new -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

imagesRouter.get('/fix-file-names', async (_req: Request, res: Response) => {
  try {
    const ret = await new ImagesFileService().fixNames();
    ret
      ? res.status(200).send('Done')
      : res.status(500).json({ error: Errors.SERVER_ERROR });
    //const ret = "Not implemented";
    //res.status(501).json(ret);
  } catch (error) {
    Logger.error(`imagesRouter: fixFileNames -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

imagesRouter.get('/fix-index', async (_req: Request, res: Response) => {
  try {
    const ret = await new ImagesService().fixNames();
    ret
      ? res.status(200).send('Done')
      : res.status(500).json({ error: Errors.SERVER_ERROR });
  } catch (error) {
    Logger.error(`imagesRouter: fixIndex -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

imagesRouter.get('/list-duplicates', async (_req: Request, res: Response) => {
  try {
    const ret = await new ImagesService().listDuplicates();
    ret
      ? res.status(200).send('Done')
      : res.status(500).json({ error: Errors.SERVER_ERROR });
    //const ret = "Not implemented";
    //res.status(501).json(ret);
  } catch (error) {
    Logger.error(`imagesRouter: listDuplicates -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

imagesRouter.get('/sync', async (_req: Request, res: Response) => {
  try {
    const images = await new ImagesService().syncItems();
    images
      ? res.status(200).json(images)
      : res.status(204).json({ error: Errors.NO_CONTENT });
  } catch (error) {
    Logger.error(`imagesRouter: get -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

imagesRouter.patch('/', async (req: Request, res: Response) => {
  try {
    const data: ImagesEdit = req.body;
    const ret = await new ImagesService().updateItems(data.items);
    ret
      ? res.status(200).send('Updated')
      : res.status(500).json({ error: Errors.SERVER_ERROR });
  } catch (error) {
    Logger.error(`imagesRouter: patch -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

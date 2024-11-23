import express, { Request, Response } from 'express';

import { Errors, PreferHeader, Responses } from '../lib/utils/constants.js';
import { parseRequestId } from '../lib/utils/helperUtils.js';
import { Logger } from '../lib/utils/logger.js';
import { ImageService } from '../feature/image/ImageService.js';
import { ImagesService } from '../feature/images/ImagesService.js';
import { Image } from '../types/Image.js';

export const imageRouter = express.Router();

imageRouter.get('/id', async (req: Request, res: Response) => {
  Logger.info(`imageRouter: get Id->`);

  try {
    const { id, isValid } = parseRequestId(req.params.id);
    if (!isValid || !id) {
      return res.status(400).json({ error: Responses.INVALID_ID });
    }

    const images = await new ImagesService().getItems();
    const ret = images?.items?.find((x) => x.id === id);
    if (!ret) {
      return res.status(404).json({ message: Responses.NOT_FOUND });
    }
    res.status(200).json(ret);
  } catch (error) {
    Logger.error(`imageRouter: get -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Add new item
imageRouter.post('/', async (req: Request, res: Response) => {
  Logger.info(`imageRouter: post ->`);

  try {
    const Prefer = req.get('Prefer');
    const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
    const service = new ImageService();
    const data: Image = req.body;

    // Add item
    const id = await service.addItem(data);

    // Return the new item
    if (returnRepresentation) {
      const ret = await service.getItem(id);
      // 201 Created
      res.status(201).json(ret);
    } else {
      res.status(201).json({ results: Responses.SUCCESS });
    }
  } catch (error) {
    Logger.error(`imageRouter: post -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Update Item
imageRouter.patch('/', async (req: Request, res: Response) => {
  Logger.info(`imageRouter: patch ->`);

  try {
    const Prefer = req.get('Prefer');
    const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
    const service = new ImageService();
    const data: Image = req.body;

    const id = await service.updateItem(data);

    // Return the new item
    if (returnRepresentation) {
      const ret = await service.getItem(id);
      // 201 Created
      res.status(201).json(ret);
    } else {
      // 200 OK
      // 204 No Content
      res.status(200).json({ results: 'Success' });
    }
  } catch (error) {
    Logger.error(`imageRouter: patch -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

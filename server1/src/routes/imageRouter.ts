import express, { Request, Response } from 'express';

import { Logger } from '../utils/Logger.js';
import { PreferHeader, Responses, Errors } from '../utils/Constants.js';
import { Image } from '../types/Image.js';
import { ImageService } from '../services/ImageService.js';

export const imageRouter = express.Router();

// Add new item
imageRouter.post('/', async (req: Request, res: Response) => {
  Logger.info(`imageRouter: post ->`);
  const Prefer = req.get('Prefer');
  const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
  const service = new ImageService();
  const data: Image = req.body;

  try {
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
  const Prefer = req.get('Prefer');
  const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
  const service = new ImageService();
  const data: Image = req.body;

  try {
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

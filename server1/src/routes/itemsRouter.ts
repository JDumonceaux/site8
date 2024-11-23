import express, { Request, Response } from 'express';
import { Errors } from '../lib/utils/constants.js';
import { Logger } from '../lib/utils/logger.js';
import { ItemsService } from '../feature/items/ItemsService.js';
import { ItemsEdit } from '../types/ItemsEdit.js';

export const itemsRouter = express.Router();

itemsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    // Get all records from items.json
    const items = await new ItemsService().getItems();
    if (items) {
      res.status(200).json(items);
    } else {
      res.status(204).json({ error: Errors.NO_CONTENT });
    }
  } catch (error) {
    Logger.error(`itemsRouter: get -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

itemsRouter.get('/edit', async (_req: Request, res: Response) => {
  try {
    const items = await new ItemsService().getEditItems();
    if (items) {
      res.status(200).json(items);
    } else {
      res.status(204).json({ error: Errors.NO_CONTENT });
    }
  } catch (error) {
    Logger.error(`itemsRouter: get -> edit. Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Get all items from the 'sort' folder that need to be categorized
itemsRouter.patch('/', async (req: Request, res: Response) => {
  try {
    const data: ItemsEdit = req.body;
    const ret = await new ItemsService().updateItems(data.items);
    if (ret) {
      res.status(200).send('Updated');
    } else {
      res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  } catch (error) {
    Logger.error(`itemsRouter: patch -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

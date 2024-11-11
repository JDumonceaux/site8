import express, { Request, Response } from 'express';
import { Errors, Responses } from 'lib/utils/constants.js';
import { Logger } from 'lib/utils/logger.js';
import { MenuService } from '../services/MenuService.js';
import { PagesService } from '../services/PagesService.js';
import { MenuAdd } from '../types/MenuAdd.js';
import { MenuEdit } from '../types/MenuEdit.js';

export const menuRouter = express.Router();

menuRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const ret = await new MenuService().getMenu();
    if (ret) {
      res.status(200).json(ret);
    } else {
      res.status(204).json({ error: Errors.NO_CONTENT });
    }
  } catch (error) {
    Logger.error(`menuRouter: get -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

menuRouter.get('/edit', async (_req: Request, res: Response) => {
  try {
    const ret = await new MenuService().getMenu();
    if (ret) {
      res.status(200).json(ret);
    } else {
      res.status(204).json({ error: Errors.NO_CONTENT });
    }
  } catch (error) {
    Logger.error(`menuRouter: get Edit -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Add item
menuRouter.post('/', async (req: Request, res: Response) => {
  Logger.info(`menuRouter: post ->`);

  try {
    const service = new PagesService();
    const service2 = new MenuService();
    const item: MenuAdd = req.body;
    if (!item) {
      res.status(400).json({ error: 'No data found' });
    }

    // Get next id
    const idNew = (await service.getNextId()) ?? 0;
    if (!idNew || idNew === 0) {
      res.status(400).json({ error: 'Next Id not found.' });
    }

    const ret = await service2.addItem({ ...item, id: idNew });
    if (ret) {
      res.status(201).json({ message: Responses.SUCCESS });
    } else {
      res.status(400).json({ error: 'Error adding item' });
    }
  } catch (error) {
    Logger.error(`menuRouter: post -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Update Item
menuRouter.patch('/', async (req: Request, res: Response) => {
  Logger.info(`menuRouter: patch ->`);

  try {
    const item: MenuEdit[] = req.body;
    if (!item) {
      res.status(400).json({ error: 'No data found' });
      return res.end();
    }

    await new PagesService().updateItems(item);
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    Logger.error(`menuRouter: patch -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

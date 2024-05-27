import express, { Request, Response } from 'express';

import { Logger } from '../utils/Logger.js';
import { MenuService } from '../services/MenuService.js';

export const menuRouter = express.Router();

menuRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const ret = await new MenuService().getMenu();
    if (!ret) {
      res.status(204).json({ error: 'No content found' });
    }

    res.status(200).json(ret);
  } catch (error) {
    Logger.error(`menuRouter: get -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

menuRouter.get('/values', async (_req: Request, res: Response) => {
  try {
    const ret = await new MenuService().getMenuValues();
    if (!ret) {
      res.status(204).json({ error: 'No content found' });
    }

    res.status(200).json(ret);
  } catch (error) {
    Logger.error(`menuRouter: getValues -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

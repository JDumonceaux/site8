import express, { Request, Response } from 'express';

import { Logger } from '../utils/Logger.js';
import { MenuService } from '../services/MenuService.js';

export const menuRouter = express.Router();

menuRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const service = new MenuService();
    const menus = await service.getMenus();
    res.json(menus);
  } catch (error) {
    Logger.error(`menuRouter: get -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

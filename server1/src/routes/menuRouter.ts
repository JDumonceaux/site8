import express, { Request, Response } from 'express';
import { Logger } from '../utils/Logger.js';
import { MenuService } from '../services/MenuService.js';
import { MenuUpdate } from '../types/MenuUpdate.js';
import { Errors, Responses } from '../utils/Constants.js';
import { PagesService } from '../services/PagesService.js';
import { MenuItem } from '../types/MenuItem.js';

export const menuRouter = express.Router();

menuRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const ret = await new MenuService().getMenu();
    if (ret) {
      res.status(200).json(ret);
    } else {
      res.status(204).json({ error: 'No content found' });
    }
  } catch (error) {
    Logger.error(`menuRouter: get -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

menuRouter.get('/edit', async (_req: Request, res: Response) => {
  try {
    const ret = await new MenuService().getMenu();

    if (ret) {
      res.status(200).json(ret);
    } else {
      res.status(204).json({ error: 'No content found' });
    }
  } catch (error) {
    Logger.error(`menuRouter: get Edit -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

menuRouter.get('/abbr', async (_req: Request, res: Response) => {
  try {
    const ret = await new MenuService().getMenuAbbr();
    if (ret) {
      res.status(200).json(ret);
    } else {
      res.status(204).json({ error: 'No content found' });
    }
  } catch (error) {
    Logger.error(`menuRouter: getAbbr -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add item
menuRouter.post('/', async (req: Request, res: Response) => {
  Logger.debug(`menuRouter: post ->`);

  try {
    const service = new PagesService();
    const data: MenuItem = req.body;

    // Get next id
    const idNew = (await service.getNextId()) ?? 0;
    if (!idNew || idNew === 0) {
      res.status(400).json({ error: 'Next Id not found.' });
    }

    // await Promise.all([service.addMenuItem({ ...data, id: idNew })]);
    res.status(201).json({ message: Responses.SUCCESS });
  } catch (error) {
    Logger.error(`menuRouter: post -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Update Item
menuRouter.patch('/', async (req: Request, res: Response) => {
  Logger.debug(`menuRouter: patch ->`);

  try {
    const data: MenuUpdate = req.body;

    // if (data && data.menus) {
    //   const service = new PagesService();
    //   await service.updateMenuItems(data.menus);
    // }
    // if (data && data.pages) {
    //   const service = new PageService();
    //   await service.updateMenuItems(data.menus);
    // }

    // Return the new item
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    Logger.error(`menuRouter: patch -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

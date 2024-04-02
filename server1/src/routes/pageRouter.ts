import express, { Request, Response } from 'express';
import { PagesService } from '../services/PagesService.js';
import { PageService } from '../services/PageService.js';
import { Page } from '../types/Page.js';
import { Errors } from '../utils/Constants.js';
import { Logger } from '../utils/Logger.js';

export const pageRouter = express.Router();

// Get item
pageRouter.get('/:id', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: get ->`);

  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const item = await new PageService().getAllData(id);
    res.json(item);
  } catch (error) {
    Logger.error(`pageRouter: get -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Update Item
pageRouter.patch('/', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: patch ->`);
  const service = new PagesService();
  const service2 = new PageService();
  const data: Page = req.body;

  try {
    await Promise.all([service.updateItem(data), service2.updateItem(data)]);
    res.json({ results: 'Success' });
  } catch (error) {
    Logger.error(`pageRouter: patch -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Delete Item
pageRouter.delete('/:id', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: delete ->`);

  const service = new PagesService();
  const service2 = new PageService();
  const id = parseInt(req.params.id);
  if (isNaN(id) || id === 0) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    await Promise.all([service.deleteItem(id), service2.deleteItem(id)]);
    res.json({ results: 'Success' });
  } catch (error) {
    Logger.error(`pageRouter: delete -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Add new item
pageRouter.post('/', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: post ->`);
  const service = new PagesService();
  const service2 = new PageService();
  const data: Page = req.body;

  try {
    const nextId = await service.getNextId();
    Logger.info('nextId', nextId);
    if (!nextId) {
      res.status(500).json({ error: 'Next Id not found.' });
    } else {
      const results = await Promise.allSettled([
        service.addItem({ ...data, id: nextId }),
        service2.addItem({ ...data, id: nextId }),
      ]);
      Logger.info('results', results);
      res.json({ results: 'Success' });
    }
  } catch (error) {
    Logger.error(`pageRouter: post -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

import express, { Request, Response } from 'express';
import { PagesIndexService } from '../services/PagesIndexService.js';
import { PageService } from '../services/PageService.js';
import { Page } from '../types/Page.js';
import { Errors } from '../utils/Constants.js';
import { Logger } from '../utils/Logger.js';

export const pageRouter = express.Router();

// Get item
pageRouter.get('/:id', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: get -> `);

  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const item = await new PageService().getAllData(id);
    res.json(item);
  } catch (error) {
    Logger.error(`pageRouter: get -> ${error}`);
    if (error instanceof Error) {
      if (error.message.includes('ENOENT')) {
        res.status(404).json({ error: Errors.FILE_NOT_FOUND });
      } else {
        res.status(500).json({ error: Errors.SERVER_ERROR });
      }
    }
  }
});

// Delete Item
pageRouter.delete('/:id', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: delete ->`);

  const service = new PagesIndexService();
  const pageService = new PageService();
  const id = parseInt(req.params.id);
  if (isNaN(id) || id === 0) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    await Promise.all([service.deleteItem(id), pageService.deleteItem(id)]);
    res.json({ results: 'Success' });
  } catch (error) {
    Logger.error(`pageRouter: delete -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Add new item
pageRouter.post('/', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: post ->`);
  const Prefer = req.headers['Prefer'];
  const returnRepresentation = Prefer === 'return=representation';
  const service = new PagesIndexService();
  const pageService = new PageService();
  const data: Page = req.body;

  try {
    // Get the next id to insert
    const nextId = await service.getNextId();
    Logger.info('nextId', nextId);
    if (!nextId) {
      res.status(400).json({ error: 'Next Id not found.' });
    } else {
      await service.addItem({ ...data, id: nextId }, true);
      await pageService.addItem(nextId, data.text);

      // Return the new item
      if (returnRepresentation) {
        const result = await service.getMetaData(nextId);
        res.json(result);
      }
    }
  } catch (error) {
    Logger.error(`pageRouter: post -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Update Item
pageRouter.patch('/', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: patch ->`);
  const Prefer = req.headers['Prefer'];
  const returnRepresentation = Prefer === 'return=representation';
  const service = new PagesIndexService();
  const pageService = new PageService();
  const data: Page = req.body;

  try {
    await service.updateItem(data, true);
    await pageService.updateItem(data.id, data.text);

    // Return the new item
    if (returnRepresentation) {
      const result = await service.getMetaData(data.id);
      res.json(result);
    }
  } catch (error) {
    Logger.error(`pageRouter: patch -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

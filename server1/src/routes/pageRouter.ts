import express, { Request, Response } from 'express';
import { PagesService } from '../services/PagesService.js';
import { PageService } from '../services/PageService.js';
import { Page } from '../types/Page.js';
import { Errors, PreferHeader, Responses } from '../utils/Constants.js';
import { Logger } from '../utils/Logger.js';
import { Pages } from '../types/Pages.js';

export const pageRouter = express.Router();

// Get item
pageRouter.get('/:id', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: get -> `);

  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: Responses.INVALID_ID });
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

pageRouter.get('/:id/:action', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: get Id Action ->`);

  try {
    const pages: Pages | undefined = await new PagesService().getItems();
    const action = req.params.action;
    const items = pages?.pages;

    const find = () => {
      if (items) {
        const currIndex = items.findIndex(
          (x) => x.id > parseInt(req.params.id),
        );
        switch (action) {
          case 'first':
            return items.at(0);
          case 'next':
            return items.at(currIndex + 1);
          case 'prev':
            return items.at(currIndex - 1);
          case 'last':
            return items.at(-1);
          default:
            return undefined;
        }
      }
    };
    const ret = find();
    res.json(ret);
  } catch (error) {
    Logger.error(`pageRouter: get -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Delete Item
pageRouter.delete('/:id', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: delete ->`);

  const service = new PagesService();
  const pageService = new PageService();
  const id = parseInt(req.params.id);
  if (isNaN(id) || id === 0) {
    return res.status(400).json({ error: Responses.INVALID_ID });
  }

  try {
    await Promise.all([service.deleteItem(id), pageService.deleteItem(id)]);
    res.status(204).json({ results: Responses.SUCCESS });
  } catch (error) {
    Logger.error(`pageRouter: delete -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Add new item
pageRouter.post('/', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: post ->`);
  const Prefer = req.get('Prefer');
  const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
  const service = new PagesService();
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
        const result = await pageService.getAllData(nextId.toString());
        // 201 Created
        res.status(201).json(result);
      } else {
        res.status(201).json({ results: Responses.SUCCESS });
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
  const Prefer = req.get('Prefer');
  const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
  const service = new PagesService();
  const pageService = new PageService();
  const data: Page = req.body;

  try {
    await service.updateItem(data, true);
    await pageService.updateItem(data.id, data.text);
    // Return the new item
    if (returnRepresentation) {
      const result = await pageService.getAllData(data.id.toString());
      res.status(200).json(result);
    } else {
      // 200 OK
      // 204 No Content
      res.status(200).json({ results: 'Success' });
    }
  } catch (error) {
    Logger.error(`pageRouter: patch -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

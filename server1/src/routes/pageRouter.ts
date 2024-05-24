import express, { Request, Response } from 'express';
import { PageService } from '../services/PageService.js';
import { PageFileService } from '../services/PageFileService.js';
import { Page } from '../types/Page.js';
import { Errors, PreferHeader, Responses } from '../utils/Constants.js';
import { Logger } from '../utils/Logger.js';
import { Pages } from '../types/Pages.js';
import { getRequestIdAsNumeric } from '../utils/helperUtils.js';

export const pageRouter = express.Router();

// Get item
pageRouter.get('/:id', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: get -> `);

  try {
    const { id, isValid } = getRequestIdAsNumeric(req.params.id);
    if (!isValid) {
      return res.status(400).json({ error: Responses.INVALID_ID });
    }

    const ret = await new PageService().getItemComplete(id);
    res.json(ret);
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

// Add new item
pageRouter.post('/', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: post ->`);

  try {
    const Prefer = req.get('Prefer');
    const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
    const service = new PageService();
    const fileService = new PageFileService();
    const data: Page = req.body;

    // Get next id
    const idNew = (await service.getNextId()) ?? 0;

    if (!idNew || idNew === 0) {
      res.status(400).json({ error: 'Next Id not found.' });
    }

    await Promise.all([
      service.addItem(data, idNew),
      fileService.addFile(idNew, data.text),
    ]);

    // Return the new item
    if (returnRepresentation) {
      const ret = await new PageService().getItemComplete(idNew);
      // 201 Created
      res.status(201).json(ret);
    } else {
      res.status(201).json({ results: Responses.SUCCESS });
    }
  } catch (error) {
    Logger.error(`pageRouter: post -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Update Item
pageRouter.patch('/', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: patch ->`);

  try {
    const Prefer = req.get('Prefer');
    const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
    const service = new PageService();
    const fileService = new PageFileService();
    const data: Page = req.body;

    await Promise.all([
      service.updateItem(data, false),
      fileService.updateFile(data.id, data.text),
    ]);

    // Return the new item
    if (returnRepresentation) {
      const ret = await new PageService().getItemComplete(data.id);
      res.status(201).json(ret);
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

// Delete Item
pageRouter.delete('/:id', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: delete ->`);

  try {
    const { id, isValid } = getRequestIdAsNumeric(req.params.id);
    if (!isValid) {
      return res.status(400).json({ error: Responses.INVALID_ID });
    }

    const service = new PageService();
    const fileService = new PageFileService();
    await Promise.all([service.deleteItem(id), fileService.deleteFile(id)]);
    res.status(204).json({ results: Responses.SUCCESS });
  } catch (error) {
    Logger.error(`pageRouter: delete -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Get first, next, prev, last item
pageRouter.get('/:id/:action', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: get Id Action ->`);

  try {
    const { id, isValid } = getRequestIdAsNumeric(req.params.id);
    if (!isValid) {
      return res.status(400).json({ error: Responses.INVALID_ID });
    }

    const pages: Pages | undefined = await new PageService().getItems();
    const action = req.params.action;
    const items = pages?.items;

    const find = () => {
      if (items) {
        const currIndex = items.findIndex((x) => x.id > id);
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

pageRouter.get('/:id', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: get -> `);

  try {
    const { id, isValid } = getRequestIdAsNumeric(req.params.id);
    if (!isValid) {
      return res.status(400).json({ error: Responses.INVALID_ID });
    }

    const ret = await Promise.all([
      await new PageService().getItem(id),
      await new PageFileService().getFile(id),
    ]);

    const [item, itemText] = ret;
    if (!item) {
      return res.status(404).json({ error: Errors.ITEM_NOT_FOUND });
    }

    res.json({ ...item, text: itemText });
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

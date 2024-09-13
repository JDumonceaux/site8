import DOMPurify from 'dompurify';
import express, { Request, Response } from 'express';
import PageController from '../controllers/pageController.js';
import { Errors, RegEx, Responses } from '../lib/utils/constants.js';
import { parseRequestId } from '../lib/utils/helperUtils.js';
import { Logger } from '../lib/utils/logger.js';
import { PageFileService } from '../services/PageFileService.js';
import { PageService } from '../services/PageService.js';
import { PagesService } from '../services/PagesService.js';
import { PageEdit } from '../types/PageEdit.js';

export const pageRouter = express.Router();

pageRouter.get('/welcome/hello-world', PageController.helloWorld);

// Get item
pageRouter.get('/:id', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: get by Id -> `);

  try {
    const { id, isValid } = parseRequestId(req.params.id.trim());
    if (!isValid || !id) {
      Logger.info(`pageRouter: get by id -> invalid param: ${id}`);
      res.status(400).json({ error: Responses.INVALID_ID });
      return res.end();
    }
    const ret = await new PageService().getItemCompleteById(id);
    if (ret) {
      res.status(200).json(ret);
    } else {
      res.status(404).json({ message: `Item not found: ${id}` });
    }
  } catch (error) {
    Logger.error(`pageRouter: get Id -> ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Get item
pageRouter.get('/name/:name', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: get by name -> `);

  try {
    const name = req.params.name.trim();
    if (!name.match(RegEx.ALPHANUMERIC_PLUS)) {
      Logger.info(`pageRouter: get by name -> invalid param: ${name}`);
      return res.status(400).json({ error: Responses.INVALID_PARAM });
    }

    const ret = await new PageService().getItemCompleteByName(name);
    if (ret) {
      res.status(200).json(ret);
    } else {
      res.status(404).json({ message: `Item not found: ${id}` });
    }
  } catch (error) {
    Logger.error(`pageRouter: get name -> ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Add item
pageRouter.post('/', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: post ->`);

  try {
    const service = new PageService();
    const service2 = new PagesService();
    const fileService = new PageFileService();
    const item: PageEdit = req.body;

    const itemClean: PageEdit = {
      ...item,
      id: item.id,
      name: DOMPurify.sanitize(item.name),
      title: DOMPurify.sanitize(item.title),
      text: DOMPurify.sanitize(item.text, { USE_PROFILES: { html: true } }),
      to: DOMPurify.sanitize(item.to),
      url: DOMPurify.sanitize(item.url),
    };

    // Get next id
    const idNew = (await service2.getNextId()) ?? 0;
    if (!idNew || idNew === 0) {
      res.status(400).json({ error: 'Next Id not found.' });
    }

    const updateFile =
      typeof itemClean.text === 'string' && itemClean.text.length > 0;
    const promise1 = service.addItem({ ...itemClean, id: idNew });
    const promise2 = fileService.addFile(idNew, itemClean.text);
    const promises = updateFile ? [promise1, promise2] : [promise1];

    const results = await Promise.allSettled(promises);
    // Use a for loop so you can break out.  You may not be able to break other loops.
    for (const result of results) {
      if (result.status !== 'fulfilled') {
        Logger.error(
          `pageRouter: post -> Error: ${result.status} - ${result.reason}`,
        );
        res.status(400).json({ error: result.reason });
        res.end();
      }
    }

    const ret = await new PageService().getItemCompleteById(idNew);
    // 201 Created
    res.status(201).json(ret);
  } catch (error) {
    Logger.error(`pageRouter: post -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Update Item
pageRouter.patch('/', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: patch ->`);

  try {
    // const Prefer = req.get('Prefer');
    // const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
    const service = new PageService();
    const fileService = new PageFileService();
    const item: PageEdit = req.body;

    const isValid = !Number.isNaN(item.id) && item.id !== 0;
    if (!isValid) {
      return res.status(400).json({ error: Responses.INVALID_ID });
    }

    const updateFile = typeof item.text === 'string' && item.text.length > 0;
    const promise1 = service.updateItem(item);
    const promise2 = fileService.updateFile(item.id, item.text);
    const promises = updateFile ? [promise1, promise2] : [promise1];

    const results = await Promise.allSettled(promises);
    // Use a for loop so you can break out.  You may not be able to break other loops.
    for (const result of results) {
      if (result.status !== 'fulfilled') {
        Logger.error(
          `pageRouter: patch -> Error: ${result.status} - ${result.reason}`,
        );
        res.status(400).json({ error: result.reason });
        res.end();
      }
    }

    // Return the updated item
    const ret = await new PageService().getItemCompleteById(item.id);
    res.status(200).json(ret);
  } catch (error) {
    Logger.error(`pageRouter: patch -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Delete Item
pageRouter.delete('/:id', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: delete ->`);

  try {
    const { id, isValid } = parseRequestId(req.params.id.trim());
    if (!isValid || !id) {
      Logger.info(`pageRouter: get by name -> invalid param: ${id}`);
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
    const { id, isValid } = parseRequestId(req.params.id.trim());
    if (!isValid || !id) {
      Logger.info(`pageRouter: get by name -> invalid param: ${id}`);
      return res.status(400).json({ error: Responses.INVALID_ID });
    }

    // const pages: Pages | undefined = await new PageService().getItems();
    // const action = req.params.action;
    // const items = pages?.items;

    // const find = () => {
    //   if (items) {
    //     const currIndex = items.findIndex((x) => x.id > id);
    //     switch (action) {
    //       case 'first':
    //         return items.at(0);
    //       case 'next':
    //         return items.at(currIndex + 1);
    //       case 'prev':
    //         return items.at(currIndex - 1);
    //       case 'last':
    //         return items.at(-1);
    //       default:
    //         return undefined;
    //     }
    //   }
    // };
    // const ret = find();
    res.json(null);
  } catch (error) {
    Logger.error(`pageRouter: get -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

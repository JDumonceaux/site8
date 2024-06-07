import express, { Request, Response } from 'express';
import { PageService } from '../services/PageService.js';
import { PageFileService } from '../services/PageFileService.js';
import { Page } from '../types/Page.js';
import { Errors, PreferHeader, RegEx, Responses } from '../utils/Constants.js';
import { Logger } from '../utils/Logger.js';
import { getRequestIdAsNumeric } from '../utils/helperUtils.js';
import { PagesService } from '../services/PagesService.js';

export const pageRouter = express.Router();

// Get item
pageRouter.get('/:id', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: get by Id -> `);

  try {
    const { id, isValid } = getRequestIdAsNumeric(req.params.id.trim());
    if (!isValid) {
      Logger.info(`pageRouter: get by id -> invalid param: ${id}`);
      return res.status(400).json({ error: Responses.INVALID_ID });
    }
    const ret = await new PageService().getItemCompleteById(id);
    ret
      ? res.status(200).json(ret)
      : res.status(404).json({ message: `Item not found: ${id}` });
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
    ret
      ? res.status(200).json(ret)
      : res.status(404).json({ message: `Item not found: ${name}` });
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
    const fileService = new PageFileService();
    const data: Page = req.body;

    // Get next id
    const idNew = (await new PagesService().getNextId()) ?? 0;

    if (!idNew || idNew === 0) {
      res.status(400).json({ error: 'Next Id not found.' });
    }

    await Promise.all([
      service.addItem({ ...data, id: idNew }),
      fileService.addFile(idNew, data.text),
    ]);

    const ret = await service.getItemCompleteById(idNew);
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
      const ret = await new PageService().getItemCompleteById(data.id);
      res.status(201).json(ret);
    } else {
      res.status(200).json({ message: 'Success' });
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
    const { id, isValid } = getRequestIdAsNumeric(req.params.id.trim());
    if (!isValid) {
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
    const { id, isValid } = getRequestIdAsNumeric(req.params.id.trim());
    if (!isValid) {
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

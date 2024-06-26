import express, { Request, Response } from 'express';
import { PageEdit } from 'types/PageEdit.js';
import { PageFileService } from '../services/PageFileService.js';
import { PageService } from '../services/PageService.js';
import { PagesService } from '../services/PagesService.js';
import { Errors, RegEx, Responses } from '../utils/Constants.js';
import { Logger } from '../utils/Logger.js';
import { parseRequestId } from '../utils/helperUtils.js';

export const pageRouter = express.Router();

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
    const item: PageEdit = req.body;

    // Get next id
    const idNew = (await new PagesService().getNextId()) ?? 0;
    if (!idNew || idNew === 0) {
      res.status(400).json({ error: 'Next Id not found.' });
    }

    const promises = [
      new Promise(() => {
        new PageService().addItem({ ...item, id: idNew });
      }),
    ];
    const promise2 = new Promise(() => {
      new PageFileService().addFile(idNew, item.text);
    });
    if (item.text) {
      promises.push(promise2);
    }

    const results = await Promise.allSettled(promises);
    // Use a for loop so you can break out.  You may not be able to break other loops.
    for (const result of results) {
      if (result.status !== 'fulfilled') {
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
    const item: PageEdit = req.body;

    // Create promises
    const promises = [
      new Promise(() => {
        new PageService().updateItem({ ...item });
      }),
    ];
    // Create promise to write the file
    const promise2 = new Promise(() => {
      new PageFileService().updateFile(item.id, item.text);
    });
    // If there's text, add the promise to write the file
    if (item.text) {
      promises.push(promise2);
    }
    // Execute promises
    const results = await Promise.allSettled(promises);
    // Review the results
    // Use a for loop so you can break out:
    // Some loop types you cannot break early from.
    for (const result of results) {
      if (result.status !== 'fulfilled') {
        console.log('Error:', result.reason);
        //res.status(400).json({ error: result.reason });
      }
    }

    // Return the new item
    // if (returnRepresentation) {
    const ret = await new PageService().getItemCompleteById(item.id);
    res.status(201).json(ret);
    // } else {
    //   res.status(200).json({ message: 'Success' });
    // }
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

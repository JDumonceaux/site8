import express, { Request, Response } from 'express';
import { Errors, Responses } from '../lib/utils/constants.js';
import { Logger } from '../lib/utils/logger.js';
import { PagesService } from '../services/PagesService.js';
import { MenuItem } from '../types/MenuItem.js';

export const pagesRouter = express.Router();

pagesRouter.get('/', async (_req: Request, res: Response) => {
  Logger.info(`pagesRouter: get ->`);

  try {
    const ret = await new PagesService().getItems();
    if (!ret) {
      res.status(404).json({ message: Responses.NOT_FOUND });
      return res.end();
    }
    res.json(ret);
  } catch (error) {
    Logger.error(`pagesRouter: fixNames -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

pagesRouter.post('/', async (req: Request, res: Response) => {
  Logger.info(`pageRouter: post ->`);

  try {
    const service = new PagesService();
    const item: MenuItem = req.body;

    // Get next id
    const idNew = (await service.getNextId()) ?? 0;
    if (!idNew || idNew === 0) {
      res.status(400).json({ error: 'Next Id not found.' });
      return res.end();
    }

    // await service.addMenuItem({ ...item, id: idNew }),
    // Return the new item
    res.status(201).json({ message: Responses.SUCCESS });
  } catch (error) {
    Logger.error(`pagesRouter: post -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

pagesRouter.get('/fix-entries', async (_req: Request, res: Response) => {
  Logger.info(`pagesRouter: fix-entries ->`);

  try {
    // const ret = await new PagesService().fixAllEntries();
    res.json({ message: Responses.SUCCESS });
  } catch (error) {
    Logger.error(`pagesRouter: fix-entries -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

pagesRouter.get('/list-duplicates', async (_req: Request, res: Response) => {
  Logger.info(`pagesRouter: listDuplicates ->`);

  try {
    const ret = await new PagesService().listDuplicates();
    res.json(ret);
  } catch (error) {
    Logger.error(`pagesRouter: listDuplicates -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

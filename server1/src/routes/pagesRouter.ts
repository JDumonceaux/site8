import express, { Request, Response } from 'express';
import { Logger } from '../utils/Logger.js';
import { PagesService } from '../services/PagesService.js';

export const pagesRouter = express.Router();

pagesRouter.get('/', async (_req: Request, res: Response) => {
  Logger.info(`pagesIndexRouter: get ->`);

  try {
    const items = await new PagesService().getItems();
    res.json(items);
  } catch (error) {
    Logger.error(`pagesRouter: fixNames -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

pagesRouter.get('/list-duplicates', async (_req: Request, res: Response) => {
  Logger.info(`pagesIndexRouter: listDuplicates ->`);

  try {
    const ret = await new PagesService().listDuplicates();
    res.json(ret);
  } catch (error) {
    Logger.error(`pagesRouter: listDuplicates -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

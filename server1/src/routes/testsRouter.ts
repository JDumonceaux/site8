import express, { Request, Response } from 'express';

import { TestsService } from '../services/TestsService.js';
import { Responses } from '../utils/Constants.js';
import { Logger } from '../utils/Logger.js';

export const testsRouter = express.Router();

testsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const ret = await new TestsService().getItems();
    if (!ret) {
      res.status(404).json({ message: Responses.NOT_FOUND });
      return res.end();
    }
    res.status(200).json(ret);
  } catch (error) {
    Logger.error(`testsRouter: get -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
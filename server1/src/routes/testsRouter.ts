import express, { Request, Response } from 'express';

import { Tests } from 'types/Tests.js';
import { Responses } from 'utils/Constants.js';
import { FileService } from '../services/FileService.js';
import { Logger } from '../utils/Logger.js';

export const testsRouter = express.Router();

testsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const fileName = 'tests.json';
    const data = await new FileService().getFile(fileName);
    if (!data) {
      return res.status(404).json({ message: Responses.NOT_FOUND });
    }
    const ret = JSON.parse(data) as Tests;
    res.status(200).json(ret);
  } catch (error) {
    Logger.error(`testsRouter: get -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

import express, { Request, Response } from 'express';

import { Responses } from 'utils/Constants.js';
import { FileService } from '../services/FileService.js';
import { Logger } from '../utils/Logger.js';

export const filesRouter = express.Router();

// This could be reworked: https://zellwk.com/blog/async-await-express/
// https://zellwk.com/blog/express-errors/
filesRouter.get('/:filename', async (req: Request, res: Response) => {
  try {
    const param = req.params.filename;
    if (!param || param.trim() === '') {
      return res.status(400).json({ error: Responses.INVALID_PARAM });
    }

    const fileName = param.trim() + '.json';
    const ret = await new FileService().getFile(fileName);
    if (!ret) {
      return res.status(404).json({ message: Responses.NOT_FOUND });
    }
    res.status(200).json(ret);
  } catch (error) {
    Logger.error(`filesRouter: get -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

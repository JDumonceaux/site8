import express, { Request, Response } from 'express';
import { getFilePath } from '../utils/getFilePath.js';
import { Logger } from '../utils/Logger.js';

export const pagesIndexRouter = express.Router();

pagesIndexRouter.get('/', (_req: Request, res: Response) => {
  Logger.info(`pagesIndexRouter: get ->`);
  res.sendFile(getFilePath('pagesIndex.json'));
});

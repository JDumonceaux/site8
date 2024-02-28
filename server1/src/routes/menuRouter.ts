import express, { Request, Response } from 'express';
import { getFilePath } from '../utils/getFilePath.js';
import { Logger } from '../utils/Logger.js';

export const menuRouter = express.Router();

menuRouter.get('/', (_req: Request, res: Response) => {
  Logger.info(`menuRouter: get ->`);
  res.sendFile(getFilePath('pages.json'));
});

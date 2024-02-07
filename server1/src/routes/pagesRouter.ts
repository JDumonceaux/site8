import express, { Request, Response } from 'express';
import { getFilePath } from '../utils/getFilePath.js';

export const pagesRouter = express.Router();

pagesRouter.get('/', (_req: Request, res: Response) => {
  res.sendFile(getFilePath('pages.json'));
});

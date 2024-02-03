import express, { Request, Response } from 'express';
import { getFilePath } from 'utils/getFilePath';

export const pagesRouter = express.Router();
const path = require('path');

pagesRouter.get('/', (req: Request, res: Response) => {
  res.sendFile(getFilePath('pages.json'));
});

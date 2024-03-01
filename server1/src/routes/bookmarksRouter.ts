import express, { Request, Response } from 'express';
import { BookmarksService } from '../services/BookmarksService.js';

export const bookmarksRouter = express.Router();

bookmarksRouter.get('/:id', async (req: Request, res: Response) => {
  const item = await new BookmarksService().getFilteredItems(req.params.id);
  res.json(item);
});

bookmarksRouter.get('/', async (req: Request, res: Response) => {
  const item = await new BookmarksService().getAllItems();
  res.json(item);
});

bookmarksRouter.get('/tag', async (req: Request, res: Response) => {
  const item = await new BookmarksService().getAllItemsByTag();
  res.json(item);
});

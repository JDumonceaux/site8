import express, { Request, Response } from 'express';
import { BookmarksService } from '../feature/bookmarks/BookmarksService.js';

export const bookmarksRouter = express.Router();

bookmarksRouter.get('/page/:id', async (req: Request, res: Response) => {
  const item = await new BookmarksService().getBookmarksForPage(req.params.id);
  res.json(item);
});

bookmarksRouter.get('/', async (_req: Request, res: Response) => {
  const item = await new BookmarksService().getAllItems();
  res.json(item);
});

bookmarksRouter.get('/tags', async (_req: Request, res: Response) => {
  const item = await new BookmarksService().getAllItemsByTag();
  res.json(item);
});

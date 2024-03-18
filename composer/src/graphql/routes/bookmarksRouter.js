import express from 'express';
import { BookmarksService } from '../services/BookmarksService.js';
export const bookmarksRouter = express.Router();
bookmarksRouter.get('/page/:id', async (req, res) => {
    const item = await new BookmarksService().getBookmarksForPage(req.params.id);
    res.json(item);
});
bookmarksRouter.get('/', async (req, res) => {
    const item = await new BookmarksService().getAllItems();
    res.json(item);
});
bookmarksRouter.get('/tags', async (req, res) => {
    const item = await new BookmarksService().getAllItemsByTag();
    res.json(item);
});

import express from 'express';
import { getItems } from '../features/bookmarks/getItems.js';
import { getTags } from '../features/bookmarks/getTags.js';
import { getItemsPage } from '../features/bookmarks/getItemsPage.js';
import { requireId } from '../middleware/requireId.js';

export const bookmarksRouter = express.Router();

const validationMiddleware = [requireId];

bookmarksRouter.get('/page/:id', validationMiddleware, getItemsPage);
bookmarksRouter.get('/', getItems);
bookmarksRouter.get('/tags', getTags);

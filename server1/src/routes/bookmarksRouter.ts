import express from 'express';
import { getItems } from '../feature/bookmarks/getItems.js';
import { getTags } from '../feature/bookmarks/getTags.js';
import { getItemsPage } from '../feature/bookmarks/getItemsPage.js';
import { requireId } from '../middleware/requireId.js';

export const bookmarksRouter = express.Router();

const validationStack = [requireId];

bookmarksRouter.get('/page/:id', validationStack, getItemsPage);
bookmarksRouter.get('/', getItems);
bookmarksRouter.get('/tags', getTags);

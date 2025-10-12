import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getItems } from '../features/bookmarks/getItems.js';
import { getTags } from '../features/bookmarks/getTags.js';
import { getItemsPage } from '../features/bookmarks/getItemsPage.js';
import { requireNumericId } from '../middleware/requireNumericId.js';

const VALIDATION_MIDDLEWARE = [requireNumericId];

export const bookmarksRouter = express.Router();

bookmarksRouter.get(
  '/page/:id',
  VALIDATION_MIDDLEWARE,
  asyncHandler(getItemsPage),
);
bookmarksRouter.get('/', asyncHandler(getItems));
bookmarksRouter.get('/tags', asyncHandler(getTags));

import express from 'express';

import { getItems } from '../features/bookmarks/getItems.js';
import { getItemsPage } from '../features/bookmarks/getItemsPage.js';
import { getTags } from '../features/bookmarks/getTags.js';
import { asyncHandler } from '../utils/routerUtils.js';
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

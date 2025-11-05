import express from 'express';

import { deleteItem } from '../features/page/deleteItem.js';
import { getItem } from '../features/page/getItem.js';
import { patchItem } from '../features/page/patchItem.js';
import { putItem } from '../features/page/putItem.js';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { requireId } from '../middleware/requireId.js';

const VALIDATION_MIDDLEWARE = [requireId];

export const pageRouter = express.Router();

pageRouter.get<{ id: string }>(
  '/:id',
  VALIDATION_MIDDLEWARE,
  asyncHandler(getItem),
);
pageRouter.delete<{ id: string }>(
  '/:id',
  VALIDATION_MIDDLEWARE,
  asyncHandler(deleteItem),
);
pageRouter.put('/', asyncHandler(putItem));
pageRouter.patch('/', asyncHandler(patchItem));

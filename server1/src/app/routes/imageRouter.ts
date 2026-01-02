import express from 'express';

import { deleteItem } from '../../features/image/deleteItem.js';
import { getItem } from '../../features/image/getItem.js';
import { patchItem } from '../../features/image/patchItem.js';
import { asyncHandler } from '../../utils/routerUtils.js';
import { requireNumericId } from '../../middleware/requireNumericId.js';
import { postItem } from '../../features/image/postItem.js';

const VALIDATION_MIDDLEWARE = [requireNumericId];

export const imageRouter = express.Router();

imageRouter.get<{ id: string }>(
  '/:id',
  VALIDATION_MIDDLEWARE,
  asyncHandler(getItem),
);
// DELETE and PATCH use request body for data (no URL parameters)
imageRouter.delete('/', asyncHandler(deleteItem));
// Full update
// imageRouter.put('/', asyncHandler(putItem));
// Partial update
imageRouter.patch('/', asyncHandler(patchItem));
// Create New Resource
imageRouter.post('/', asyncHandler(postItem));

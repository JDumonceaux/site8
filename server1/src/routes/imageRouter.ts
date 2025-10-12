import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getItem } from '../features/image/getItem.js';
import { putItem } from '../features/image/putItem.js';
import { patchItem } from '../features/image/patchItem.js';
import { deleteItem } from '../features/image/deleteItem.js';
import { requireNumericId } from '../middleware/requireNumericId.js';

const VALIDATION_MIDDLEWARE = [requireNumericId];

export const imageRouter = express.Router();

imageRouter.get('/:id', VALIDATION_MIDDLEWARE, asyncHandler(getItem));
imageRouter.delete('/:id', VALIDATION_MIDDLEWARE, asyncHandler(deleteItem));
imageRouter.put('/', asyncHandler(putItem));
imageRouter.patch('/', asyncHandler(patchItem));

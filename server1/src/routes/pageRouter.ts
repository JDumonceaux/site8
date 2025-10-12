import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getItem } from '../features/page/getItem.js';
import { deleteItem } from '../features/page/deleteItem.js';
import { putItem } from '../features/page/putItem.js';
import { patchItem } from '../features/page/patchItem.js';
import { requireId } from '../middleware/requireId.js';

const VALIDATION_MIDDLEWARE = [requireId];

export const pageRouter = express.Router();

pageRouter.get('/:id', VALIDATION_MIDDLEWARE, asyncHandler(getItem));
pageRouter.delete('/:id', VALIDATION_MIDDLEWARE, asyncHandler(deleteItem));
pageRouter.put('/', asyncHandler(putItem));
pageRouter.patch('/', asyncHandler(patchItem));

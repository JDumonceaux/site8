import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getItems } from '../features/menu/getItems.js';
import { putItem } from '../features/menu/putItem.js';
import { patchItem } from '../features/menu/patchItem.js';
import { getItemsEdit } from '../features/menu/getItemsEdit.js';

export const menuRouter = express.Router();

menuRouter.get('/', asyncHandler(getItems));
menuRouter.get('/edit', asyncHandler(getItemsEdit));
menuRouter.put('/', asyncHandler(putItem));
menuRouter.patch('/', asyncHandler(patchItem));

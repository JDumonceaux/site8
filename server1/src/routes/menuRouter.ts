import express from 'express';

import { getItems } from '../features/menu/getItems.js';
import { getItemsEdit } from '../features/menu/getItemsEdit.js';
import { patchItem } from '../features/menu/patchItem.js';
import { putItem } from '../features/menu/putItem.js';
import { asyncHandler } from '../utils/routerUtils.js';

export const menuRouter = express.Router();

menuRouter.get('/', asyncHandler(getItems));
menuRouter.get('/edit', asyncHandler(getItemsEdit));
menuRouter.put('/', asyncHandler(putItem));
menuRouter.patch('/', asyncHandler(patchItem));

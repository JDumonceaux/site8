import express from 'express';

import { getItems } from '../features/menu/getItems.js';
import { putItem } from '../features/image/putItem.js';
import { patchItem } from '../features/menu/patchItem.js';
import { getItemsEdit } from '../features/menu/getItemsEdit.js';

export const menuRouter = express.Router();

menuRouter.get('/', getItems);
menuRouter.get('/edit', getItemsEdit);
menuRouter.put('/', putItem);
menuRouter.patch('/', patchItem);
menuRouter.put('/', putItem);

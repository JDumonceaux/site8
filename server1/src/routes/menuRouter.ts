import express from 'express';

import { getItems } from '../feature/menu/getItems.js';
import { putItem } from '../feature/image/putItem.js';
import { patchItem } from '../feature/menu/patchItem.js';
import { getItemsEdit } from '../feature/menu/getItemsEdit.js';

export const menuRouter = express.Router();

menuRouter.get('/', getItems);
menuRouter.get('/edit', getItemsEdit);
menuRouter.put('/', putItem);
menuRouter.patch('/', patchItem);
menuRouter.put('/', putItem);

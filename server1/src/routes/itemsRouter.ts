import express from 'express';

import { getItems } from '../feature/items/getItems.js';
import { patchItems } from '../feature/items/patchItems.js';
import { putItems } from '../feature/items/putItems.js';
import { getItemsEdit } from '../feature/items/getItemsEdit.js';

export const itemsRouter = express.Router();

itemsRouter.get('/', getItems);
itemsRouter.get('/edit', getItemsEdit);
itemsRouter.put('/', putItems);
itemsRouter.patch('/', patchItems);

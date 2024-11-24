import express from 'express';

import { getItems } from '../feature/items/getItems.js';
import { patchItems } from '../feature/items/patchItems.js';
import { putItems } from '../feature/items/putItems.js';

export const itemsRouter = express.Router();

itemsRouter.get('/', getItems);
itemsRouter.put('/', putItems);
itemsRouter.patch('/', patchItems);

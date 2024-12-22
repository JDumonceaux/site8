import express from 'express';

import { getItems } from '../features/items/getItems.js';
import { patchItems } from '../features/items/patchItems.js';
import { putItems } from '../features/items/putItems.js';
import { getItemsArtists } from '../features/items/getItemsArtists.js';

export const itemsRouter = express.Router();

itemsRouter.get('/', getItems);
itemsRouter.put('/', putItems);
itemsRouter.patch('/', patchItems);
itemsRouter.get('/itemsartists', getItemsArtists);

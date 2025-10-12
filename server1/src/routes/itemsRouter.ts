import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getItems } from '../features/items/getItems.js';
import { patchItems } from '../features/items/patchItems.js';
import { putItems } from '../features/items/putItems.js';
import { getItemsArtists } from '../features/items/getItemsArtists.js';

export const itemsRouter = express.Router();

itemsRouter.get('/', asyncHandler(getItems));
itemsRouter.put('/', asyncHandler(putItems));
itemsRouter.patch('/', asyncHandler(patchItems));
itemsRouter.get('/itemsartists', asyncHandler(getItemsArtists));

import express from 'express';

import { getArtistsItems } from '../features/artists/getArtistsItems.js';
import { getItems } from '../features/artists/getItems.js';
import { asyncHandler } from '../lib/utils/routerUtils.js';

export const artistsRouter = express.Router();

artistsRouter.get('/', asyncHandler(getItems));
artistsRouter.get('/items', asyncHandler(getArtistsItems));

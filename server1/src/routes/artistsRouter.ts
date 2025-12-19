import express from 'express';

import { getArtists } from '../features/artists/getArtists.js';
import { getArtistsItems } from '../features/artists/getArtistsItems.js';
import { asyncHandler } from '../utils/routerUtils.js';

export const artistsRouter = express.Router();

artistsRouter.get('/', asyncHandler(getArtists));
artistsRouter.get('/items', asyncHandler(getArtistsItems));

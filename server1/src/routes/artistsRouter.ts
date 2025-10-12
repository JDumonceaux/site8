import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getArtists } from '../features/artists/getArtists.js';
import { getArtistsWithItems } from '../features/artists/getArtistsWithItems.js';

export const artistsRouter = express.Router();

artistsRouter.get('/', asyncHandler(getArtists));
artistsRouter.get('/items', asyncHandler(getArtistsWithItems));

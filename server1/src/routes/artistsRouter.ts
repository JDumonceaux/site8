import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getItems } from '../features/artists/getItems.js';
import { getArtistWithItems } from '../features/artists/getArtistWithItems.js';

export const artistsRouter = express.Router();

artistsRouter.get('/', asyncHandler(getItems));
artistsRouter.get('/items', asyncHandler(getArtistWithItems));

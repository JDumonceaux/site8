import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getItems } from '../features/artists/getItems.js';
import { getArtist } from '../features/artists/getArtist.js';
import { requireNumericId } from 'src/middleware/requireNumericId.js';
import getArtistsItems from '@/features/artists/getArtistsItems.js';

const VALIDATION_MIDDLEWARE = [requireNumericId];

export const artistsRouter = express.Router();

artistsRouter.get('/', asyncHandler(getItems));
artistsRouter.get('/items', asyncHandler(getArtistsItems));
artistsRouter.get('/:id', VALIDATION_MIDDLEWARE, asyncHandler(getArtist));

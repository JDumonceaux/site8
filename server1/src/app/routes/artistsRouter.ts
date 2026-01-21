import express from 'express';

import { getArtistsItems } from '../../features/artists/getArtistsItems.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const artistsRouter = express.Router();

artistsRouter.get('/items', asyncHandler(getArtistsItems));

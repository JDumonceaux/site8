import express from 'express';

import { getArtist } from '../features/artist/getArtist.js';
import { asyncHandler } from '../utils/routerUtils.js';
import { requireNumericId } from '../middleware/requireNumericId.js';

const VALIDATION_MIDDLEWARE = [requireNumericId];

export const artistRouter = express.Router();

artistRouter.get('/:id', VALIDATION_MIDDLEWARE, asyncHandler(getArtist));

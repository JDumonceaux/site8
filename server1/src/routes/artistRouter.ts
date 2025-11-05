import express from 'express';

import { requireNumericId } from 'src/middleware/requireNumericId.js';

import { getArtist } from '../features/artist/getArtist.js';
import { asyncHandler } from '../lib/utils/routerUtils.js';

const VALIDATION_MIDDLEWARE = [requireNumericId];

export const artistRouter = express.Router();

artistRouter.get('/:id', VALIDATION_MIDDLEWARE, asyncHandler(getArtist));

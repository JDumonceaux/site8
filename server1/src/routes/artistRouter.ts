import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getArtistWithItems } from '../features/artists/getArtistWithItems.js';
import { requireNumericId } from 'src/middleware/requireNumericId.js';

const VALIDATION_MIDDLEWARE = [requireNumericId];

export const artistRouter = express.Router();

artistRouter.get(
  '/:id/items',
  VALIDATION_MIDDLEWARE,
  asyncHandler(getArtistWithItems),
);

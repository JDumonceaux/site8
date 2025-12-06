import express from 'express';

import { getItemByName } from '../features/generic/getItem.js';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { requireName } from '../middleware/requireName.js';

const VALIDATION_MIDDLEWARE = [requireName];

export const genericRouter = express.Router();

// Single parameter route (e.g., /api/generic/accessibility)
genericRouter.get('/:name', VALIDATION_MIDDLEWARE, asyncHandler(getItemByName));

// Two parameter route (e.g., /api/generic/parent/name)
genericRouter.get(
  '/:parent/:name',
  VALIDATION_MIDDLEWARE,
  asyncHandler(getItemByName),
);

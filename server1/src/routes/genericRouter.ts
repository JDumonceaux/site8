import express from 'express';

import { getItemByName } from '../features/generic/getItem.js';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { requireName } from '../middleware/requireName.js';

const VALIDATION_MIDDLEWARE = [requireName];

export const genericRouter = express.Router();

genericRouter.get(
  '/:parent/:name',
  VALIDATION_MIDDLEWARE,
  asyncHandler(getItemByName),
);

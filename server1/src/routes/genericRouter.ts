import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getItemByName } from '../features/generic/getItem.js';
import { requireName } from '../middleware/requireName.js';

const VALIDATION_MIDDLEWARE = [requireName];

export const genericRouter = express.Router();

genericRouter.get(
  '/:parent/:name',
  VALIDATION_MIDDLEWARE,
  asyncHandler(getItemByName),
);

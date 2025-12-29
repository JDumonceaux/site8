import express from 'express';

import { getItemByName } from '../../lib/generic/getItem.js';
import { requireName } from '../../middleware/requireName.js';
import { asyncHandler } from '../../utils/routerUtils.js';

const VALIDATION_MIDDLEWARE = [requireName];

/**
 * Router for generic page retrieval endpoints
 * Handles fetching pages by name with optional parent context
 */
export const genericRouter = express.Router();

/**
 * GET /:name
 * Retrieves a page item by name without parent context
 * Example: GET /api/generic/accessibility
 */
genericRouter.get('/:name', VALIDATION_MIDDLEWARE, asyncHandler(getItemByName));

/**
 * GET /:parent/:name
 * Retrieves a page item by name within a specific parent context
 * Example: GET /api/generic/react/hooks
 */
genericRouter.get(
  '/:parent/:name',
  VALIDATION_MIDDLEWARE,
  asyncHandler(getItemByName),
);

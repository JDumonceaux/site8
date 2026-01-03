import express from 'express';

import { getItems } from '../../features/travel/getItems.js';
import { getMenu } from '../../features/travel/getMenu.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const travelRouter = express.Router();

// GET /api/travel - Get all travel places
travelRouter.get('/', asyncHandler(getItems));

// GET /api/travel/menu - Get hierarchical menu (Country > City > Name)
travelRouter.get('/menu', asyncHandler(getMenu));

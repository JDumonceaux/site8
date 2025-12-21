import express from 'express';

import { getItems } from '../features/travel/getItems.js';
import { asyncHandler } from '../utils/routerUtils.js';

export const travelRouter = express.Router();

travelRouter.get('/', asyncHandler(getItems));

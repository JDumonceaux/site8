import express from 'express';

import { getItems } from '../features/photos/getItems.js';
import { asyncHandler } from '../utils/routerUtils.js';

export const photosRouter = express.Router();

photosRouter.get('/', asyncHandler(getItems));

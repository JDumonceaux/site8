import express from 'express';

import { getItems } from '../features/music/getItems.js';
import { asyncHandler } from '../lib/utils/routerUtils.js';

export const musicRouter = express.Router();

musicRouter.get('/', asyncHandler(getItems));

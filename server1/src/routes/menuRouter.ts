import express from 'express';

import { getItems } from '../features/menu/getItems.js';
import { asyncHandler } from '../utils/routerUtils.js';

export const menuRouter = express.Router();

menuRouter.get('/', asyncHandler(getItems));

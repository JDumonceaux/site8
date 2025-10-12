import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getItems } from '../features/photos/getItems.js';

export const photosRouter = express.Router();

photosRouter.get('/', asyncHandler(getItems));

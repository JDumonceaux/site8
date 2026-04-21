import express from 'express';

import { getAllItems } from '../../feature/images/getAllItems.js';
import { getFolders } from '../../feature/images/getFolders.js';
import { getMatchedItems } from '../../feature/images/getMatchedItems.js';
import { moveItems } from '../../feature/images/moveItems.js';
import { CURRENT_YEAR } from '../../utils/constants.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const routeConfig = { mutations: true, path: '/api/images' } as const;

export const imagesRouter = express.Router();

imagesRouter.get('/', asyncHandler(getAllItems));
imagesRouter.get('/folders', asyncHandler(getFolders));
imagesRouter.get('/matched', asyncHandler(getMatchedItems));
imagesRouter.get(`/${String(CURRENT_YEAR)}/folders`, asyncHandler(getFolders));
imagesRouter.post('/move', asyncHandler(moveItems));

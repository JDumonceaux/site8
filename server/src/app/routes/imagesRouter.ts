import express from 'express';

import { getAllItems } from '../../features/images/getAllItems.js';
import { getFolders } from '../../features/images/getFolders.js';
import { getMatchedItems } from '../../features/images/getMatchedItems.js';
import { moveItems } from '../../features/images/moveItems.js';
import { CURRENT_YEAR } from '../../utils/constants.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const imagesRouter = express.Router();

imagesRouter.get('/', asyncHandler(getAllItems));
imagesRouter.get('/folders', asyncHandler(getFolders));
imagesRouter.get('/matched', asyncHandler(getMatchedItems));
imagesRouter.get(`/${String(CURRENT_YEAR)}/folders`, asyncHandler(getFolders));
imagesRouter.post('/move', asyncHandler(moveItems));

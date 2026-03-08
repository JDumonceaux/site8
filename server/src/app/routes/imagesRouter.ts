import express from 'express';

import { getFolders } from '../../features/images/getFolders.js';
import { getItems } from '../../features/images/getItems.js';
import { getMatchedItems } from '../../features/images/getMatchedItems.js';
import { moveItems } from '../../features/images/moveItems.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const imagesRouter = express.Router();

imagesRouter.get('/', asyncHandler(getItems));
imagesRouter.get('/matched', asyncHandler(getMatchedItems));
imagesRouter.get('/2025/folders', asyncHandler(getFolders));
imagesRouter.post('/move', asyncHandler(moveItems));

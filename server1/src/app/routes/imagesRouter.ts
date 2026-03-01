import express from 'express';

import { getItems } from '../../features/images/getItems.js';
import { getMatchedItems } from '../../features/images/getMatchedItems.js';
import { getYear2025Folders } from '../../features/images/getYear2025Folders.js';
import { moveItems } from '../../features/images/moveItems.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const imagesRouter = express.Router();

imagesRouter.get('/', asyncHandler(getItems));
imagesRouter.get('/matched', asyncHandler(getMatchedItems));
imagesRouter.get('/2025/folders', asyncHandler(getYear2025Folders));
imagesRouter.post('/move', asyncHandler(moveItems));

import express from 'express';

import { getItems } from '../../features/images/getItems.js';
import { getYear2025Folders } from '../../features/images/getYear2025Folders.js';
import { getUnmatchedItems } from '../../features/images/getUnmatchedItems.js';
import { moveItems } from '../../features/images/moveItems.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const imagesRouter = express.Router();

imagesRouter.get('/', asyncHandler(getItems));
imagesRouter.get('/unmatched', asyncHandler(getUnmatchedItems));
imagesRouter.get('/2025/folders', asyncHandler(getYear2025Folders));
imagesRouter.post('/move', asyncHandler(moveItems));

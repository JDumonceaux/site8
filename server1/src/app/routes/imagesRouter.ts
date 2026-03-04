import express from 'express';

import { addItem } from '../../features/image/addItem.js';
import { deleteItem } from '../../features/image/deleteItem.js';
import { identifyItem } from '../../features/image/identifyItem.js';
import { updateItem } from '../../features/image/updateItem.js';
import { getFolders } from '../../features/images/getFolders.js';
import { getItems } from '../../features/images/getItems.js';
import { getMatchedItems } from '../../features/images/getMatchedItems.js';
import { moveItems } from '../../features/images/moveItems.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const imagesRouter = express.Router();

imagesRouter.get('/', asyncHandler(getItems));
imagesRouter.post('/', asyncHandler(addItem));
imagesRouter.put('/', asyncHandler(updateItem));
imagesRouter.delete('/', asyncHandler(deleteItem));
imagesRouter.get('/matched', asyncHandler(getMatchedItems));
imagesRouter.get('/2025/folders', asyncHandler(getFolders));
imagesRouter.post('/identify', asyncHandler(identifyItem));
imagesRouter.post('/move', asyncHandler(moveItems));

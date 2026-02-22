import express from 'express';

import { addItem } from '../../features/image/addItem.js';
import { deleteItem } from '../../features/image/deleteItem.js';
import { identifyItem } from '../../features/image/identifyItem.js';
import { updateItem } from '../../features/image/updateItem.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const imageRouter = express.Router();

imageRouter.post('/add-item', asyncHandler(addItem));
imageRouter.post('/identify', asyncHandler(identifyItem));
imageRouter.put('/update', asyncHandler(updateItem));
imageRouter.delete('/item', asyncHandler(deleteItem));

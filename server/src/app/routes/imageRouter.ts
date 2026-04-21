import express from 'express';

import { addItem } from '../../feature/image/addItem.js';
import { deleteItem } from '../../feature/image/deleteItem.js';
import { identifyItem } from '../../feature/image/identifyItem.js';
import { updateItem } from '../../feature/image/updateItem.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const routeConfig = { mutations: true, path: '/api/image' } as const;

export const imageRouter = express.Router();

imageRouter.post('/add-item', asyncHandler(addItem));
imageRouter.post('/identify', asyncHandler(identifyItem));
imageRouter.put('/update', asyncHandler(updateItem));
imageRouter.delete('/item', asyncHandler(deleteItem));

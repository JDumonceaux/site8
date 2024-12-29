import express from 'express';

import { getItem } from '../features/image/getItem.js';
import { putItem } from '../features/image/putItem.js';
import { patchItem } from '../features/image/patchItem.js';
import { deleteItem } from '../features/image/deleteItem.js';
import { requireId } from '../middleware/requireId.js';

export const imageRouter = express.Router();

const validationStack = [requireId];

imageRouter.get('/:id', validationStack, getItem);
imageRouter.delete('/:id', validationStack, deleteItem);
imageRouter.put('/', putItem);
imageRouter.patch('/', patchItem);

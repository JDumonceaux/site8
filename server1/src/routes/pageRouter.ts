import express from 'express';

import { getItem } from '../features/page/getItem.js';
import { deleteItem } from '../features/page/deleteItem.js';
import { requireId } from '../middleware/requireId.js';
import { putItem } from '../features/page/putItem.js';
import { patchItem } from '../features/page/patchItem.js';

export const pageRouter = express.Router();

const validationStack = [requireId];

pageRouter.get('/:id', validationStack, getItem);
pageRouter.delete('/:id', validationStack, deleteItem);
pageRouter.put('/', putItem);
pageRouter.patch('/', patchItem);

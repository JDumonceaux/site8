import express from 'express';

import { getItem } from '../feature/page/getItem.js';
import { deleteItem } from '../feature/page/deleteItem.js';
import { requireId } from '../middleware/requireId.js';
import { putItem } from '../feature/page/putItem.js';
import { patchItem } from '../feature/page/patchItem.js';

export const pageRouter = express.Router();

const validationStack = [requireId];

pageRouter.get('/id', validationStack, getItem);
pageRouter.delete('/id', validationStack, deleteItem);
pageRouter.put('/', putItem);
pageRouter.patch('/id', patchItem);

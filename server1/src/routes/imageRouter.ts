import express from 'express';

import { getItem } from '../feature/image/getItem.js';
import { putItem } from '../feature/image/putItem.js';
import { patchItem } from '../feature/image/patchItem.js';
import { deleteItem } from '../feature/image/deleteItem.js';
import { requireId } from '../middleware/requireId.js';

export const imageRouter = express.Router();

const validationStack = [requireId];

imageRouter.get('/', validationStack, getItem);
imageRouter.put('/', putItem);
imageRouter.patch('/', patchItem);
imageRouter.delete('/', deleteItem);

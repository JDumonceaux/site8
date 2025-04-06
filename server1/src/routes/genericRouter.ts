import express from 'express';
import { getItemByName } from 'src/features/generic/getItem.js';

import { requireId } from 'src/middleware/requireId.js';

export const genericRouter = express.Router();

const validationMiddleware = [requireId];

genericRouter.get('/:id', validationMiddleware, getItemByName);

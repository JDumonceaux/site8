import express from 'express';
import { getItemByName } from '../features/generic/getItem.js';

import { requireName } from '../middleware/requireName.js';

export const genericRouter = express.Router();

const validationMiddleware = [requireName];

genericRouter.get('/:parent/:name', validationMiddleware, getItemByName);

import express from 'express';

import { getItems } from '../features/tests/getItems.js';
import { asyncHandler } from '../utils/routerUtils.js';

export const testsRouter = express.Router();

testsRouter.get('/', asyncHandler(getItems));

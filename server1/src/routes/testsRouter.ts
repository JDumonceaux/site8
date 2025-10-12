import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getItems } from '../features/tests/getItems.js';

export const testsRouter = express.Router();

testsRouter.get('/', asyncHandler(getItems));

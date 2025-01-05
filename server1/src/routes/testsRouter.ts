import express from 'express';
import asyncHandler from 'express-async-handler';

import { getItems } from '../features/tests/getItems.js';

export const testsRouter = express.Router();

testsRouter.get('/', asyncHandler(getItems));

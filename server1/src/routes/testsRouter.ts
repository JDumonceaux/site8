import express from 'express';

import { getItems } from '../features/tests/getItems.js';

export const testsRouter = express.Router();

testsRouter.get('/', getItems);

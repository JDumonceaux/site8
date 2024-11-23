import express from 'express';

import { getItems } from '../feature/tests/getItems.js';

export const testsRouter = express.Router();

testsRouter.get('/', getItems);

import express from 'express';

import { getFile } from '../features/files/getFile.js';
import { requireFileName } from '../middleware/requireFileName.js';

export const filesRouter = express.Router();

const validationMiddleware = [requireFileName];
filesRouter.get('/:filename', validationMiddleware, getFile);

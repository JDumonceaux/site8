import express from 'express';

import { getFile } from '../apis/files/controllers/getFile.js';
import { requireFileName } from '../middleware/requireFileName.js';

export const filesRouter = express.Router();

const validationStack = [requireFileName];

filesRouter.get('/:filename', validationStack, getFile);

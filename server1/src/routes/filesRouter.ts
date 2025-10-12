import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getFile } from '../features/files/getFile.js';
import { requireFileName } from '../middleware/requireFileName.js';

const VALIDATION_MIDDLEWARE = [requireFileName];

export const filesRouter = express.Router();

filesRouter.get('/:filename', VALIDATION_MIDDLEWARE, asyncHandler(getFile));

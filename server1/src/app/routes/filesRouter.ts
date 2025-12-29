import express from 'express';

import { getFile } from '../../lib/filesystem/getFile.js';
import { asyncHandler } from '../../utils/routerUtils.js';
import { requireFileName } from '../../middleware/requireFileName.js';

const VALIDATION_MIDDLEWARE = [requireFileName];

export const filesRouter = express.Router();

filesRouter.get('/:filename', VALIDATION_MIDDLEWARE, asyncHandler(getFile));

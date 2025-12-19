import express from 'express';

import { buildFeature } from '../features/build/buildFeature.js';
import { asyncHandler } from '../utils/routerUtils.js';

export const buildRouter = express.Router();

buildRouter.get('/', asyncHandler(buildFeature));

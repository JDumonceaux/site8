import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { buildFeature } from '../features/build/buildFeature.js';

export const buildRouter = express.Router();

buildRouter.get('/', asyncHandler(buildFeature));

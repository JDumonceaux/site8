import express from 'express';
import { buildFeature } from 'src/features/build/buildFeature.js';

export const buildRouter = express.Router();

buildRouter.get('/:id', buildFeature);

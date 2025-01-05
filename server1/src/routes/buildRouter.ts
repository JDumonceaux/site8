import express from 'express';
import { buildFeature } from '../features/build/buildFeature.js';

export const buildRouter = express.Router();

buildRouter.get('/', buildFeature);

import express from 'express';
import { getItems } from '../features/photos/getItems.js';

export const photosRouter = express.Router();

photosRouter.get('/', getItems);

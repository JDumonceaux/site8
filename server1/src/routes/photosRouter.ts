import express from 'express';
import { getItems } from '../feature/photos/getItems.js';

export const photosRouter = express.Router();

photosRouter.get('/', getItems);

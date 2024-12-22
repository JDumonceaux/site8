import express from 'express';
import { getItems } from '../features/artists/getItems.js';

export const artistsRouter = express.Router();

artistsRouter.get('/', getItems);

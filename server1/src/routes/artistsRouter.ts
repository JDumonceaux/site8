import express from 'express';
import { getItems } from '../feature/artists/getItems.js';

export const artistsRouter = express.Router();

artistsRouter.get('/', getItems);

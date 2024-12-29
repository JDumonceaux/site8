import express from 'express';
import { getItems } from '../features/artists/getItems.js';
import { getArtistsItems } from '../features/artists/getArtistsItems.js';

export const artistsRouter = express.Router();

artistsRouter.get('/', getItems);
artistsRouter.get('/items', getArtistsItems);

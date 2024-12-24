import express from 'express';
import { getItems } from '../features/artists/getItems.js';
import { getArtistItems } from '../features/artists/getArtistItems.js';
import { getArtistsItems } from '../features/artists/getArtistsItems.js';

export const artistsRouter = express.Router();

artistsRouter.get('/', getItems);
artistsRouter.get('/items', getArtistsItems);
artistsRouter.get('/items/:id', getArtistItems);

import express from 'express';
import { getItems } from '../features/artists/getItems.js';
import { getArtistsItems } from '../features/artists/getArtistsItems.js';

export const artistsRouter: express.Router = express.Router();
// Fetches a list of all items
artistsRouter.get('/', getItems);
// Fetches detailed artist items
artistsRouter.get('/items', getArtistsItems);

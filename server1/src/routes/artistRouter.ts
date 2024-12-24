import express from 'express';
import { getArtistItems } from '../features/artists/getArtistItems.js';

export const artistRouter = express.Router();

artistRouter.get('/:id/items', getArtistItems);

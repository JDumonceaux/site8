import express from 'express';
import { getArtistItems } from '../features/artists/getArtistItems.js';
import { requireId } from '../middleware/requireId.js';

export const artistRouter = express.Router();

const validationStack = [requireId];

artistRouter.get('/:id/items', validationStack, getArtistItems);

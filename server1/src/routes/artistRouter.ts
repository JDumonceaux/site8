import express from 'express';
import { getArtistItems } from '../features/artists/getArtistItems.js';
import { requireId } from '../middleware/requireId.js';

export const artistRouter = express.Router();

const validationMiddleware = [requireId];

// Define a route to fetch items for a specific artist by ID.
// The 'validationMiddleware' ensures the request includes a valid ID before calling 'getArtistItems'.
artistRouter.get('/:id/items', validationMiddleware, getArtistItems);

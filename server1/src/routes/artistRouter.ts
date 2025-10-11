import express from 'express';
import { getArtistWithtems } from '../features/artists/getArtistWithtems.js';
import { requireId } from '../middleware/requireId.js';

export const artistRouter = express.Router();

const validationMiddleware = [requireId];

// Define a route to fetch items for a specific artist by ID.
// The 'validationMiddleware' ensures the request includes a valid ID before calling 'getArtistWithtems'.
artistRouter.get('/:id/items', validationMiddleware, getArtistWithtems);

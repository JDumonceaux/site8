import express from 'express';
import { asyncHandler } from '../lib/utils/routerUtils.js';
import { getItems } from '../features/photos/getItems.js';
import { fixEntries } from '../features/pages/fixEntries.js';
import { listDuplicates } from '../features/pages/listDuplicates.js';

export const pagesRouter = express.Router();

pagesRouter.get('/', asyncHandler(getItems));
pagesRouter.get('/fix-entries', asyncHandler(fixEntries));
pagesRouter.get('/list-duplicates', asyncHandler(listDuplicates));

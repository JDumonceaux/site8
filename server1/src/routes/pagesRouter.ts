import express from 'express';
import { getItems } from '../features/photos/getItems.js';
import { fixEntries } from '../features/pages/fixEntries.js';
import { listDuplicates } from '../features/pages/listDuplicates.js';

export const pagesRouter = express.Router();

pagesRouter.get('/', getItems);
pagesRouter.get('/fix-entries', fixEntries);
pagesRouter.get('/list-duplicates', listDuplicates);

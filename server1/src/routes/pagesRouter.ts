import express from 'express';
import { getItems } from '../feature/photos/getItems.js';
import { fixEntries } from '../feature/pages/fixEntries.js';
import { listDuplicates } from '../feature/pages/listDuplicates.js';

export const pagesRouter = express.Router();

pagesRouter.get('/', getItems);
pagesRouter.get('/fix-entries', fixEntries);
pagesRouter.get('/list-duplicates', listDuplicates);

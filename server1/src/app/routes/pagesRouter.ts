import express from 'express';

import { fixEntries } from '../../features/pages/fixEntries.js';
import { listDuplicates } from '../../features/pages/listDuplicates.js';
import { getItems } from '../../features/photos/getItems.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const pagesRouter = express.Router();

pagesRouter.get('/', asyncHandler(getItems));
pagesRouter.get('/fix-entries', asyncHandler(fixEntries));
pagesRouter.get('/duplicates', asyncHandler(listDuplicates));

import express from 'express';

import { patchItems } from '../features/images/patchItems.js';
import { getItems } from '../features/images/getItems.js';
import { getItemsEdit } from '../features/images/getItemsEdit.js';
import { getFolders } from '../features/images/getFolders.js';
import { getFixFileNames } from '../features/images/getFixFileNames.js';
import { getReindex } from '../features/images/getReindex.js';
import { getScan } from '../features/images/getScan.js';
import { getListDuplicates } from '../features/images/getListDuplicates.js';

export const imagesRouter = express.Router();

imagesRouter.get('/', getItems);
imagesRouter.get('/edit', getItemsEdit);
imagesRouter.get('/fix-file-names', getFixFileNames);
imagesRouter.get('/folders', getFolders);
imagesRouter.get('/list-duplicates', getListDuplicates);
imagesRouter.get('/reindex', getReindex);
imagesRouter.get('/scan', getScan);
imagesRouter.patch('/', patchItems);

import express from 'express';

import { patchItems } from '../feature/images/patchItems.js';
import { getItems } from '../feature/images/getItems.js';
import { getItemsEdit } from '../feature/images/getItemsEdit.js';
import { getFolders } from '../feature/images/getFolders.js';
import { getFixFileNames } from '../feature/images/getFixFileNames.js';
import { getReindex } from '../feature/images/getReindex.js';
import { getScan } from '../feature/images/getScan.js';
import { getListDuplicates } from '../feature/images/getListDuplicates.js';

export const imagesRouter = express.Router();

imagesRouter.get('/', getItems);
imagesRouter.get('/edit', getItemsEdit);
imagesRouter.get('/fix-file-names', getFixFileNames);
imagesRouter.get('/folders', getFolders);
imagesRouter.get('/list-duplicates', getListDuplicates);
imagesRouter.get('/reindex', getReindex);
imagesRouter.get('/scan', getScan);
imagesRouter.patch('/', patchItems);

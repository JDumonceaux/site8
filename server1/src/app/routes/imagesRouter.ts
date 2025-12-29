import express from 'express';

import { getFixFileNames } from '../../features/images/getFixFileNames.js';
import { getFolders } from '../../features/images/getFolders.js';
import { getItems } from '../../features/images/getItems.js';
import { getItemsEdit } from '../../features/images/getItemsEdit.js';
import { getListDuplicates } from '../../features/images/getListDuplicates.js';
import { getReindex } from '../../features/images/getReindex.js';
import { getScan } from '../../features/images/getScan.js';
import { patchItems } from '../../features/images/patchItems.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const imagesRouter = express.Router();

imagesRouter.get('/', asyncHandler(getItems));
imagesRouter.get('/edit', asyncHandler(getItemsEdit));
imagesRouter.get('/fix-file-names', asyncHandler(getFixFileNames));
imagesRouter.get('/folders', asyncHandler(getFolders));
imagesRouter.get('/list-duplicates', asyncHandler(getListDuplicates));
imagesRouter.get('/reindex', asyncHandler(getReindex));
imagesRouter.get('/scan', asyncHandler(getScan));
imagesRouter.patch('/', asyncHandler(patchItems));

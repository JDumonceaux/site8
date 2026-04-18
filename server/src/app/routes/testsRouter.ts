import { Router } from 'express';

import { addItem } from '../../feature/test/addItem.js';
import { deleteItem } from '../../feature/test/deleteItem.js';
import { getItem } from '../../feature/test/getItem.js';
import { updateItem } from '../../feature/test/updateItem.js';
import { getGroups } from '../../feature/tests/getGroups.js';
import { getTestsSorted } from '../../feature/tests/getItems.js';
import { getSections } from '../../feature/tests/getSections.js';
import { getTests } from '../../feature/tests/getTests.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const routeConfig = { mutations: true, path: '/api/tests' } as const;

const testsRouter = Router();

testsRouter.get('/', asyncHandler(getTests));
testsRouter.get('/sorted', asyncHandler(getTestsSorted));
testsRouter.get('/sections', asyncHandler(getSections));
testsRouter.get('/groups', asyncHandler(getGroups));
testsRouter.post('/', asyncHandler(addItem));
testsRouter.get<{ id: string }>('/:id', asyncHandler(getItem));
testsRouter.put<{ id: string }>('/:id', asyncHandler(updateItem));
testsRouter.delete<{ id: string }>('/:id', asyncHandler(deleteItem));

export { testsRouter };

import { Router } from 'express';

import { addItem } from '../../features/test/addItem.js';
import { deleteItem } from '../../features/test/deleteItem.js';
import { getItem } from '../../features/test/getItem.js';
import { updateItem } from '../../features/test/updateItem.js';
import { getGroups } from '../../features/tests/getGroups.js';
import { getItems } from '../../features/tests/getItems.js';
import { asyncHandler } from '../../utils/routerUtils.js';

const testsRouter = Router();

testsRouter.get('/', getItems);
testsRouter.get('/groups', getGroups);
testsRouter.post('/', asyncHandler(addItem));
testsRouter.get<{ id: string }>('/:id', asyncHandler(getItem));
testsRouter.put<{ id: string }>('/:id', asyncHandler(updateItem));
testsRouter.delete<{ id: string }>('/:id', asyncHandler(deleteItem));

export { testsRouter };

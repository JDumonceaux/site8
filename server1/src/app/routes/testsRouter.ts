import { Router } from 'express';

import { getItems } from '../../features/tests/getItems.js';
import { getItemsAi } from '../../features/tests/getItemsAi.js';
import { updateItemsAi } from '../../features/tests/updateItemsAi.js';
import { asyncHandler } from '../../utils/routerUtils.js';

const testsRouter = Router();

testsRouter.get('/', getItems);
testsRouter.get('/ai', getItemsAi);
testsRouter.put('/ai', asyncHandler(updateItemsAi));

export { testsRouter };

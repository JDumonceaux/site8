import { Router } from 'express';

import { getItems } from '../../features/tests/getItems.js';
import { getItemsAi } from '../../features/tests/getItemsAi.js';

const testsRouter = Router();

testsRouter.get('/', getItems);
testsRouter.get('/ai', getItemsAi);

export { testsRouter };

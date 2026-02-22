import { Router } from 'express';

import { runGeminiImageTest } from '../../features/gemini/testGeminiImage.js';
import { runGeminiTest } from '../../features/gemini/testGemini.js';
import { asyncHandler } from '../../utils/routerUtils.js';

const geminiRouter = Router();

geminiRouter.get('/test', asyncHandler(runGeminiTest));
geminiRouter.get('/test/image', asyncHandler(runGeminiImageTest));

export { geminiRouter };

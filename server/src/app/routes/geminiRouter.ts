import { Router } from 'express';

import { runGeminiTest } from '../../features/ai/gemini/testGemini.js';
import { runGeminiImageTest } from '../../features/ai/gemini/testGeminiImage.js';
import { asyncHandler } from '../../utils/routerUtils.js';

const geminiRouter = Router();

geminiRouter.get('/test', asyncHandler(runGeminiTest));
geminiRouter.get('/test/image', asyncHandler(runGeminiImageTest));

export { geminiRouter };

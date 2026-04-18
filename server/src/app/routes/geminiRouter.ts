import { Router } from 'express';
import RateLimit from 'express-rate-limit';

import { runGeminiTest } from '../../feature/ai/gemini/testGemini.js';
import { runGeminiImageTest } from '../../feature/ai/gemini/testGeminiImage.js';
import { asyncHandler } from '../../utils/routerUtils.js';

export const routeConfig = { path: '/api/gemini' } as const;

// Strict per-IP limiter — Gemini calls are expensive and slow (30+ s each)
const geminiLimiter = RateLimit({
  legacyHeaders: false,
  max: 5,
  message: 'Too many AI requests. Please wait before trying again.',
  standardHeaders: 'draft-7',
  statusCode: 429,
  windowMs: 60 * 1000, // 1 minute
});

const geminiRouter = Router();

geminiRouter.use(geminiLimiter);
geminiRouter.get('/test', asyncHandler(runGeminiTest));
geminiRouter.get('/test/image', asyncHandler(runGeminiImageTest));

export { geminiRouter };

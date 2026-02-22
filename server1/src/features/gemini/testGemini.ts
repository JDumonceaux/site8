import type { Request, Response } from 'express';

import { internalError, ok } from '../../lib/http/ResponseHelper.js';
import {
  GEMINI_PERMISSION_ERROR_MESSAGE,
  isGeminiPermissionError,
} from '../../utils/geminiErrors.js';
import { Logger } from '../../utils/logger.js';
import { testGemini } from '../../services/geminiTestService.js';

type GeminiTestResponse = {
  readonly ok: true;
  readonly result: string;
};

type GeminiTestErrorResponse = {
  readonly error: string;
};

export const runGeminiTest = async (
  _req: Request,
  res: Response<GeminiTestResponse | GeminiTestErrorResponse>,
): Promise<void> => {
  try {
    const result = await testGemini();
    ok(
      res,
      {
        ok: true,
        result,
      },
      'Gemini:runGeminiTest',
    );
  } catch (error) {
    if (isGeminiPermissionError(error)) {
      Logger.warn('Gemini:runGeminiTest: Permission denied from Gemini API');
      res.status(403).json({
        error: GEMINI_PERMISSION_ERROR_MESSAGE,
      });
      return;
    }

    internalError(res, 'Gemini:runGeminiTest', error, {
      error: 'Failed to run Gemini test',
    });
  }
};

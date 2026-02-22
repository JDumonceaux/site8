import type { Request, Response } from 'express';
import { readFile } from 'fs/promises';

import { internalError, ok } from '../../lib/http/ResponseHelper.js';
import { testGeminiImage } from '../../services/geminiTestService.js';
import { env } from '../../utils/env.js';
import {
  GEMINI_PERMISSION_ERROR_MESSAGE,
  isGeminiPermissionError,
} from '../../utils/geminiErrors.js';
import {
  getImageMimeType,
  parseImageSrc,
  resolveSafeImagePath,
} from '../../utils/imageUtils.js';
import { isResponseClosed } from '../../utils/httpUtils.js';
import { Logger } from '../../utils/logger.js';

const TEST_IMAGE_SRC = '/images/2024/baroque_palace_gallery.jpg';

type GeminiImageTestErrorResponse = {
  readonly error: string;
};

type GeminiImageTestResponse = {
  readonly description: string;
  readonly ok: true;
  readonly title: string;
};

const GEMINI_IMAGE_TIMEOUT_MS = 60_000;

export const runGeminiImageTest = async (
  req: Request,
  res: Response<GeminiImageTestResponse | GeminiImageTestErrorResponse>,
): Promise<void> => {
  req.setTimeout(GEMINI_IMAGE_TIMEOUT_MS);
  res.setTimeout(GEMINI_IMAGE_TIMEOUT_MS);

  const src = TEST_IMAGE_SRC;

  if (!env.GEMINI_API_KEY) {
    internalError(
      res,
      'Gemini:runGeminiImageTest',
      new Error('GEMINI_API_KEY is not configured'),
      { error: 'Gemini image test is not configured' },
    );
    return;
  }

  const parsedImageSrc = parseImageSrc(src);
  if (!parsedImageSrc) {
    internalError(
      res,
      'Gemini:runGeminiImageTest',
      new Error('Configured test image src is invalid'),
      { error: 'Gemini image test configuration is invalid' },
    );
    return;
  }

  const fullImagePath = resolveSafeImagePath(parsedImageSrc.relativePath);
  if (!fullImagePath) {
    internalError(
      res,
      'Gemini:runGeminiImageTest',
      new Error('Configured test image path is invalid'),
      { error: 'Gemini image test configuration is invalid' },
    );
    return;
  }

  try {
    const buffer = await readFile(fullImagePath);
    const imageBase64 = buffer.toString('base64');
    const mimeType = getImageMimeType(fullImagePath);
    const result = await testGeminiImage(imageBase64, mimeType);

    if (isResponseClosed(req, res)) return;

    ok(
      res,
      {
        description: result.description,
        ok: true,
        title: result.title,
      },
      'Gemini:runGeminiImageTest',
    );
  } catch (error) {
    if (isResponseClosed(req, res)) return;

    if (isGeminiPermissionError(error)) {
      Logger.warn(
        'Gemini:runGeminiImageTest: Permission denied from Gemini API',
      );
      res.status(403).json({ error: GEMINI_PERMISSION_ERROR_MESSAGE });
      return;
    }

    internalError(res, 'Gemini:runGeminiImageTest', error, {
      error: 'Failed to run Gemini image test',
    });
  }
};

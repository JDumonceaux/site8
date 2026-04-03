import type { Request, Response } from 'express';

import { readFile } from 'fs/promises';

import {
  badRequest,
  internalError,
  ok,
} from '../../lib/http/ResponseHelper.js';
import { identifyGeminiImage } from '../../services/ai/geminiTestService.js';
import { Logger } from '../../utils/logger.js';
import {
  GEMINI_PERMISSION_ERROR_MESSAGE,
  isGeminiPermissionError,
} from '../ai/gemini/utils/geminiErrors.js';
import {
  getImageMimeType,
  parseImageSrc as parseImageSource,
  resolveSafeImagePath,
} from '../images/imageUtils.js';

type IdentifyItemRequestBody = {
  readonly src?: string;
};

type IdentifyItemResponse = {
  readonly description?: string;
  readonly ok: boolean;
  readonly result: string;
  readonly status: 'returned';
  readonly title?: string;
};

export const identifyItem = async (
  req: Request,
  res: Response<IdentifyItemResponse | { error: string }>,
): Promise<void> => {
  const IDENTIFY_TIMEOUT_MS = 60_000;
  Logger.debug('Identify request start', {
    method: req.method,
    src: (req.body as IdentifyItemRequestBody | undefined)?.src,
    timeoutMs: IDENTIFY_TIMEOUT_MS,
    url: req.url,
  });
  req.setTimeout(IDENTIFY_TIMEOUT_MS);
  res.setTimeout(IDENTIFY_TIMEOUT_MS);

  const body = req.body as IdentifyItemRequestBody;
  const source = body.src?.trim();

  if (!source) {
    Logger.debug('Identify validation failed: missing src');
    badRequest(res, 'src is required', 'Images:identifyItem');
    return;
  }

  const parsed = parseImageSource(source);
  if (!parsed) {
    Logger.debug('Identify validation failed: invalid src', { src: source });
    badRequest(res, 'Invalid image src', 'Images:identifyItem');
    return;
  }

  const fullImagePath = resolveSafeImagePath(parsed.relativePath);
  if (!fullImagePath) {
    Logger.debug('Identify validation failed: unsafe image path', {
      src: source,
    });
    badRequest(res, 'Invalid image path', 'Images:identifyItem');
    return;
  }

  const abortController = new AbortController();
  const cancelGeminiRequest = (): void => {
    if (!abortController.signal.aborted) {
      abortController.abort();
    }
    Logger.debug('Identify request aborted or closed', {
      method: req.method,
      src: source,
      url: req.url,
    });
  };

  req.once('aborted', cancelGeminiRequest);
  res.once('close', cancelGeminiRequest);

  try {
    Logger.debug('Identify: reading image file', { fullImagePath });
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- path is validated by resolveSafeImagePath against IMAGES_DIR
    const buffer = await readFile(fullImagePath);
    const imageBase64 = buffer.toString('base64');
    const mimeType = getImageMimeType(parsed.fileName);

    Logger.debug('Identify: calling Gemini', { mimeType, src: source });
    const { description, title, rawText } = await identifyGeminiImage(
      imageBase64,
      mimeType,
    );

    Logger.debug('Identify: Gemini responded', {
      responseText: rawText,
      src: source,
    });

    if (res.headersSent || res.destroyed) {
      return;
    }

    res.off('close', cancelGeminiRequest);
    ok(
      res,
      {
        description,
        ok: true,
        result: rawText,
        status: 'returned',
        title,
      },
      'Images:identifyItem',
    );
    Logger.debug('Identify response sent', {
      method: req.method,
      src: source,
      url: req.url,
    });
  } catch (error) {
    if (res.headersSent || res.destroyed) {
      return;
    }

    if (isGeminiPermissionError(error)) {
      Logger.warn('Images:identifyItem: Permission denied from Gemini API');
      res.status(403).json({
        error: GEMINI_PERMISSION_ERROR_MESSAGE,
      });
      return;
    }

    internalError(res, 'Images:identifyItem', error, {
      error: 'Failed to identify image',
    });
    Logger.debug('Identify error response sent', {
      error: error instanceof Error ? error.message : String(error),
      method: req.method,
      src: source,
      url: req.url,
    });
  }
};

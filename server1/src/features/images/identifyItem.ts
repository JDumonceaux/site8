import type { Request, Response } from 'express';

// import FilePath from '../../lib/filesystem/FilePath.js';
import {
  badRequest,
  internalError,
  ok,
} from '../../lib/http/ResponseHelper.js';
import {
  GEMINI_PERMISSION_ERROR_MESSAGE,
  isGeminiPermissionError,
} from '../../utils/geminiErrors.js';
import { getImageMimeType, parseImageSrc } from '../../utils/imageUtils.js';
import { Logger } from '../../utils/logger.js';
import { testGemini } from '../../services/geminiTestService.js';
import { env } from '../../utils/env.js';

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

// type GeminiContentPart = {
//   readonly text?: string;
// };

// type GeminiCandidate = {
//   readonly content?: {
//     readonly parts?: readonly GeminiContentPart[];
//   };
// };

// type GeminiGenerateResponse = {
//   readonly candidates?: readonly GeminiCandidate[];
// };

// const parseInlineField = (
//   lineValue: string,
//   fieldName: 'description' | 'title',
// ): string | undefined => {
//   const normalizedLine = lineValue.trim();
//   const prefix = `${fieldName}:`;
//
//   if (!normalizedLine.toLowerCase().startsWith(prefix)) {
//     return undefined;
//   }
//
//   const parsedValue = normalizedLine.slice(prefix.length).trim();
//   return parsedValue || undefined;
// };

const isResponseClosed = (req: Request, res: Response): boolean => {
  return (
    req.aborted ||
    req.destroyed ||
    res.headersSent ||
    res.writableEnded ||
    res.destroyed
  );
};

export const identifyItem = async (
  req: Request,
  res: Response<IdentifyItemResponse | { error: string }>,
): Promise<void> => {
  const IDENTIFY_TIMEOUT_MS = 60_000;
  Logger.debug('Identify request start', {
    src: req.body?.src,
    method: req.method,
    url: req.url,
    timeoutMs: IDENTIFY_TIMEOUT_MS,
  });
  req.setTimeout(IDENTIFY_TIMEOUT_MS);
  res.setTimeout(IDENTIFY_TIMEOUT_MS);

  const body = req.body as IdentifyItemRequestBody;
  const src = body.src?.trim();

  if (!src) {
    Logger.debug('Identify validation failed: missing src');
    badRequest(res, 'src is required', 'Images:identifyItem');
    return;
  }

  if (!env.GEMINI_API_KEY) {
    Logger.debug('Identify validation failed: missing GEMINI_API_KEY');
    internalError(
      res,
      'Images:identifyItem',
      new Error('GEMINI_API_KEY is not configured'),
      { error: 'Image identification is not configured' },
    );
    return;
  }

  const parsed = parseImageSrc(src);
  if (!parsed) {
    Logger.debug('Identify validation failed: invalid src', { src });
    badRequest(res, 'Invalid image src', 'Images:identifyItem');
    return;
  }

  const abortController = new AbortController();
  const cancelGeminiRequest = (): void => {
    if (!abortController.signal.aborted) {
      abortController.abort();
    }
    Logger.debug('Identify request aborted or closed', {
      src,
      method: req.method,
      url: req.url,
    });
  };

  // Declare mimeType before usage
  const mimeType = getImageMimeType(parsed.fileName);

  req.once('aborted', cancelGeminiRequest);
  req.once('close', cancelGeminiRequest);

  try {
    Logger.debug('Identify Gemini test service start', {
      src,
      fileName: parsed.fileName,
      folder: parsed.folder,
      mimeType,
    });
    const result = await testGemini();
    Logger.debug('Identify Gemini test service finished', { src, result });
    if (isResponseClosed(req, res)) {
      return;
    }
    ok(
      res,
      {
        title: 'Gemini Test',
        description: result,
        ok: true,
        result,
        status: 'returned',
      },
      'Images:identifyItem',
    );
    Logger.debug('Identify response sent', {
      src,
      method: req.method,
      url: req.url,
    });
    return;
  } catch (error) {
    if (isResponseClosed(req, res)) {
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
      src,
      method: req.method,
      url: req.url,
      error: error instanceof Error ? error.message : String(error),
    });
    return;
  }
};

import type { Request, Response } from 'express';

import { readFile } from 'fs/promises';

import { GoogleGenAI } from '@google/genai';

import {
  badRequest,
  internalError,
  ok,
} from '../../lib/http/ResponseHelper.js';
import { env } from '../../utils/env.js';
import { Logger } from '../../utils/logger.js';
import {
  GEMINI_PERMISSION_ERROR_MESSAGE,
  isGeminiPermissionError,
} from '../ai/gemini/utils/geminiErrors.js';
import {
  getImageMimeType,
  parseImageSrc,
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

type IdentifyImageResult = {
  readonly description: string;
  readonly title: string;
};

const stripMarkdownCodeFences = (text: string): string => {
  const match = /^```(?:json)?[ \t]*\n(?<content>[\s\S]*?)\n```[ \t]*$/.exec(
    text,
  );
  return match?.groups?.content?.trim() ?? text;
};

const parseIdentifyResult = (responseText: string): IdentifyImageResult => {
  const normalizedText = stripMarkdownCodeFences(responseText.trim());

  try {
    const parsed = JSON.parse(normalizedText) as {
      readonly description?: unknown;
      readonly title?: unknown;
    };

    if (
      typeof parsed.title === 'string' &&
      parsed.title.trim().length > 0 &&
      typeof parsed.description === 'string' &&
      parsed.description.trim().length > 0
    ) {
      return {
        description: parsed.description.trim(),
        title: parsed.title.trim(),
      };
    }
  } catch {
    // no-op
  }

  const titleMatch = /^title[ \t]*:[ \t]*(?<value>\S.*)$/im.exec(
    normalizedText,
  );
  const descriptionMatch = /^description[ \t]*:[ \t]*(?<value>\S.*)$/im.exec(
    normalizedText,
  );

  return {
    description: descriptionMatch?.groups?.value?.trim() ?? normalizedText,
    title: titleMatch?.groups?.value?.trim() ?? 'Untitled',
  };
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

  const fullImagePath = resolveSafeImagePath(parsed.relativePath);
  if (!fullImagePath) {
    Logger.debug('Identify validation failed: unsafe image path', { src });
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
      src,
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

    Logger.debug('Identify: calling Gemini', { mimeType, src });
    const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      contents: [
        {
          parts: [
            {
              text: 'Identify this image and return ONLY valid JSON with exactly two fields: {"title":"...","description":"..."}. Keep title concise and description to 1-3  sentences.',
            },
            {
              inlineData: {
                data: imageBase64,
                mimeType,
              },
            },
          ],
          role: 'user',
        },
      ],
      model: env.GEMINI_MODEL,
    });

    if (
      typeof response.text !== 'string' ||
      response.text.trim().length === 0
    ) {
      throw new Error('Gemini returned an empty response for image analysis');
    }

    Logger.debug('Identify: Gemini responded', {
      responseText: response.text,
      src,
    });

    if (res.headersSent || res.destroyed) {
      return;
    }

    const { description, title } = parseIdentifyResult(response.text);
    res.off('close', cancelGeminiRequest);
    ok(
      res,
      {
        description,
        ok: true,
        result: response.text,
        status: 'returned',
        title,
      },
      'Images:identifyItem',
    );
    Logger.debug('Identify response sent', {
      method: req.method,
      src,
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
      src,
      url: req.url,
    });
  }
};

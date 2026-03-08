import { GoogleGenAI } from '@google/genai';

import { env } from '../../utils/env.js';

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

type GeminiImageResult = {
  readonly description: string;
  readonly title: string;
};

const stripMarkdownCodeFences = (text: string): string => {
  const match = /^```(?:json)?[ \t]*\n(?<content>[\s\S]*?)\n```[ \t]*$/.exec(
    text,
  );
  return match?.groups?.content?.trim() ?? text;
};

const parseGeminiImageResult = (responseText: string): GeminiImageResult => {
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

export const testGemini = async (): Promise<string> => {
  const response = await ai.models.generateContent({
    contents: 'Explain how AI works in a few words',
    model: env.GEMINI_MODEL,
  });
  // response.text may not exist; check response structure
  if (typeof response.text === 'string') {
    return response.text;
  }
  // Fallback: stringify response
  return JSON.stringify(response);
};

export const testGeminiImage = async (
  imageBase64: string,
  mimeType: string,
): Promise<GeminiImageResult> => {
  const response = await ai.models.generateContent({
    contents: [
      {
        parts: [
          {
            text: 'Analyze this image and return ONLY valid JSON with exactly two fields: {"title":"...","description":"..."}. Keep title concise and description to 1-2 sentences.',
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

  if (typeof response.text !== 'string' || response.text.trim().length === 0) {
    throw new Error('Gemini returned an empty response for image analysis');
  }

  return parseGeminiImageResult(response.text);
};
// moved from ../geminiTestService.ts
// ...existing code...

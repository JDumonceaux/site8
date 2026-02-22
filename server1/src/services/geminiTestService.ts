import { GoogleGenAI } from '@google/genai';

import { env } from '../utils/env.js';

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

type GeminiImageResult = {
  readonly description: string;
  readonly title: string;
};

const parseGeminiImageResult = (responseText: string): GeminiImageResult => {
  const normalizedText = responseText.trim();

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

  const titleMatch = normalizedText.match(/^title\s*:\s*(.+)$/im);
  const descriptionMatch = normalizedText.match(/^description\s*:\s*(.+)$/im);

  return {
    description: descriptionMatch?.[1]?.trim() ?? normalizedText,
    title: titleMatch?.[1]?.trim() ?? 'Untitled',
  };
};

export async function testGemini(): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: 'Explain how AI works in a few words',
  });
  // response.text may not exist; check response structure
  if (typeof response.text === 'string') {
    return response.text;
  }
  // Fallback: stringify response
  return JSON.stringify(response);
}

export async function testGeminiImage(
  imageBase64: string,
  mimeType: string,
): Promise<GeminiImageResult> {
  const response = await ai.models.generateContent({
    model: env.GEMINI_MODEL,
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
  });

  if (typeof response.text !== 'string' || response.text.trim().length === 0) {
    throw new Error('Gemini returned an empty response for image analysis');
  }

  return parseGeminiImageResult(response.text);
}

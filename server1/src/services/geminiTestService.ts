import { GoogleGenAI } from '@google/genai';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

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

// Example usage (for manual testing)
if (require.main === module) {
  testGemini()
    .then((result) => {
      console.log('Gemini test result:', result);
    })
    .catch((err) => {
      console.error('Gemini test error:', err);
    });
}

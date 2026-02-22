export const GEMINI_PERMISSION_ERROR_MESSAGE =
  'Gemini API rejected the request. Update GEMINI_API_KEY with a valid key.';

export const isGeminiPermissionError = (error: unknown): boolean => {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message;
  return (
    message.includes('PERMISSION_DENIED') ||
    message.includes('"code":403') ||
    message.includes('API key was reported as leaked')
  );
};

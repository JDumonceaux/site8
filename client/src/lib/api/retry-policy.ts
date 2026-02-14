import { ApiError } from './types';

export const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);

export const delay = async (ms: number): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const shouldRetry = (error: unknown): boolean => {
  if (error instanceof ApiError) {
    return RETRYABLE_STATUS_CODES.has(error.status);
  }

  return error instanceof TypeError;
};

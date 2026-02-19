import type { ApiRequestOptions } from './types';

type JsonRecord = Record<string, unknown>;

const isJsonRecord = (value: unknown): value is JsonRecord => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

const isBodyInitLike = (value: unknown): value is BodyInit => {
  return (
    typeof value === 'string' ||
    value instanceof Blob ||
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    value instanceof ReadableStream ||
    value instanceof ArrayBuffer
  );
};

export const buildBody = (
  body: ApiRequestOptions['body'],
  headers: Headers,
): BodyInit | null | undefined => {
  if (body === undefined || body === null) {
    return body;
  }

  if (isBodyInitLike(body)) {
    return body;
  }

  if (isJsonRecord(body)) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    return JSON.stringify(body);
  }

  return body as BodyInit;
};

export const mergeHeaders = (
  defaultHeaders: HeadersInit,
  requestHeaders: HeadersInit | undefined,
): Headers => {
  const headers = new Headers(defaultHeaders);
  const optionHeaders = new Headers(requestHeaders);
  for (const [key, value] of optionHeaders.entries()) {
    headers.set(key, value);
  }
  return headers;
};

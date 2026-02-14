import { logError } from '@lib/utils/errorHandler';

import {
  type ApiClientConfig,
  type ApiErrorInterceptor,
  ApiError,
  type ApiMethod,
  type ApiRequestContext,
  type ApiRequestInterceptor,
  type ApiRequestOptions,
  type ApiResponseInterceptor,
} from './types';

const DEFAULT_RETRY_DELAY_MS = 300;
const DEFAULT_RETRY_RETRIES = 1;
const DEFAULT_TIMEOUT_MS = 10_000;
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);

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

const delay = async (ms: number): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const shouldRetry = (error: unknown): boolean => {
  if (error instanceof ApiError) {
    return RETRYABLE_STATUS_CODES.has(error.status);
  }

  return error instanceof TypeError;
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
  if (contentType.includes('application/json')) {
    return response.json() as Promise<unknown>;
  }

  const text = await response.text();
  return text.length > 0 ? text : null;
};

const buildBody = (
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

const toApiError = async (
  response: Response,
  method: ApiMethod,
  url: string,
): Promise<ApiError> => {
  const body = await parseResponseBody(response);

  return new ApiError({
    body,
    message: `Request failed: ${method} ${url} (${response.status} ${response.statusText})`,
    method,
    status: response.status,
    statusText: response.statusText,
    url,
  });
};

class ApiClient {
  private readonly _config: Required<ApiClientConfig>;
  private readonly _errorInterceptors: ApiErrorInterceptor[] = [];
  private readonly _requestInterceptors: ApiRequestInterceptor[] = [];
  private readonly _responseInterceptors: ApiResponseInterceptor[] = [];

  public constructor(config: ApiClientConfig = {}) {
    this._config = {
      defaultHeaders: config.defaultHeaders ?? {},
      retryDelayMs: config.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS,
      retryRetries: config.retryRetries ?? DEFAULT_RETRY_RETRIES,
      timeoutMs: config.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    };
  }

  public useErrorInterceptor(interceptor: ApiErrorInterceptor): void {
    this._errorInterceptors.push(interceptor);
  }

  public useRequestInterceptor(interceptor: ApiRequestInterceptor): void {
    this._requestInterceptors.push(interceptor);
  }

  public useResponseInterceptor(interceptor: ApiResponseInterceptor): void {
    this._responseInterceptors.push(interceptor);
  }

  public async delete<TResponse = unknown>(
    url: string,
    options: ApiRequestOptions = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: 'DELETE' });
  }

  public async get<TResponse = unknown>(
    url: string,
    options: ApiRequestOptions = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: 'GET' });
  }

  public async patch<TResponse = unknown>(
    url: string,
    body?: ApiRequestOptions['body'],
    options: ApiRequestOptions = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, body, method: 'PATCH' });
  }

  public async post<TResponse = unknown>(
    url: string,
    body?: ApiRequestOptions['body'],
    options: ApiRequestOptions = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, body, method: 'POST' });
  }

  public async put<TResponse = unknown>(
    url: string,
    body?: ApiRequestOptions['body'],
    options: ApiRequestOptions = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, body, method: 'PUT' });
  }

  public async request<TResponse = unknown>(
    url: string,
    options: ApiRequestOptions = {},
  ): Promise<TResponse> {
    const method = options.method ?? 'GET';
    const retryRetries = options.retries ?? this._config.retryRetries;
    const retryDelayMs = options.retryDelayMs ?? this._config.retryDelayMs;

    for (let attempt = 0; attempt <= retryRetries; attempt += 1) {
      const timeoutMs = options.timeoutMs ?? this._config.timeoutMs;
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => {
        abortController.abort(
          new Error(`Request timeout after ${timeoutMs}ms`),
        );
      }, timeoutMs);

      if (options.signal) {
        options.signal.addEventListener(
          'abort',
          () => {
            abortController.abort(options.signal?.reason);
          },
          { once: true },
        );
      }

      const headers = new Headers(this._config.defaultHeaders);
      const optionHeaders = new Headers(options.headers);
      optionHeaders.forEach((value, key) => {
        headers.set(key, value);
      });

      const init: RequestInit = {
        ...options,
        body: buildBody(options.body, headers),
        headers,
        method,
        signal: abortController.signal,
      };

      let context: ApiRequestContext = { init, url };

      try {
        for (const interceptor of this._requestInterceptors) {
          context = await interceptor(context);
        }

        let response = await fetch(context.url, context.init);

        for (const interceptor of this._responseInterceptors) {
          response = await interceptor(response, context);
        }

        if (!response.ok) {
          throw await toApiError(response, method, context.url);
        }

        clearTimeout(timeoutId);

        if (response.status === 204) {
          return undefined as TResponse;
        }

        return (await parseResponseBody(response)) as TResponse;
      } catch (error) {
        clearTimeout(timeoutId);

        const hasRetryAttemptsLeft = attempt < retryRetries;
        if (hasRetryAttemptsLeft && shouldRetry(error)) {
          await delay(retryDelayMs);
          continue;
        }

        for (const interceptor of this._errorInterceptors) {
          await interceptor(error, context);
        }

        logError(error, {
          componentName: 'ApiClient',
          method,
          url,
        });

        throw error;
      }
    }

    throw new Error(`Unexpected API client state for ${method} ${url}`);
  }
}

export const apiClient = new ApiClient();

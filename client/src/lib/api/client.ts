import { logError } from '@lib/utils/errorHandler';
import { buildBody, mergeHeaders } from './request-builder';
import { parseResponseBody, toApiError } from './response-parser';
import { delay, shouldRetry } from './retry-policy';
import type {
  ApiClientConfig,
  ApiErrorInterceptor,
  ApiRequestContext,
  ApiRequestInterceptor,
  ApiRequestOptions,
  ApiResponseInterceptor,
} from './types';

const DEFAULT_RETRY_DELAY_MS = 300;
const DEFAULT_RETRY_RETRIES = 1;
const DEFAULT_TIMEOUT_MS = 10_000;

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

      const headers = mergeHeaders(
        this._config.defaultHeaders,
        options.headers,
      );

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

  public useErrorInterceptor(interceptor: ApiErrorInterceptor): void {
    this._errorInterceptors.push(interceptor);
  }

  public useRequestInterceptor(interceptor: ApiRequestInterceptor): void {
    this._requestInterceptors.push(interceptor);
  }

  public useResponseInterceptor(interceptor: ApiResponseInterceptor): void {
    this._responseInterceptors.push(interceptor);
  }
}

export const apiClient = new ApiClient();

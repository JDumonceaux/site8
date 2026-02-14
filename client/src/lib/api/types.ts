export type ApiMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export type ApiRequestContext = {
  readonly init: RequestInit;
  readonly url: string;
};

export type ApiRequestInterceptor = (
  context: ApiRequestContext,
) => ApiRequestContext | Promise<ApiRequestContext>;

export type ApiResponseInterceptor = (
  response: Response,
  context: ApiRequestContext,
) => Promise<Response> | Response;

export type ApiErrorInterceptor = (
  error: unknown,
  context: ApiRequestContext,
) => Promise<void> | void;

export type ApiRequestOptions = Omit<
  RequestInit,
  'body' | 'headers' | 'method'
> & {
  readonly body?: BodyInit | null | Record<string, unknown>;
  readonly headers?: HeadersInit;
  readonly method?: ApiMethod;
  readonly retries?: number;
  readonly retryDelayMs?: number;
  readonly signal?: AbortSignal;
  readonly timeoutMs?: number;
};

export type ApiClientConfig = {
  readonly defaultHeaders?: HeadersInit;
  readonly retryDelayMs?: number;
  readonly retryRetries?: number;
  readonly timeoutMs?: number;
};

export class ApiError extends Error {
  public readonly body: unknown;
  public readonly method: ApiMethod;
  public readonly status: number;
  public readonly statusText: string;
  public readonly url: string;

  public constructor(params: {
    body: unknown;
    message: string;
    method: ApiMethod;
    status: number;
    statusText: string;
    url: string;
  }) {
    super(params.message);
    this.name = 'ApiError';
    this.body = params.body;
    this.method = params.method;
    this.status = params.status;
    this.statusText = params.statusText;
    this.url = params.url;
  }
}

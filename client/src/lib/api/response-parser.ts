import { ApiError, type ApiMethod } from './types';

export const parseResponseBody = async (
  response: Response,
): Promise<unknown> => {
  const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
  if (contentType.includes('application/json')) {
    return response.json() as Promise<unknown>;
  }

  const text = await response.text();
  return text.length > 0 ? text : null;
};

export const toApiError = async (
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

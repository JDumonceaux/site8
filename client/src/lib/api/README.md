# API Client (`client/src/lib/api`)

Centralized network layer for the client app.

## Why

- Replaces scattered `fetch()` usage with a single typed client
- Keeps React Query hooks focused on cache/state concerns
- Standardizes timeout, retry, and error handling behavior

## Files

- `client.ts` - core `apiClient` implementation
- `types.ts` - shared request/response/error types
- `index.ts` - module exports

## Core Usage

```ts
import { apiClient } from '@lib/api';

const data = await apiClient.get<MyResponse>(url);
await apiClient.post(url, payload);
await apiClient.put(url, payload);
await apiClient.patch(url, payload);
await apiClient.delete(url);
```

## React Query: Query Example

```ts
const useItems = () =>
  useQuery({
    queryKey: ['items'],
    queryFn: ({ signal }) => apiClient.get<ItemsResponse>(endpoint, { signal }),
  });
```

## React Query: Mutation Example

```ts
const mutation = useMutation({
  mutationFn: (payload: UpdatePayload) => apiClient.put<UpdateResponse>(endpoint, payload),
});
```

## Interceptors

```ts
import { apiClient } from '@lib/api';

apiClient.useRequestInterceptor((context) => {
  return {
    ...context,
    init: {
      ...context.init,
      headers: {
        ...(context.init.headers ?? {}),
        'X-Client': 'site8',
      },
    },
  };
});

apiClient.useResponseInterceptor((response) => response);

apiClient.useErrorInterceptor((error, context) => {
  console.error('API Error', { error, url: context.url });
});
```

## Request Options

`apiClient` supports optional per-call overrides:

- `signal`
- `timeoutMs`
- `retries`
- `retryDelayMs`
- `headers`
- `method` (for `request`)

Example:

```ts
await apiClient.get(endpoint, {
  retries: 2,
  retryDelayMs: 500,
  timeoutMs: 15000,
});
```

## Error Model

Non-2xx responses throw `ApiError` with:

- `status`
- `statusText`
- `method`
- `url`
- `body`

Use this to provide user-friendly messages in feature hooks.

## Migration Guidance

When moving old code:

1. Replace direct `fetch()` calls with `apiClient` methods
2. Keep React Query query/mutation keys unchanged
3. Preserve existing success/error UI messages
4. Prefer feature-level typing (`apiClient.get<MyType>()`)

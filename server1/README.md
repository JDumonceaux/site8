# server1 API

## Setup

- Install dependencies: `npm install`
- Build: `npm run build`
- Run built server: `npm start`

## Environment

The identify-image endpoint uses Google Gemini and requires these variables:

- `GEMINI_API_KEY` (required for identify requests)
- `GEMINI_MODEL` (optional, defaults to `gemini-2.0-flash`)

Existing runtime variables still apply (`PORT`, `BASE_URL`, `NODE_ENV`, `USE_AUTH`).

## Images Identify API

- Endpoint: `POST /api/images/identify`
- Request body:

```json
{
  "src": "/images/2025/some-folder/photo.jpg"
}
```

- Success response:

```json
{
  "ok": true,
  "status": "returned",
  "result": "Title\n...\n\nDescription\n...",
  "title": "...",
  "description": "..."
}
```

If Gemini is not configured or the request fails, the endpoint returns an error payload with an `error` message.

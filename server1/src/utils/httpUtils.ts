import type { Request, Response } from 'express';

/**
 * Returns true if the response has already been sent or the connection is closed.
 * Use this before sending any response after an async operation to prevent
 * ERR_HTTP_HEADERS_SENT errors when a timeout or abort fires concurrently.
 */
export const isResponseClosed = (req: Request, res: Response): boolean =>
  req.aborted ||
  req.destroyed ||
  res.headersSent ||
  res.writableEnded ||
  res.destroyed;

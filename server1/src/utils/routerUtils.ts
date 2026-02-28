import type { NextFunction, Request, RequestHandler, Response } from 'express';

export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

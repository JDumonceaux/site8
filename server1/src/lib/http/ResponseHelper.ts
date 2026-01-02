import type { Response } from 'express';

import { Logger } from '../../utils/logger.js';

/**
 * Standardized response helper for HTTP handlers
 * Handles common response patterns and logging
 */
export class ResponseHelper {
  /**
   * Sends a 200 OK response with data
   * @param res - Express response object
   * @param data - Data to send
   * @param handlerName - Name of the handler for logging
   * @param itemCount - Optional item count for logging
   */
  public static ok<T>(
    res: Response<T>,
    data: T,
    handlerName: string,
    itemCount?: number,
  ): void {
    if (itemCount !== undefined) {
      Logger.info(`${handlerName}: Successfully retrieved ${itemCount} items`);
    } else {
      Logger.info(`${handlerName}: Successfully retrieved data`);
    }

    res.status(200).json(data);
  }

  /**
   * Sends a 201 Created response with optional Location header and data
   * @param res - Express response object
   * @param resourcePath - Resource path for Location header
   * @param id - Created resource ID
   * @param data - Optional data to return
   */
  public static created<T>(
    res: Response<T>,
    resourcePath: string,
    id: number,
    data?: T,
  ): void {
    res.setHeader('Location', `${resourcePath}/${id}`);

    if (data) {
      res.status(201).json(data);
    } else {
      res.status(201).send();
    }
  }

  /**
   * Sends a 204 No Content response
   * @param res - Express response object
   * @param handlerName - Name of the handler for logging
   * @param reason - Optional reason for 204 (e.g., "No items found")
   */
  public static noContent(
    res: Response,
    handlerName: string,
    reason?: string,
  ): void {
    if (reason) {
      Logger.info(`${handlerName}: ${reason}`);
    }
    res.sendStatus(204);
  }

  /**
   * Sends a 400 Bad Request response
   * @param res - Express response object
   * @param errorMessage - Error message
   * @param handlerName - Name of the handler for logging
   */
  public static badRequest(
    res: Response<{ error: string }>,
    errorMessage: string,
    handlerName?: string,
  ): void {
    if (handlerName) {
      Logger.warn(`${handlerName}: ${errorMessage}`);
    }
    res.status(400).json({ error: errorMessage });
  }

  /**
   * Sends a 404 Not Found response
   * @param res - Express response object
   * @param errorMessage - Error message
   */
  public static notFound(
    res: Response<{ error: string }>,
    errorMessage = 'Item not found',
  ): void {
    res.status(404).json({ error: errorMessage });
  }

  /**
   * Sends a 501 Not Implemented response
   * @param res - Express response object
   * @param errorMessage - Error message describing what is not implemented
   */
  public static notImplemented(
    res: Response<{ error: string }>,
    errorMessage = 'Not implemented',
  ): void {
    Logger.warn(`Not Implemented: ${errorMessage}`);
    res.status(501).json({ error: errorMessage });
  }

  /**
   * Sends a 409 Conflict response
   * @param res - Express response object
   * @param errorMessage - Error message
   */
  public static conflict(
    res: Response<{ error: string }>,
    errorMessage: string,
  ): void {
    res.status(409).json({ error: errorMessage });
  }

  /**
   * Sends a 500 Internal Server Error response with generic error data
   * @param res - Express response object
   * @param handlerName - Name of the handler for logging
   * @param error - The error that occurred
   * @param errorResponse - Optional error response data
   */
  public static internalError<T>(
    res: Response<T>,
    handlerName: string,
    error: unknown,
    errorResponse?: T,
  ): void {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    Logger.error(`${handlerName}: Failed to process request`, {
      error: errorMessage,
    });

    if (errorResponse) {
      res.status(500).json(errorResponse);
    } else {
      res.sendStatus(500);
    }
  }

  /**
   * Checks if service error indicates a "not found" condition
   * @param error - Error to check
   * @returns True if error is a "not found" error
   */
  public static isNotFoundError(error: unknown): boolean {
    return error instanceof Error && error.message.includes('not found');
  }

  /**
   * Checks if service error indicates a validation error
   * @param error - Error to check
   * @returns True if error is a validation error
   */
  public static isValidationError(error: unknown): boolean {
    return error instanceof Error && error.message.includes('validation');
  }

  /**
   * Checks if service error indicates a duplicate/conflict error
   * @param error - Error to check
   * @returns True if error is a duplicate/conflict error
   */
  public static isConflictError(error: unknown): boolean {
    return (
      error instanceof Error &&
      (error.message.includes('duplicate') ||
        error.message.includes('already exists'))
    );
  }
}

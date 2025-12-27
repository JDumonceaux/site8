import type { Request } from 'express';

import { PREFER_HEADER } from '../../utils/constants.js';

/**
 * Handles Prefer header logic for HTTP requests
 * Supports RFC 7240 Prefer header patterns
 */
export class PreferHeaderHandler {
  /**
   * Checks if the Prefer header requests full representation in response
   * @param req - Express request object
   * @returns True if client prefers full representation (return=representation)
   */
  public static wantsRepresentation(req: Request): boolean {
    const prefer = req.get('Prefer');
    return prefer === PREFER_HEADER.REPRESENTATION;
  }

  /**
   * Gets the Prefer header value from the request
   * @param req - Express request object
   * @returns Prefer header value or undefined
   */
  public static getPreferHeader(req: Request): string | undefined {
    return req.get('Prefer');
  }
}

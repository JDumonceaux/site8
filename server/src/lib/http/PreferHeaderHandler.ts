import type { Request } from 'express';

import { PREFER_HEADER } from '../../utils/constants.js';

/**
 * Gets the Prefer header value from the request
 * @param req - Express request object
 * @returns Prefer header value or undefined
 */
export const getPreferHeader = (req: Request): string | undefined =>
  req.get('Prefer');

/**
 * Checks if the Prefer header requests full representation in response
 * @param req - Express request object
 * @returns True if client prefers full representation (return=representation)
 */
export const wantsRepresentation = (req: Request): boolean => {
  const prefer = req.get('Prefer');
  return prefer === PREFER_HEADER.REPRESENTATION;
};

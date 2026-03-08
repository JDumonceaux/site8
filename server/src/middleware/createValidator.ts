import type { NextFunction, Request, Response } from 'express';

import { Logger } from '../utils/logger.js';

type ValidationResult = {
  errorMessage?: string;
  isValid: boolean;
};

type ValidatorConfig = {
  /** Name of the parameter to validate (from req.params) */
  paramName: string;
  /** Custom validation function */
  validate: (value: string) => ValidationResult;
};

/**
 * Factory function to create validation middleware.
 * Consolidates common validation patterns with custom validation logic.
 *
 * @param config - Configuration for the validator
 * @returns Express middleware function
 *
 * @example
 * ```typescript
 * export const requireId = createValidator({
 *   paramName: 'id',
 *   validate: (value) => {
 *     if (!value?.trim()) {
 *       return { isValid: false, errorMessage: 'Id is required' };
 *     }
 *     return { isValid: true };
 *   }
 * });
 * ```
 */
export const createValidator = (config: ValidatorConfig) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const value = req.params[config.paramName] ?? '';

    Logger.debug(
      `Require ${config.paramName} middleware received value=${value}`,
    );

    const result = config.validate(value);

    if (!result.isValid) {
      Logger.warn(
        `Validation failed for ${config.paramName}: ${result.errorMessage}`,
      );
      res.status(400).json({
        error: result.errorMessage ?? `${config.paramName} validation failed`,
      });
      return;
    }

    next();
  };
};

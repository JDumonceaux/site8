import type { Request } from 'express';
import type { ZodType } from 'zod';

/**
 * Result of request validation
 */
export type ValidationResult<T> = {
  /** Validated data if successful */
  data?: T;
  /** Error message if validation failed */
  errorMessage?: string;
  /** Whether validation was successful */
  isValid: boolean;
};

/**
 * Converts string ID fields to numbers in the data object
 * @param data - Data object with potential string IDs
 * @param idFields - Array of field names that should be numbers
 * @returns Result with converted data or error message
 */
export const convertIdsToNumbers = <T extends Record<string, unknown>>(
  data: T,
  idFields: string[] = ['id', 'itemId'],
): ValidationResult<T> => {
  const converted = { ...data } as Record<string, unknown>;

  for (const field of idFields) {
    if (converted[field] && typeof converted[field] === 'string') {
      const num = Number(converted[field]);
      if (isNaN(num)) {
        return {
          errorMessage: `${field} must be a valid number`,
          isValid: false,
        };
      }
      converted[field] = num;
    }
  }

  return {
    data: converted as T,
    isValid: true,
  };
};

/**
 * Validates request body against a Zod schema
 * @param req - Express request object
 * @param schema - Zod schema to validate against
 * @returns Validation result with data or error message
 */
export const validateBody = <T>(
  req: Request,
  schema: ZodType<T>,
): ValidationResult<T> => {
  const validationResult = schema.safeParse(req.body);

  if (!validationResult.success) {
    const errorMessage = validationResult.error.issues
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');

    return {
      errorMessage: `Validation error: ${errorMessage}`,
      isValid: false,
    };
  }

  return {
    data: validationResult.data,
    isValid: true,
  };
};

/**
 * Validates request body with additional data merged in
 * @param req - Express request object
 * @param schema - Zod schema to validate against
 * @param additionalData - Additional data to merge with request body
 * @returns Validation result with data or error message
 */
export const validateBodyWithData = <T>(
  req: Request,
  schema: ZodType<T>,
  additionalData: Record<string, unknown>,
): ValidationResult<T> => {
  const requestData = {
    ...(req.body as Record<string, unknown>),
    ...additionalData,
  };
  const validationResult = schema.safeParse(requestData);

  if (!validationResult.success) {
    const errorMessage = validationResult.error.issues
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');

    return {
      errorMessage: `Validation error: ${errorMessage}`,
      isValid: false,
    };
  }

  return {
    data: validationResult.data,
    isValid: true,
  };
};

/**
 * Validates and parses ID from request body
 * @param body - Request body containing id field
 * @returns Validation result with parsed ID number or error message
 */
export const validateId = (
  body: unknown,
): ValidationResult<void> & { id?: number } => {
  if (!body || typeof body !== 'object' || !('id' in body)) {
    return {
      errorMessage: 'Invalid ID',
      isValid: false,
    };
  }

  const { id } = body as { id: unknown };

  if (!id) {
    return {
      errorMessage: 'Invalid ID',
      isValid: false,
    };
  }

  const idNum = Number(id);
  if (Number.isNaN(idNum) || idNum <= 0) {
    return {
      errorMessage: 'Invalid ID',
      isValid: false,
    };
  }

  return {
    id: idNum,
    isValid: true,
  };
};

/**
 * Validates that ID in URL matches ID in request body
 * @param urlId - ID from URL parameter
 * @param bodyId - ID from request body
 * @returns Validation result
 */
export const validateIdConsistency = (
  urlId: string,
  bodyId?: string | number,
): ValidationResult<void> => {
  if (bodyId == null) {
    return { isValid: true };
  }

  const numUrl = Number(urlId);
  const numBody = Number(bodyId as any);
  if (
    Number.isFinite(numUrl) &&
    Number.isFinite(numBody) &&
    numUrl === numBody
  ) {
    return { isValid: true };
  }

  return {
    errorMessage: 'ID in request body must match ID in URL',
    isValid: false,
  };
};

/**
 * Validates that an ID parameter exists in the request
 * @param req - Express request object
 * @returns Validation result with ID or error message
 */
export const validateIdParam = (req: Request): ValidationResult<string> => {
  const { id } = req.params;

  if (!id) {
    return {
      errorMessage: 'ID parameter is required',
      isValid: false,
    };
  }

  return {
    data: id,
    isValid: true,
  };
};

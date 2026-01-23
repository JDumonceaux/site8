import type { BaseIssue, BaseSchema } from 'valibot';

import { safeParse } from 'valibot';

import { Logger } from '../utils/logger.js';

/**
 * Custom validation error with detailed validation messages
 */
export class ValidationError extends Error {
  public constructor(
    message: string,
    public validationErrors: string[],
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Configuration for data validation
 */
export type ValidatorConfig<T> = {
  /** Default metadata to apply if none exists */
  defaultMetadata?: Record<string, unknown>;
  /** Service name for logging */
  serviceName: string;
  /** Valibot schema for validation */
  validationSchema?: BaseSchema<unknown, T, BaseIssue<unknown>>;
};

/**
 * Handles data validation using Valibot schemas
 * Manages schema validation, error formatting, and metadata application
 */
export class DataValidator<T> {
  private readonly defaultMetadata: Record<string, unknown> | undefined;
  private readonly serviceName: string;
  private readonly validationSchema:
    | BaseSchema<unknown, T, BaseIssue<unknown>>
    | undefined;

  public constructor(config: ValidatorConfig<T>) {
    this.serviceName = config.serviceName;
    this.validationSchema = config.validationSchema;
    this.defaultMetadata = config.defaultMetadata;
  }

  /**
   * Validates data against the schema (if provided)
   * @param data - Data to validate
   * @returns Validated data with metadata applied
   * @throws ValidationError if validation fails
   */
  public validate(data: unknown): T {
    // If no schema, just cast and apply metadata
    if (!this.validationSchema) {
      return this.applyDefaultMetadata(data as T);
    }

    // Validate with schema
    const validationResult = safeParse(this.validationSchema, data);

    if (!validationResult.success) {
      const errors = validationResult.issues
        .map((err) => {
          const path =
            'path' in err && Array.isArray(err.path)
              ? err.path.map((p) => p.key).join('.')
              : '';
          return `${path}: ${err.message}`;
        })
        .join('; ');

      Logger.error(`${this.serviceName}: Data validation failed - ${errors}`);

      throw new ValidationError(
        `Invalid data structure: ${errors}`,
        errors.split('; '),
      );
    }

    return this.applyDefaultMetadata(validationResult.output);
  }

  /**
   * Applies default metadata to data object if configured
   * @param data - Data object to apply metadata to
   * @returns Data with metadata applied
   */
  private applyDefaultMetadata(data: T): T {
    if (!this.defaultMetadata || typeof data !== 'object' || data === null) {
      return data;
    }

    const dataObj = data as Record<string, unknown>;
    if (!dataObj.metadata) {
      (data as Record<string, unknown>).metadata = this.defaultMetadata;
    }

    return data;
  }
}

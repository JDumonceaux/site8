import { Logger } from '../utils/logger.js';

/**
 * Configuration for error handling
 */
export type ErrorHandlerConfig = {
  /** Service name for logging */
  serviceName: string;
};

/**
 * Standardizes error handling and logging
 * Wraps errors with contextual information and consistent formatting
 */
export class ErrorHandler {
  private readonly serviceName: string;

  public constructor(config: ErrorHandlerConfig) {
    this.serviceName = config.serviceName;
  }

  /**
   * Expose the configured service name for callers that need it.
   */
  public getServiceName(): string {
    return this.serviceName;
  }

  /**
   * Handles errors with consistent logging and wrapping
   * @param error - Original error
   * @param operation - Operation that failed (e.g., "reading file", "writing data")
   * @param context - Additional context for logging
   * @throws Error with wrapped message
   */
  public handle(
    error: unknown,
    operation: string,
    context?: Record<string, unknown>,
  ): never {
    const errorMessage = error instanceof Error ? error.message : String(error);

    Logger.error(
      `${this.serviceName}: Error ${operation} - ${errorMessage}`,
      context ? { error, ...context } : { error },
    );

    if (error instanceof Error) {
      throw new Error(
        `Error ${operation} for ${this.serviceName}: ${errorMessage}`,
        { cause: error },
      );
    }

    throw new Error(
      `Error ${operation} for ${this.serviceName}: ${errorMessage}`,
    );
  }

  /**
   * Logs an informational message
   * @param message - Message to log
   */
  public info(message: string): void {
    Logger.info(`${this.serviceName}: ${message}`);
  }

  /**
   * Logs a warning message
   * @param message - Message to log
   * @param context - Additional context
   */
  public warn(message: string, context?: Record<string, unknown>): void {
    Logger.warn(`${this.serviceName}: ${message}`, context);
  }
}

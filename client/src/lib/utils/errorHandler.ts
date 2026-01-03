/**
 * Centralized error handling and logging utility
 * Consolidates error handling, logging, and user-friendly messaging
 * Can be extended to send errors to external services like Sentry, LogRocket, etc.
 */

type ErrorContext = {
  [key: string]: unknown;
  componentName?: string;
  userId?: string;
};

type ErrorSeverity = 'error' | 'info' | 'warning';

/**
 * Logs errors with context to console and optionally to external service
 */
export const logError = (
  error: unknown,
  context?: ErrorContext,
  severity: ErrorSeverity = 'error',
): void => {
  const errorInfo = {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
    url: globalThis.location.href,
    userAgent: navigator.userAgent,
    ...context,
  };

  // Log to console
  if (severity === 'error') {
     
    console.error('[Error Logger]', errorInfo);
  } else if (severity === 'warning') {
    console.warn('[Error Logger]', errorInfo);
  } else {
    console.info('[Error Logger]', errorInfo);
  }

  // TODO: Send to external error tracking service
  // Example: Sentry.captureException(error, { extra: errorInfo });
};

/**
 * Gets a user-friendly error message from an error object
 */
export const getUserFriendlyErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    // Check for specific error types
    if (error.name === 'NetworkError' || error.message.includes('network')) {
      return 'Network connection issue. Please check your internet connection and try again.';
    }

    if (error.name === 'TimeoutError' || error.message.includes('timeout')) {
      return 'Request timed out. Please try again.';
    }

    if (
      error.message.includes('401') ||
      error.message.includes('unauthorized')
    ) {
      return 'Your session has expired. Please log in again.';
    }

    if (error.message.includes('403') || error.message.includes('forbidden')) {
      return 'You do not have permission to perform this action.';
    }

    if (error.message.includes('404') || error.message.includes('not found')) {
      return 'The requested resource was not found.';
    }

    if (error.message.includes('500') || error.message.includes('server')) {
      return 'A server error occurred. Our team has been notified. Please try again later.';
    }

    // Return the error message if it looks user-friendly (no technical jargon)
    if (
      error.message.length < 100 &&
      !error.message.includes('undefined') &&
      !error.message.includes('null')
    ) {
      return error.message;
    }
  }

  // Generic fallback
  return 'An unexpected error occurred. Please try again or contact support if the problem persists.';
};

/**
 * Wraps async functions with error handling
 */
export const withErrorHandling = <T, Args extends unknown[]>(
  fn: (...args: Args) => Promise<T>,
  context?: ErrorContext,
) => {
  return async (...args: Args): Promise<T> => {
    try {
      return await fn(...args);
    } catch (error) {
      logError(error, context);
      throw error;
    }
  };
};

/**
 * Handle standard errors and return error message
 * @deprecated Use getUserFriendlyErrorMessage instead
 */
export const httpErrorHandler = (error: unknown): null | string => {
  // Handle standard errors
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback message for unrecognized errors
  return 'Unknown error ...';
};

/**
 * Handle query errors from Response objects
 */
export const handleQueryError = (res: Response): null | string => {
  if (res.ok) {
    return null;
  }

  switch (res.status) {
    case 401: {
      return 'Please login.';
    }
    case 404: {
      throw new Error(`Error: Resource not found (404)`);
    }
    case 408: {
      throw new Error(`Error: Request timeout`);
    }
    case 500: {
      throw new Error(`Error: ${res.statusText}`);
    }
    default: {
      return `Unknown error ${res.status}`;
    }
  }
};
